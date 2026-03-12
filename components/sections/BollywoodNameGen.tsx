"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useCinemaStore } from "@/store/useCinemaStore";

const roles = [
    { title: "The Director 🎬", desc: "You call the shots tonight. Everyone follows YOUR plan.", color: "#FFD700" },
    { title: "The Stunt Double 🦸", desc: "You'll do all the crazy stuff nobody else dares to.", color: "#FF4444" },
    { title: "The Background Dancer 💃", desc: "You will dance to EVERY song. No exceptions.", color: "#FF69B4" },
    { title: "The Paparazzi 📸", desc: "Your job: capture every embarrassing moment tonight.", color: "#00BFFF" },
    { title: "The Villain 😈", desc: "You will dramatically oppose every group decision.", color: "#DC143C" },
    { title: "The Script Writer ✍️", desc: "You must narrate everything that happens like a movie.", color: "#9B59B6" },
    { title: "The Food Critic 🍕", desc: "Rate every food item out of 10. Loudly.", color: "#FF8C00" },
    { title: "The Bodyguard 🕶️", desc: "Protect the birthday star at all costs. Take it seriously.", color: "#2ECC71" },
    { title: "The Item Number Star 🌟", desc: "You break into dance whenever music plays. No choice.", color: "#E91E63" },
    { title: "The Emotional Aunty 😭", desc: "Get emotional about everything. 'Beta, time kitna jaldi beet gaya!'", color: "#FF6347" },
];

export default function RoleSlotMachine() {
    const isUnlocked = useCinemaStore((s) => s.isUnlocked);
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.2 });

    const [spinning, setSpinning] = useState(false);
    const [result, setResult] = useState<typeof roles[0] | null>(null);
    const [spinCount, setSpinCount] = useState(0);

    const spin = () => {
        if (spinning) return;
        setSpinning(true);
        setResult(null);
        setSpinCount(0);

        // Rapid-fire through roles for dramatic effect
        const interval = setInterval(() => {
            setSpinCount((c) => c + 1);
            setResult(roles[Math.floor(Math.random() * roles.length)]);
        }, 80);

        // Stop after 2 seconds
        setTimeout(() => {
            clearInterval(interval);
            const final = roles[Math.floor(Math.random() * roles.length)];
            setResult(final);
            setSpinning(false);
        }, 2000);
    };

    if (!isUnlocked) return null;

    return (
        <section ref={containerRef} className="py-20 flex flex-col items-center justify-center screen-padding">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="w-full max-w-xl mx-auto"
            >
                <div className="text-center mb-10">
                    <h2 className="font-display text-3xl md:text-4xl text-gold mb-4">🎰 Party Role Roulette</h2>
                    <p className="font-body text-secondary text-base max-w-lg mx-auto">
                        Spin the reel and find out your official role at the party. No take-backs!
                    </p>
                </div>

                <div className="glass-cinema p-6 sm:p-8 flex flex-col items-center">
                    {/* Slot display */}
                    <div className="w-full h-[120px] relative overflow-hidden rounded-xl border border-gold/20 mb-6 flex items-center justify-center bg-black/40">
                        {result ? (
                            <motion.div
                                key={spinCount}
                                initial={{ y: spinning ? 30 : 0, opacity: spinning ? 0.5 : 1 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: spinning ? 0.06 : 0.4, ease: spinning ? "linear" : "easeOut" }}
                                className="text-center px-4"
                            >
                                <h3
                                    className="font-display text-xl sm:text-2xl mb-1"
                                    style={{ color: result.color, textShadow: spinning ? "none" : `0 0 20px ${result.color}40` }}
                                >
                                    {result.title}
                                </h3>
                                {!spinning && (
                                    <p className="font-body text-sm text-white/60 italic">{result.desc}</p>
                                )}
                            </motion.div>
                        ) : (
                            <p className="font-mono text-sm text-white/30 tracking-widest uppercase">Spin to reveal...</p>
                        )}
                    </div>

                    <button
                        onClick={spin}
                        disabled={spinning}
                        className="btn-cinema px-10 group flex items-center gap-2"
                    >
                        {spinning ? (
                            <span className="animate-pulse">Spinning... 🎰</span>
                        ) : (
                            <>Spin! <span className="text-xl group-hover:rotate-[360deg] transition-transform duration-500">🎰</span></>
                        )}
                    </button>
                </div>
            </motion.div>
        </section>
    );
}
