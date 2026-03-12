import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useCinemaStore } from "@/store/useCinemaStore";

export default function HeroSection() {
    const isUnlocked = useCinemaStore((s) => s.isUnlocked);

    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.3 });

    const titleWords = ["THE", "BIRTHDAY", "PREMIERE"];
    const allChars = titleWords.join("").split("");
    const totalChars = allChars.length;

    // Hollywood glow: cycle through characters
    const [glowIdx, setGlowIdx] = useState(-1);
    const [hasEntered, setHasEntered] = useState(false);

    useEffect(() => {
        if (!isInView) return;
        // Wait for entry animation to finish before starting glow
        const startTimer = setTimeout(() => {
            setHasEntered(true);
        }, 3000);
        return () => clearTimeout(startTimer);
    }, [isInView]);

    useEffect(() => {
        if (!hasEntered) return;
        const interval = setInterval(() => {
            setGlowIdx(prev => {
                const next = prev + 1;
                return next >= totalChars ? 0 : next;
            });
        }, 120); // Each letter lights up for 120ms, full cycle ~2.5s
        return () => clearInterval(interval);
    }, [hasEntered, totalChars]);

    // Map flat char index to which char is currently glowing
    let charCounter = 0;

    return (
        <section
            ref={containerRef}
            className="screen-center relative"
        >
            {/* Cinematic Spotlight BG Element */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div
                    className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[80vw] h-[100vh] opacity-[0.03]"
                    style={{
                        background: "conic-gradient(from 180deg at 50% 0%, transparent 40%, #FFF8DC 50%, transparent 60%)",
                        animation: "sway 8s ease-in-out infinite alternate"
                    }}
                />
                <style dangerouslySetInnerHTML={{
                    __html: `
          @keyframes sway {
            0% { transform: translateX(-50%) rotate(-5deg); }
            100% { transform: translateX(-50%) rotate(5deg); }
          }
        `}} />
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center text-center w-full max-w-4xl pt-12 px-4">

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="font-display text-subtitle text-gold tracking-[0.3em] uppercase mb-4"
                >
                    Clark Jain
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="font-mono text-xs text-muted tracking-[0.5em] mb-6"
                >
                    PRESENTS
                </motion.div>

                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
                    className="w-32 h-[1px] bg-gold opacity-50 mb-10"
                />

                <motion.h1
                    className="font-display text-hero text-gold leading-tight mb-12 flex flex-wrap justify-center gap-x-[0.4em] min-h-[120px]"
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.04, delayChildren: 1.5 }
                        }
                    }}
                >
                    {titleWords.map((word, wordIdx) => (
                        <span key={wordIdx} className="inline-flex whitespace-nowrap">
                            {word.split("").map((char, charIdx) => {
                                const flatIdx = charCounter++;
                                const isGlowing = hasEntered && (
                                    glowIdx === flatIdx ||
                                    glowIdx === flatIdx - 1 ||
                                    glowIdx === flatIdx - 2
                                );
                                return (
                                    <motion.span
                                        key={charIdx}
                                        variants={{
                                            hidden: { y: -100, opacity: 0, rotate: flatIdx % 2 === 0 ? -15 : 15 },
                                            visible: { y: 0, opacity: 1, rotate: 0 }
                                        }}
                                        transition={{ type: "spring", stiffness: 100, damping: 10 }}
                                        style={{
                                            display: "inline-block",
                                            textShadow: isGlowing
                                                ? "0 0 20px rgba(255, 215, 0, 0.9), 0 0 40px rgba(255, 215, 0, 0.6), 0 0 80px rgba(255, 215, 0, 0.3)"
                                                : "0 0 10px rgba(255, 215, 0, 0.15)",
                                            color: isGlowing ? "#FFFBE6" : "#FFD700",
                                            transition: "text-shadow 0.15s ease, color 0.15s ease",
                                        }}
                                    >
                                        {char}
                                    </motion.span>
                                );
                            })}
                        </span>
                    ))}
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 1, delay: 2.5 }}
                    className="flex flex-col gap-2 font-body text-body-lg text-muted"
                >
                    <p className="flex items-center justify-center gap-2">
                        <span className="text-xl">🎬</span> 23 March 2026
                    </p>
                    <p className="flex items-center justify-center gap-2">
                        <span className="text-xl">📍</span> Inorbit Mall, Mumbai
                    </p>
                </motion.div>

            </div>
        </section>
    );
}
