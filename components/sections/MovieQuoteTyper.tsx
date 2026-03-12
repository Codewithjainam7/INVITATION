"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useCinemaStore } from "@/store/useCinemaStore";

const famousLines = [
    { line: "I'll be back.", movie: "The Terminator", year: 1984 },
    { line: "May the Force be with you.", movie: "Star Wars", year: 1977 },
    { line: "Here's looking at you, kid.", movie: "Casablanca", year: 1942 },
    { line: "You talking to me?", movie: "Taxi Driver", year: 1976 },
    { line: "Why so serious?", movie: "The Dark Knight", year: 2008 },
    { line: "To infinity and beyond!", movie: "Toy Story", year: 1995 },
    { line: "I see dead people.", movie: "The Sixth Sense", year: 1999 },
    { line: "Life is like a box of chocolates.", movie: "Forrest Gump", year: 1994 },
    { line: "You can't handle the truth!", movie: "A Few Good Men", year: 1992 },
    { line: "I'm the king of the world!", movie: "Titanic", year: 1997 },
    { line: "With great power comes great responsibility.", movie: "Spider-Man", year: 2002 },
    { line: "Just keep swimming.", movie: "Finding Nemo", year: 2003 },
];

export default function MovieQuoteTyper() {
    const isUnlocked = useCinemaStore((s) => s.isUnlocked);
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.2 });

    const [currentLine, setCurrentLine] = useState(() => famousLines[Math.floor(Math.random() * famousLines.length)]);
    const [input, setInput] = useState("");
    const [startTime, setStartTime] = useState<number | null>(null);
    const [wpm, setWpm] = useState<number | null>(null);
    const [accuracy, setAccuracy] = useState<number | null>(null);
    const [done, setDone] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = (value: string) => {
        if (done) return;
        if (!startTime) setStartTime(Date.now());
        setInput(value);

        // Check if complete
        if (value === currentLine.line) {
            const elapsed = (Date.now() - (startTime || Date.now())) / 1000 / 60; // minutes
            const words = currentLine.line.split(" ").length;
            setWpm(Math.round(words / elapsed));

            // Calculate accuracy
            let correct = 0;
            for (let i = 0; i < currentLine.line.length; i++) {
                if (value[i] === currentLine.line[i]) correct++;
            }
            setAccuracy(Math.round((correct / currentLine.line.length) * 100));
            setDone(true);
        }
    };

    const restart = () => {
        setCurrentLine(famousLines[Math.floor(Math.random() * famousLines.length)]);
        setInput("");
        setStartTime(null);
        setWpm(null);
        setAccuracy(null);
        setDone(false);
        inputRef.current?.focus();
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
                    <h2 className="font-display text-3xl md:text-4xl text-gold mb-4">⌨️ Type the Quote!</h2>
                    <p className="font-body text-secondary text-base max-w-lg mx-auto">
                        How fast can you type this iconic Hollywood movie line? Race against yourself!
                    </p>
                </div>

                <div className="glass-cinema p-6 sm:p-8">
                    {/* Quote Display */}
                    <div className="mb-6 py-4 border-b border-gold/10">
                        <p className="font-body text-lg sm:text-xl leading-relaxed">
                            {currentLine.line.split("").map((char, i) => {
                                let color = "text-white/40"; // untyped
                                if (i < input.length) {
                                    color = input[i] === char ? "text-green-400" : "text-red-400";
                                }
                                return (
                                    <span key={i} className={`${color} transition-colors duration-75`}>
                                        {char}
                                    </span>
                                );
                            })}
                        </p>
                        <p className="font-mono text-[10px] text-white/30 mt-3 tracking-widest uppercase">
                            — {currentLine.movie} ({currentLine.year})
                        </p>
                    </div>

                    {/* Input */}
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => handleChange(e.target.value)}
                        placeholder="Start typing..."
                        className="input-cinema w-full text-lg mb-4"
                        disabled={done}
                        autoComplete="off"
                        spellCheck="false"
                    />

                    {/* Results */}
                    {done && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-wrap items-center justify-center gap-6 py-4"
                        >
                            <div className="text-center">
                                <p className="font-display text-2xl text-gold">{wpm}</p>
                                <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest">WPM</p>
                            </div>
                            <div className="text-center">
                                <p className="font-display text-2xl text-gold">{accuracy}%</p>
                                <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest">Accuracy</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl">{wpm && wpm > 60 ? "🏆" : wpm && wpm > 35 ? "⭐" : "🐢"}</p>
                                <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest">Rating</p>
                            </div>
                        </motion.div>
                    )}

                    <button onClick={restart} className="btn-cinema w-full mt-4">
                        {done ? "New Quote 🎬" : "Skip ⏭️"}
                    </button>
                </div>
            </motion.div>
        </section>
    );
}
