"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useCinemaStore } from "@/store/useCinemaStore";

export default function Footer() {
    const isUnlocked = useCinemaStore((s) => s.isUnlocked);
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.1 });

    if (!isUnlocked) return null;

    return (
        <footer ref={containerRef} className="relative w-full pt-24 pb-48 overflow-hidden mt-20 border-t border-gold/10">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[200px] bg-gold/5 blur-[100px] pointer-events-none" />

            {/* Film Strip Divider (Redone as Top Border) */}
            <div className="absolute top-0 left-0 w-full flex justify-between px-2">
                {[...Array(30)].map((_, i) => (
                    <div key={i} className="w-[10px] h-[6px] bg-gold/10 rounded-b-sm" />
                ))}
            </div>

            <div className="container mx-auto px-6 text-center relative z-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="mb-8"
                >
                    <p className="font-mono text-[10px] text-gold/60 tracking-[0.5em] uppercase mb-4">A Cinematic Production By</p>
                    <h2 className="font-display text-4xl md:text-5xl text-gold mb-10 tracking-[0.2em] text-glow-gold">
                        CLARK JAIN STUDIOS
                    </h2>

                    <div className="flex flex-col items-center gap-2 mb-16 border-y border-gold/10 py-8 max-w-xl mx-auto">
                        <p className="font-mono text-[10px] text-muted tracking-widest uppercase mb-2">Starring</p>
                        <p className="font-display text-lg md:text-xl tracking-widest text-white/90">
                            JAGRAT <span className="text-gold/30 mx-2 text-sm">•</span> MOHIT <span className="text-gold/30 mx-2 text-sm">•</span> KARAN
                        </p>
                        <p className="font-display text-lg md:text-xl tracking-widest text-white/90 mt-1">
                            SAI <span className="text-gold/30 mx-2 text-sm">•</span> KHUSHI
                        </p>
                    </div>

                    <h3 className="font-display text-2xl text-gold/80 mb-2 tracking-widest uppercase">
                        The End... or The Beginning?
                    </h3>
                    <p className="font-body text-secondary max-w-md mx-auto italic text-sm">
                        "Picture abhi baaki hai, mere dost. See you at the premiere."
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="mt-16 flex flex-col items-center justify-center gap-1 font-mono text-xs text-muted uppercase tracking-[0.2em]"
                >
                    <p className="opacity-40 text-[9px] mt-4">PIRACY IS A CRIME • NO ENTRY WITHOUT VIP PASS</p>
                    <p className="opacity-40 text-[9px]">© 2026 ALL RIGHTS RESERVED</p>
                </motion.div>
            </div>

            {/* Bottom Fade out strictly before the border margin */}
            <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
        </footer>
    );
}
