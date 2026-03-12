"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useCinemaStore } from "@/store/useCinemaStore";

export default function PartyDetails() {
    const isUnlocked = useCinemaStore((s) => s.isUnlocked);
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.2 });

    if (!isUnlocked) return null;

    return (
        <section
            ref={containerRef}
            className="screen flex flex-col items-center justify-center py-20 min-h-fit overflow-visible"
        >
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="font-mono text-xs text-gold tracking-[0.4em] uppercase mb-8 text-center"
            >
                A Clark Jain Production
            </motion.p>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative w-full max-w-5xl aspect-[3/2] rounded-2xl overflow-hidden mb-12 border border-gold/30 shadow-[0_0_60px_rgba(255,215,0,0.2)]"
                style={{ willChange: "transform, opacity" }}
            >
                <img
                    src="/w2.png"
                    alt="The Cast"
                    className="w-full h-full object-cover pointer-events-none transition-transform duration-[10s] hover:scale-110"
                />
                <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
                    <p className="font-display text-sm tracking-[0.5em] text-gold/80 uppercase">The Starring Cast</p>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative w-full max-w-[480px] mx-auto"
            >
                {/* THE TICKET */}
                <div className="relative bg-gradient-to-br from-[#1a1708] via-[#1d1a0a] to-[#0f0e08] border border-gold/40 rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(255,215,0,0.15)]">
                    {/* Holographic shimmer */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-gold/5 to-transparent pointer-events-none animate-pulse" />

                    {/* Top section */}
                    <div className="relative p-8 pb-6 text-center z-10">
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <div className="w-8 h-[2px] bg-gradient-to-r from-transparent to-gold/60" />
                            <span className="font-mono text-[9px] text-gold/60 tracking-[0.5em] uppercase">Admit One</span>
                            <div className="w-8 h-[2px] bg-gradient-to-l from-transparent to-gold/60" />
                        </div>

                        <h2 className="font-display text-4xl md:text-5xl text-gold mb-2 leading-tight" style={{ textShadow: "0 0 30px rgba(255,215,0,0.3)" }}>
                            THE GRAND
                        </h2>
                        <h2 className="font-display text-4xl md:text-5xl text-white mb-2 leading-tight">
                            BIRTHDAY
                        </h2>
                        <h2 className="font-display text-4xl md:text-5xl text-gold mb-6 leading-tight" style={{ textShadow: "0 0 30px rgba(255,215,0,0.3)" }}>
                            PREMIERE
                        </h2>

                        <div className="inline-block px-6 py-2 rounded-full bg-gold/10 border border-gold/20 mb-6">
                            <span className="font-display text-sm text-gold tracking-[0.3em]">★ VIP ACCESS ★</span>
                        </div>
                    </div>

                    {/* Perforated line */}
                    <div className="relative flex items-center px-0">
                        <div className="w-5 h-10 bg-cinema-black rounded-r-full border-r border-t border-b border-gold/20" />
                        <div className="flex-1 border-t-2 border-dashed border-gold/20" />
                        <div className="w-5 h-10 bg-cinema-black rounded-l-full border-l border-t border-b border-gold/20" />
                    </div>

                    {/* Bottom stub — ticket details */}
                    <div className="relative p-8 pt-6 z-10">
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="text-left">
                                <p className="font-mono text-[9px] text-white/30 uppercase tracking-widest mb-1">Date</p>
                                <p className="font-display text-lg text-white">23 March 2026</p>
                            </div>
                            <div className="text-right">
                                <p className="font-mono text-[9px] text-white/30 uppercase tracking-widest mb-1">Time</p>
                                <p className="font-display text-lg text-white">Showtime TBA</p>
                            </div>
                            <div className="text-left">
                                <p className="font-mono text-[9px] text-white/30 uppercase tracking-widest mb-1">Venue</p>
                                <p className="font-display text-sm text-white">Inorbit Mall, Malad</p>
                            </div>
                            <div className="text-right">
                                <p className="font-mono text-[9px] text-white/30 uppercase tracking-widest mb-1">Rating</p>
                                <p className="font-display text-sm text-gold">U/A ★★★★★</p>
                            </div>
                        </div>

                        {/* Barcode */}
                        <div className="flex justify-center gap-[2px] mt-4 opacity-30">
                            {Array.from({ length: 40 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="bg-white rounded-sm"
                                    style={{
                                        width: Math.random() > 0.5 ? "2px" : "1px",
                                        height: `${16 + Math.random() * 10}px`,
                                    }}
                                />
                            ))}
                        </div>
                        <p className="font-mono text-[8px] text-white/20 text-center mt-2 tracking-[0.3em]">CLARK-JAIN-2026-VIP-001</p>
                    </div>
                </div>
            </motion.div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="font-mono text-[0.65rem] text-muted text-center mt-12 mb-10 max-w-sm tracking-widest leading-loose uppercase"
            >
                Produced by Clark Jain Studios ✦<br />
                In Association with Inorbit Mall
            </motion.p>

        </section>
    );
}
