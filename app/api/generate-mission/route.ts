// Groq API route — horror-themed mission generator
import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const MODEL = "llama-3.3-70b-versatile";

const fallbacks = [
    "CLASSIFIED MISSION: The spirits are silent. Your mission: Just show up at Inorbit. Don't die on the way. Survival probability: 50/50.",
    "CLASSIFIED MISSION: The ouija board is loading... Meanwhile, your mission is to bring your scared face and party shoes. Survival probability: 69%.",
    "CLASSIFIED MISSION: Ghost reception is bad today. Just come to Inorbit and pretend you're not terrified. Survival probability: Questionable.",
];

export async function POST(req: NextRequest) {
    try {
        const { friendName, role } = await req.json();
        const prompt = `You are a horror-themed party mission generator. Generate a funny, unhinged, horror-flavored secret mission for ${friendName} who is ${role} at Clark Jain's birthday party at Inorbit Mall on 23 March. Make it dramatic and funny — like a horror movie mission briefing. 3-4 lines max. Gen-Z Hinglish humor. Start with 'CLASSIFIED MISSION:'. End with survival probability percentage.`;

        const stream = await groq.chat.completions.create({
            model: MODEL,
            messages: [{ role: "user", content: prompt }],
            stream: true,
            max_tokens: 300,
            temperature: 0.9,
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

        return new NextResponse(readable, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-cache" } });
    } catch {
        return NextResponse.json({ error: "Failed", fallback: fallbacks[0] }, { status: 500 });
    }
}
