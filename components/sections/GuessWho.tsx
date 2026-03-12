"use client";
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useCinemaStore } from "@/store/useCinemaStore";

interface EmojiQuiz {
    emojis: string;
    answer: string;
    options: string[];
}

const allQuizzes: EmojiQuiz[] = [
    { emojis: "🧊 🚢 💑", answer: "Titanic", options: ["Titanic", "The Notebook", "Pearl Harbor", "Cast Away"] },
    { emojis: "🦁 👑 🌅", answer: "The Lion King", options: ["Jungle Book", "The Lion King", "Madagascar", "Tarzan"] },
    { emojis: "🕷️ 🧑 🏙️", answer: "Spider-Man", options: ["Batman", "Spider-Man", "Iron Man", "Ant-Man"] },
    { emojis: "💍 🌋 🧝", answer: "Lord of the Rings", options: ["The Hobbit", "Harry Potter", "Lord of the Rings", "Narnia"] },
    { emojis: "🦖 🏝️ 🔬", answer: "Jurassic Park", options: ["King Kong", "Jurassic Park", "Godzilla", "Avatar"] },
    { emojis: "👻 📞 🔪", answer: "Scream", options: ["Scream", "Halloween", "The Ring", "Saw"] },
    { emojis: "🏎️ 🔫 👨‍👩‍👦", answer: "Fast & Furious", options: ["Need for Speed", "Fast & Furious", "Drive", "Rush"] },
    { emojis: "🧙 ⚡ 🏰", answer: "Harry Potter", options: ["Lord of the Rings", "Narnia", "Harry Potter", "Percy Jackson"] },
    { emojis: "🤖 👦 🌌", answer: "Star Wars", options: ["Star Trek", "Star Wars", "Interstellar", "Alien"] },
    { emojis: "🃏 🦇 💣", answer: "The Dark Knight", options: ["Batman Begins", "The Dark Knight", "Joker", "Deadpool"] },
    { emojis: "💊 🕶️ 🔵🔴", answer: "The Matrix", options: ["Inception", "The Matrix", "Tron", "Ready Player One"] },
    { emojis: "🦈 🏖️ 😱", answer: "Jaws", options: ["Jaws", "Deep Blue Sea", "Sharknado", "The Meg"] },
];

export default function EmojiMovieQuiz() {
    const isUnlocked = useCinemaStore((s) => s.isUnlocked);
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.2 });

    const [currentIdx, setCurrentIdx] = useState(0);
    const [score, setScore] = useState(0);
    const [selected, setSelected] = useState<string | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    const totalQuestions = 6;
    const [usedQuizzes] = useState(() => {
        const shuffled = [...allQuizzes].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, totalQuestions);
    });

    const currentQuiz = usedQuizzes[currentIdx];

    const handleSelect = (option: string) => {
        if (selected) return;
        setSelected(option);
        if (option === currentQuiz.answer) setScore((s) => s + 1);
        setShowResult(true);
        setTimeout(() => {
            if (currentIdx + 1 >= totalQuestions) {
                setGameOver(true);
            } else {
                setCurrentIdx((i) => i + 1);
                setSelected(null);
                setShowResult(false);
            }
        }, 1000);
    };

    const resetGame = () => {
        setCurrentIdx(0);
        setScore(0);
        setSelected(null);
        setShowResult(false);
        setGameOver(false);
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
                    <h2 className="font-display text-3xl md:text-4xl text-gold mb-4">🎬 Emoji Movie Quiz</h2>
                    <p className="font-body text-secondary text-base max-w-lg mx-auto">
                        Can you decode the movie from just emojis? Hollywood blockbusters edition!
                    </p>
                </div>

                <div className="glass-cinema p-6 sm:p-8">
                    <AnimatePresence mode="wait">
                        {gameOver ? (
                            <motion.div key="over" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="text-center py-8">
                                <div className="text-5xl mb-4">{score >= 5 ? "🏆" : score >= 3 ? "⭐" : "😅"}</div>
                                <h3 className="font-display text-2xl text-gold mb-2">
                                    {score >= 5 ? "Movie Buff!" : score >= 3 ? "Not Bad!" : "Watch more movies!"}
                                </h3>
                                <p className="font-mono text-lg text-white/80 mb-6">
                                    Score: <span className="text-gold">{score}</span> / {totalQuestions}
                                </p>
                                <button onClick={resetGame} className="btn-cinema px-8">Play Again 🎬</button>
                            </motion.div>
                        ) : (
                            <motion.div key={currentIdx} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                                <div className="flex justify-between items-center mb-6">
                                    <span className="font-mono text-xs text-muted uppercase tracking-widest">Q{currentIdx + 1}/{totalQuestions}</span>
                                    <span className="font-mono text-xs text-gold">Score: {score}</span>
                                </div>
                                <div className="text-center mb-8 py-8 border-y border-gold/10">
                                    <p className="text-5xl sm:text-6xl tracking-wider">{currentQuiz.emojis}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    {currentQuiz.options.map((opt) => {
                                        let cls = "border-white/10 text-white/70 hover:border-gold/40 hover:bg-gold/5";
                                        if (showResult) {
                                            if (opt === currentQuiz.answer) cls = "border-green-500 bg-green-500/15 text-green-400";
                                            else if (opt === selected) cls = "border-red-500 bg-red-500/15 text-red-400";
                                            else cls = "border-white/5 text-white/30";
                                        }
                                        return (
                                            <button key={opt} onClick={() => handleSelect(opt)} disabled={!!selected}
                                                className={`py-3 px-4 rounded-xl border font-display text-sm tracking-wider transition-all duration-200 ${cls}`}>
                                                {opt}
                                            </button>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </section>
    );
}
