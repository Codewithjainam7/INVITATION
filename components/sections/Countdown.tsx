"use client";
import { useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useCountdown } from "@/hooks/useCountdown";
import { useCinemaStore } from "@/store/useCinemaStore";

const DigitBox = ({ label, value }: { label: string; value: string }) => {
    return (
        <div className="flex flex-col items-center">
            <div className="glass-cinema w-[64px] h-[72px] sm:w-[80px] sm:h-[90px] flex items-center justify-center relative overflow-hidden mb-3">
                {/* Subtle inner highlight */}
                <div className="absolute top-0 inset-x-0 h-1/2 bg-white/5 pointer-events-none" />

                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={value}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="font-display text-3xl sm:text-4xl text-gold"
                    >
                        {value}
                    </motion.div>
                </AnimatePresence>
            </div>
            <span className="font-mono text-xs text-muted uppercase tracking-widest">{label}</span>
        </div>
    );
};

export default function Countdown() {
    const isUnlocked = useCinemaStore((s) => s.isUnlocked);
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.3 });

    // 23 March 2026, 18:00 IST
    const { days, hours, minutes, seconds, isPassed } = useCountdown("2026-03-23T18:00:00+05:30");

    if (!isUnlocked) return null;

    return (
        <section
            ref={containerRef}
            className="py-24 flex flex-col items-center justify-center relative"
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="text-center"
            >
                <h2 className="font-mono text-xs text-gold tracking-[0.4em] uppercase mb-10">
                    PREMIERE IN
                </h2>

                {isPassed ? (
                    <div className="glass-cinema p-8 border-success/30">
                        <h3 className="font-display text-2xl md:text-3xl text-success text-glow-green uppercase tracking-widest">
                            🎬 The Premiere Has Begun!
                        </h3>
                    </div>
                ) : (
                    <div className="flex justify-center gap-3 sm:gap-4 md:gap-6 mb-12">
                        <DigitBox label="Days" value={days} />
                        <DigitBox label="Hrs" value={hours} />
                        <DigitBox label="Mins" value={minutes} />

                        {/* Secs gets continuous pulse */}
                        <motion.div
                            animate={{ scale: [1, 1.03, 1] }}
                            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <DigitBox label="Secs" value={seconds} />
                        </motion.div>
                    </div>
                )}

                <p className="font-body text-body-lg text-secondary italic max-w-sm mx-auto">
                    "Don't be fashionably late.<br />Be Bollywood late. 😎"
                </p>
            </motion.div>
        </section>
    );
}
