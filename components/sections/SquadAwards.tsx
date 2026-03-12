"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useCinemaStore } from "@/store/useCinemaStore";

const categories = [
    { label: "🎭 Most Dramatic", emoji: "🎭" },
    { label: "😂 Funniest", emoji: "😂" },
    { label: "🕺 Best Dancer", emoji: "🕺" },
    { label: "👑 Party King/Queen", emoji: "👑" },
    { label: "📸 Most Photogenic", emoji: "📸" },
    { label: "🍕 Biggest Foodie", emoji: "🍕" },
    { label: "😴 Most Likely to Leave Early", emoji: "😴" },
    { label: "🎤 Karaoke Champion", emoji: "🎤" },
];

const castNames = ["Jagrat", "Mohit", "Karan", "Sai", "Khushi"];

export default function SquadAwards() {
    const isUnlocked = useCinemaStore((s) => s.isUnlocked);
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.2 });

    const [votes, setVotes] = useState<Record<string, string>>({});
    const [showResults, setShowResults] = useState(false);
    const [currentCat, setCurrentCat] = useState(0);

    const handleVote = (name: string) => {
        const cat = categories[currentCat].label;
        setVotes((v) => ({ ...v, [cat]: name }));

        setTimeout(() => {
            if (currentCat + 1 >= categories.length) {
                setShowResults(true);
            } else {
                setCurrentCat((c) => c + 1);
            }
        }, 400);
    };

    const resetVotes = () => {
        setVotes({});
        setCurrentCat(0);
        setShowResults(false);
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
                    <h2 className="font-display text-3xl md:text-4xl text-gold mb-4">🏆 Squad Awards</h2>
                    <p className="font-body text-secondary text-base max-w-lg mx-auto">
                        Vote for who deserves each award. Choose wisely — or hilariously!
                    </p>
                </div>

                <div className="glass-cinema p-6 sm:p-8">
                    {showResults ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col gap-4"
                        >
                            <h3 className="font-display text-xl text-gold text-center mb-4">🏆 The Results Are In!</h3>
                            {categories.map((cat) => (
                                <div key={cat.label} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                                    <span className="font-body text-sm text-white/70">{cat.emoji} {cat.label.replace(cat.emoji + " ", "")}</span>
                                    <span className="font-display text-sm text-gold">{votes[cat.label] || "—"}</span>
                                </div>
                            ))}
                            <button onClick={resetVotes} className="btn-cinema w-full mt-4">Vote Again 🗳️</button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key={currentCat}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex justify-between items-center mb-4">
                                <span className="font-mono text-xs text-muted uppercase tracking-widest">
                                    {currentCat + 1} / {categories.length}
                                </span>
                            </div>

                            <div className="text-center mb-6 py-4">
                                <span className="text-4xl mb-3 block">{categories[currentCat].emoji}</span>
                                <h3 className="font-display text-xl text-gold">
                                    {categories[currentCat].label.replace(categories[currentCat].emoji + " ", "")}
                                </h3>
                            </div>

                            <div className="flex flex-col gap-2">
                                {castNames.map((name) => (
                                    <button
                                        key={name}
                                        onClick={() => handleVote(name)}
                                        className={`py-3 px-4 rounded-xl border transition-all duration-200 font-display text-sm tracking-wider
                                            ${votes[categories[currentCat].label] === name
                                                ? "border-gold bg-gold/10 text-gold"
                                                : "border-white/10 text-white/70 hover:border-gold/40 hover:bg-gold/5"
                                            }`}
                                    >
                                        {name}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </section>
    );
}
