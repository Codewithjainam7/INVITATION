import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

// Initialize Groq client
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const MODEL = "llama-3.3-70b-versatile";

const fallbacks = [
    `"Bade bade deshon mein aisi choti choti baatein hoti rehti hain, senorita!" - classic fallback.`,
    `"Pushpa, I hate tears... aur late comers bhi!" - server errors happen!`,
    `"Rishte mein toh hum tumhare baap lagte hain, naam hai Shahenshah." - error 500.`
];

export async function POST(req: NextRequest) {
    try {
        const { guestName, mood } = await req.json();

        if (!guestName) {
            return NextResponse.json({ error: "Name is required" }, { status: 400 });
        }

        const characterStyles: Record<string, string> = {
            "Jagrat Mode": `You speak like Jagrat — a dramatic South Indian guy who over-acts in everything. You MUST start or include the phrase "Ardila sari!" somewhere. Be dramatic, over-the-top, South Indian Bollywood hero style. Mix Hindi, English, and a touch of South Indian flair.`,
            "Mohit Mode": `You speak like Mohit — a logical guy who always explains things analytically but ends up being funny. You MUST start with or include "But the point is..." somewhere. Be analytical yet absurd, like someone giving a TED talk about a party.`,
            "Karan Mode": `You speak like Karan — an excited desi trader bro who reacts to everything with market analogies. You MUST include "Aree bhaiishab!" somewhere. Use stock market/trading lingo mixed with Bollywood drama. Be hype and energetic.`,
            "Sai Mode": `You speak like Sai — a savage college bro who roasts everyone. You MUST include "Abee chutiye!" somewhere (it's friendly roasting, not offensive). Be brutally funny, roast the guest lovingly, desi college humour style.`,
            "Khushi Mode": `You speak like Khushi — someone who laughs at literally everything, even mid-sentence. You MUST include "*laughs*" or "hahahaha" multiple times throughout the dialogue. The dialogue should feel like someone who can't stop laughing while talking. Be bubbly and infectious.`,
        };

        const styleGuide = characterStyles[mood] || characterStyles["Jagrat Mode"];

        const prompt = `You are writing a dialogue for Clark Jain's grand birthday premiere party. 
The guest's name is "${guestName}". 
${styleGuide}
Write a short, punchy, funny 1-2 sentence dialogue in Hinglish (Hindi + English mix). 
Format it like a movie script quote with quotation marks. DO NOT include any extra text or explanations.`;


        const stream = await groq.chat.completions.create({
            model: MODEL,
            messages: [{ role: "user", content: prompt }],
            stream: true,
            max_tokens: 150,
            temperature: 0.8,
        });

        const encoder = new TextEncoder();
        const readable = new ReadableStream({
            async start(controller) {
                try {
                    for await (const chunk of stream) {
                        const text = chunk.choices[0]?.delta?.content || "";
                        if (text) controller.enqueue(encoder.encode(text));
                    }
                    controller.close();
                } catch {
                    controller.enqueue(encoder.encode(fallbacks[Math.floor(Math.random() * fallbacks.length)]));
                    controller.close();
                }
            },
        });

        return new NextResponse(readable, {
            headers: {
                "Content-Type": "text/plain; charset=utf-8",
                "Cache-Control": "no-cache"
            }
        });
    } catch (error) {
        console.error("GROQ Stream Error:", error);
        return NextResponse.json({ error: "Failed to generate dialogue", fallback: fallbacks[0] }, { status: 500 });
    }
}
