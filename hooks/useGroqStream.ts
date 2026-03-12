"use client";

import { useState, useCallback } from "react";

export function useGroqStream() {
    const [streamedText, setStreamedText] = useState("");
    const [isStreaming, setIsStreaming] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const generateDialogue = useCallback(async (guestName: string, mood: string) => {
        setIsStreaming(true);
        setStreamedText("");
        setError(null);

        try {
            const response = await fetch("/api/dialogue", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ guestName, mood }),
            });

            if (!response.ok) {
                throw new Error("Dialogue generation failed");
            }

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();

            if (!reader) throw new Error("No reader available");

            let fullText = "";

            // eslint-disable-next-line no-constant-condition
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                fullText += chunk;
                setStreamedText(fullText);

                // Small delay for typewriter effect
                await new Promise((r) => setTimeout(r, 25));
            }
        } catch (err) {
            const fallbacks = [
                `"Rishte mein toh ${guestName} humhara baap lagta hai... naam hai Shahenshah!"`,
                `"Bade bade deshon mein aisi choti choti baatein hoti rehti hain, ${guestName}."`,
                `"${guestName}, dosti ka ek usool hai madam... no sorry, no thank you."`,
                `"Pushpa, I hate tears... aur ${guestName}, I hate excuses. Party pe aaja!"`
            ];
            const fallback = fallbacks[Math.floor(Math.random() * fallbacks.length)];
            setStreamedText(fallback);
            setError("Network timeout. Used classic dialogue.");
        } finally {
            setIsStreaming(false);
        }
    }, []);

    return { streamedText, isStreaming, error, generateDialogue };
}
