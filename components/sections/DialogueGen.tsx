"use client";
import { useState, useRef } from "react";
import { useGroqStream } from "@/hooks/useGroqStream";
import { motion, useInView } from "framer-motion";
import { useCinemaStore } from "@/store/useCinemaStore";

export default function DialogueGen() {
    const isUnlocked = useCinemaStore((s) => s.isUnlocked);

    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.2 });

    const [name, setName] = useState("");
    const [mood, setMood] = useState("Jagrat Mode");
    const { streamedText, isStreaming, generateDialogue } = useGroqStream();

    const handleGenerate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || isStreaming) return;
        generateDialogue(name.trim(), mood);
    };

    const characterModes = [
        { label: "🦸 Jagrat Mode", value: "Jagrat Mode", desc: "Ardila sari!" },
        { label: "😈 Mohit Mode", value: "Mohit Mode", desc: "But the point is..." },
        { label: "💃 Karan Mode", value: "Karan Mode", desc: "Aree bhaiishab!" },
        { label: "🎭 Sai Mode", value: "Sai Mode", desc: "Abee chutiye!" },
        { label: "👸 Khushi Mode", value: "Khushi Mode", desc: "*laughs too muchhh*" },
    ];

    if (!isUnlocked) return null;

    return (
        <section
            ref={containerRef}
            className="py-20 flex flex-col items-center justify-center screen-padding"
        >
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="w-full max-w-2xl mx-auto"
            >
                <div className="text-center mb-10">
                    <h2 className="font-display text-3xl md:text-4xl text-gold mb-4">
                        Custom Dialogue Generator
                    </h2>
                    <p className="font-body text-secondary text-base max-w-lg mx-auto">
                        Pick a character mode and get your personalized dialogue in their iconic style!
                    </p>
                </div>

                <form onSubmit={handleGenerate} className="glass-cinema p-6 sm:p-8 flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="font-mono text-xs text-muted uppercase tracking-widest pl-1">Your Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Rahul"
                            className="input-cinema w-full"
                            maxLength={20}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="font-mono text-xs text-muted uppercase tracking-widest pl-1">Character Mode</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {characterModes.map((mode) => (
                                <button
                                    key={mode.value}
                                    type="button"
                                    onClick={() => setMood(mode.value)}
                                    className={`flex flex-col items-center gap-1 px-3 py-3 rounded-xl border transition-all duration-200 text-center ${mood === mode.value
                                            ? "border-gold bg-gold/10 text-gold shadow-[0_0_15px_rgba(255,215,0,0.2)]"
                                            : "border-white/10 text-white/60 hover:border-gold/40 hover:bg-gold/5"
                                        }`}
                                >
                                    <span className="font-display text-xs tracking-wider">{mode.label}</span>
                                    <span className="font-mono text-[9px] text-white/40 italic">"{mode.desc}"</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={!name.trim() || isStreaming}
                        className="btn-cinema w-full mt-2 group flex justify-center items-center gap-2"
                    >
                        {isStreaming ? (
                            <span className="animate-pulse">Writing Script... ✍️</span>
                        ) : (
                            <>Action! <span className="text-xl group-hover:scale-125 transition-transform duration-300">🎬</span></>
                        )}
                    </button>
                </form>

                {/* Script Output Area */}
                {streamedText && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-8"
                    >
                        <div className="relative p-6 sm:p-8 bg-[#f5eccd] text-black border-l-8 border-gold shadow-lg transform -rotate-1 rounded-sm">
                            <div className="absolute top-2 right-4 text-black/20 font-display text-4xl leading-none">"</div>

                            <h4 className="font-mono text-xs text-black/50 uppercase tracking-widest mb-4 border-b border-black/10 pb-2">
                                Draft Script #01 — {mood}
                            </h4>

                            <p className="font-body text-xl md:text-2xl font-semibold leading-relaxed" style={{ fontStyle: 'italic' }}>
                                {streamedText}
                                {isStreaming && <span className="inline-block w-2 ht-4 bg-black ml-1 animate-pulse" />}
                            </p>
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </section>
    );
}
