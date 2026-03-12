"use client";
import { useState, useEffect } from "react";

export default function CinematicLoader({ onComplete }: { onComplete: () => void }) {
    const [phase, setPhase] = useState<"countdown" | "logo" | "done">("countdown");
    const [count, setCount] = useState(3);
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
        // Countdown: 3 → 2 → 1
        const t1 = setTimeout(() => setCount(2), 800);
        const t2 = setTimeout(() => setCount(1), 1600);
        // Switch to logo
        const t3 = setTimeout(() => setPhase("logo"), 2400);
        // Start fade out and disable pointer events
        const t4 = setTimeout(() => {
            setOpacity(0);
            setPhase("done");
        }, 4200);
        // Complete
        const t5 = setTimeout(() => onComplete(), 5000);

        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
    }, [onComplete]);

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 99999,
                backgroundColor: "#000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity,
                transition: "opacity 0.8s ease-in-out",
                overflow: "hidden",
                pointerEvents: phase === "done" ? "none" : "auto",
            }}
        >
            {/* Scanlines */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    opacity: 0.03,
                    pointerEvents: "none",
                    backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 4px)",
                }}
            />

            {phase === "countdown" && (
                <div style={{ textAlign: "center", position: "relative" }}>
                    {/* Circle */}
                    <div
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 280,
                            height: 280,
                            borderRadius: "50%",
                            border: "2px solid rgba(255,255,255,0.15)",
                        }}
                    />
                    {/* Cross lines */}
                    <div
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 280,
                            height: 280,
                        }}
                    >
                        <div style={{ position: "absolute", top: "50%", left: 0, width: "100%", height: 1, background: "rgba(255,255,255,0.1)" }} />
                        <div style={{ position: "absolute", top: 0, left: "50%", width: 1, height: "100%", background: "rgba(255,255,255,0.1)" }} />
                    </div>
                    {/* Number */}
                    <div
                        key={count}
                        style={{
                            fontSize: "clamp(80px, 20vw, 140px)",
                            color: "rgba(255,255,255,0.9)",
                            fontFamily: "var(--font-display), serif",
                            lineHeight: 1,
                            textShadow: "0 0 60px rgba(255,215,0,0.3)",
                            animation: "loaderPop 0.6s ease-out",
                        }}
                    >
                        {count}
                    </div>
                </div>
            )}

            {phase === "logo" && (
                <div
                    style={{
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 16,
                        animation: "loaderFadeIn 0.6s ease-out",
                    }}
                >
                    <div style={{ fontSize: 56 }}>🎬</div>
                    <h1
                        style={{
                            fontSize: "clamp(28px, 6vw, 48px)",
                            color: "#FFD700",
                            fontFamily: "var(--font-display), serif",
                            letterSpacing: "0.3em",
                            textTransform: "uppercase",
                            textShadow: "0 0 40px rgba(255,215,0,0.4)",
                            margin: 0,
                        }}
                    >
                        Clark Jain
                    </h1>
                    <p
                        style={{
                            fontSize: 11,
                            color: "rgba(255,255,255,0.4)",
                            fontFamily: "var(--font-mono), monospace",
                            letterSpacing: "0.6em",
                            textTransform: "uppercase",
                            margin: 0,
                        }}
                    >
                        Studios
                    </p>
                    <div
                        style={{
                            width: 180,
                            height: 1,
                            background: "linear-gradient(to right, transparent, rgba(255,215,0,0.4), transparent)",
                            marginTop: 8,
                        }}
                    />
                    <p
                        style={{
                            fontSize: 9,
                            color: "rgba(255,255,255,0.25)",
                            fontFamily: "var(--font-mono), monospace",
                            letterSpacing: "0.4em",
                            textTransform: "uppercase",
                            marginTop: 8,
                            animation: "loaderFadeIn 0.6s ease-out 0.4s both",
                        }}
                    >
                        Presents a Grand Premiere
                    </p>
                </div>
            )}

            {/* CSS Keyframes — inline in a style tag so it always works */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes loaderPop {
                    0% { transform: scale(2); opacity: 0; }
                    50% { transform: scale(1); opacity: 1; }
                    100% { transform: scale(1); opacity: 1; }
                }
                @keyframes loaderFadeIn {
                    from { opacity: 0; transform: translateY(15px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}} />
        </div>
    );
}
