"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCinemaStore } from "@/store/useCinemaStore";
import { emojiQuizzes, lyricQuizzes, getRandomQuiz } from "@/lib/quizData";
import ConfettiCanvas from "@/components/ui/ConfettiCanvas";

type GateStage = 1 | 2 | 3 | "unlocked";

export default function VipEntryGate() {
    const isUnlocked = useCinemaStore((s) => s.isUnlocked);
    const unlock = useCinemaStore((s) => s.unlock);

    const [stage, setStage] = useState<GateStage>(1);
    const [emojiQuiz, setEmojiQuiz] = useState(emojiQuizzes[0]);
    const [lyricQuiz, setLyricQuiz] = useState(lyricQuizzes[0]);
    const [lyricInput, setLyricInput] = useState("");
    const [errorText, setErrorText] = useState("");
    const [shake, setShake] = useState(false);

    // Scanner state
    const [scanProgress, setScanProgress] = useState(0);
    const isScanningRef = useRef(false);
    const scanTimerRef = useRef<NodeJS.Timeout | null>(null);

    // Initialize random quizzes
    useEffect(() => {
        setEmojiQuiz(getRandomQuiz(emojiQuizzes));
        setLyricQuiz(getRandomQuiz(lyricQuizzes));
        // Clear lock
        if (isUnlocked) setStage("unlocked");
    }, [isUnlocked]);

    // Stage 1: Emoji Quiz Option Click
    const handleEmojiSelect = (option: string) => {
        if (option === emojiQuiz.answer) {
            setStage(2);
            setErrorText("");
        } else {
            triggerError("Galat jawab, babu bhaiya! 🎬");
        }
    };

    // Stage 2: Lyrics Submit
    const handleLyricsSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const isCorrect = lyricInput.trim().toLowerCase() === lyricQuiz.missing.toLowerCase();

        if (isCorrect) {
            setStage(3);
            setErrorText("");
        } else {
            triggerError("Lyrics bhool gaya? Phir se try kar! 🪕");
        }
    };

    // Stage 3: Scanner Hold
    const handleScanStart = () => {
        isScanningRef.current = true;

        // Simulate progress
        let progress = 0;
        scanTimerRef.current = setInterval(() => {
            progress += 5; // Takes 2 seconds (100 / 5 * 100ms)
            setScanProgress(progress);

            if (progress >= 100) {
                clearInterval(scanTimerRef.current as NodeJS.Timeout);
                if (isScanningRef.current) {
                    handleUnlockSuccess();
                }
            }
        }, 100);
    };

    const handleScanEnd = () => {
        isScanningRef.current = false;
        clearInterval(scanTimerRef.current as NodeJS.Timeout);
        if (scanProgress < 100) {
            setScanProgress(0); // Reset if let go too early
            triggerError("Hold it steady, star! ✨");
        }
    };

    // Success flow
    const handleUnlockSuccess = () => {
        setStage("unlocked");
        setTimeout(() => unlock(), 2500); // Overlay fades after confetti
    };

    const triggerError = (msg: string) => {
        setErrorText(msg);
        setShake(true);
        setTimeout(() => {
            setShake(false);
        }, 500);
        setTimeout(() => {
            setErrorText("");
        }, 3000);
    };

    if (isUnlocked) return null; // Unlocked, removed from DOM entirely

    return (
        <>
            <ConfettiCanvas trigger={stage === "unlocked"} />

            <motion.div
                className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-black p-5"
                initial={{ opacity: 1 }}
                animate={{ opacity: stage === "unlocked" ? 0 : 1, y: stage === "unlocked" ? -50 : 0 }}
                transition={{ duration: 0.8, ease: "easeInOut", delay: stage === "unlocked" ? 2 : 0 }}
            >
                {/* Lock Screen Background */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                    <img src="/bg-gate.png" alt="" className="w-full h-full object-cover opacity-75" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30" />
                </div>
                <motion.div
                    className="glass-cinema text-center p-8 w-full max-w-md relative"
                    animate={shake ? { x: [-10, 10, -8, 8, -5, 5, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    {/* Header */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1, rotate: 360 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="text-4xl mb-4"
                    >
                        🌟
                    </motion.div>
                    <h1 className="font-display text-2xl md:text-3xl text-gold text-glow-gold mb-1 uppercase tracking-wider">
                        Welcome to the Premiere
                    </h1>
                    <p className="text-body-sm text-muted mb-8 italic">
                        VIP Access Required • Stage {stage === "unlocked" ? 3 : stage}/3
                    </p>

                    <AnimatePresence mode="wait">
                        {/* STAGE 1: Emoji Quiz */}
                        {stage === 1 && (
                            <motion.div
                                key="stage1"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                            >
                                <div className="text-3xl tracking-[0.2em] mb-4">{emojiQuiz.emojis}</div>
                                <p className="text-body-sm mb-6 text-secondary">Guess the Bollywood movie:</p>
                                <div className="grid grid-cols-1 gap-3">
                                    {emojiQuiz.options.map((opt) => (
                                        <button
                                            key={opt}
                                            onClick={() => handleEmojiSelect(opt)}
                                            className="btn-ghost"
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* STAGE 2: Lyrics Quiz */}
                        {stage === 2 && (
                            <motion.form
                                key="stage2"
                                onSubmit={handleLyricsSubmit}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                            >
                                <p className="font-display text-xl leading-relaxed mb-6 text-[#FFF8DC]">
                                    "{lyricQuiz.part1}
                                    <span className="inline-block w-24 border-b-2 border-gold mx-2 opacity-50" />
                                    {lyricQuiz.part2}"
                                </p>

                                <input
                                    type="text"
                                    value={lyricInput}
                                    onChange={(e) => setLyricInput(e.target.value)}
                                    placeholder="Missing word..."
                                    className={`input-cinema mb-4 text-center ${errorText ? "error" : ""}`}
                                    autoFocus
                                />

                                <button type="submit" className="btn-cinema w-full" disabled={!lyricInput}>
                                    Check Lyrics 🎬
                                </button>
                            </motion.form>
                        )}

                        {/* STAGE 3: Golden Ticket Scanner */}
                        {stage === 3 && (
                            <motion.div
                                key="stage3"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.1 }}
                                className="flex flex-col items-center"
                            >
                                <p className="mb-6 text-secondary">Press and hold to scan your Golden Ticket</p>

                                <div
                                    className="relative w-32 h-32 rounded-full flex items-center justify-center cursor-pointer select-none"
                                    onPointerDown={handleScanStart}
                                    onPointerUp={handleScanEnd}
                                    onPointerLeave={handleScanEnd}
                                    style={{ touchAction: "none" }} // Prevents mobile scrolling while holding
                                >
                                    {/* Progress Ring Background */}
                                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(255,215,0,0.1)" strokeWidth="4" />
                                        {/* Progress Circle */}
                                        <circle
                                            cx="50" cy="50" r="48"
                                            fill="none"
                                            stroke="#FFD700"
                                            strokeWidth="4"
                                            strokeDasharray="301.59"
                                            strokeDashoffset={301.59 - (301.59 * scanProgress) / 100}
                                            className="transition-all duration-100 ease-linear"
                                            style={{ filter: "drop-shadow(0 0 8px rgba(255,215,0,0.5))" }}
                                        />
                                    </svg>

                                    {/* Fingerprint / Ticket Icon inside */}
                                    <div className={`text-4xl transition-transform duration-300 ${scanProgress > 0 ? 'scale-90 opacity-70' : 'scale-100'}`}>
                                        🎟️
                                    </div>
                                </div>

                                <p className="mt-6 text-xs text-muted">
                                    {scanProgress > 0 ? "Scanning..." : "Validating credentials"}
                                </p>
                            </motion.div>
                        )}

                        {/* UNLOCKED STATE */}
                        {stage === "unlocked" && (
                            <motion.div
                                key="unlocked"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="py-6"
                            >
                                <div className="text-4xl mb-4">✨</div>
                                <h2 className="text-2xl text-success font-display tracking-widest uppercase">
                                    Access Granted
                                </h2>
                                <p className="mt-2 text-secondary">The show is about to begin...</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Error Message Toast */}
                    <AnimatePresence>
                        {errorText && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="absolute -bottom-12 left-0 right-0 text-error text-sm font-mono"
                            >
                                {errorText}
                            </motion.div>
                        )}
                    </AnimatePresence>

                </motion.div>
            </motion.div>
        </>
    );
}
