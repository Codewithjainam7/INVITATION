"use client";
import { useEffect, useRef } from "react";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    rotation: number;
    rSpeed: number;
    opacity: number;
}

export default function ConfettiCanvas({ trigger }: { trigger: boolean }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particles = useRef<Particle[]>([]);
    const animationId = useRef<number | null>(null);

    useEffect(() => {
        if (!trigger || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Resize canvas to full screen
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const colors = ["#FFD700", "#DAA520", "#DC143C", "#FFF8DC"];
        const isMobile = window.innerWidth < 768;
        const count = isMobile ? 80 : 150;

        // Create particles originating from center/bottom
        for (let i = 0; i < count; i++) {
            particles.current.push({
                x: canvas.width / 2,
                y: canvas.height / 2 + 100, // Starts a bit lower than center
                vx: (Math.random() - 0.5) * (Math.random() * 20 + 5),
                vy: (Math.random() - 1) * (Math.random() * 20 + 10), // Mostly shoots up
                size: Math.random() * 8 + 4,
                color: colors[Math.floor(Math.random() * colors.length)],
                rotation: Math.random() * 360,
                rSpeed: (Math.random() - 0.5) * 10,
                opacity: 1,
            });
        }

        let lastTime = performance.now();

        const animate = (time: number) => {
            const delta = (time - lastTime) / 16; // Normalize to 60fps
            lastTime = time;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = particles.current.length - 1; i >= 0; i--) {
                const p = particles.current[i];

                // Physics
                p.x += p.vx * delta;
                p.y += p.vy * delta;
                p.vy += 0.5 * delta; // Gravity
                p.rotation += p.rSpeed * delta;

                // Fade out over time or when falling past screen
                if (p.y > canvas.height + 50) p.opacity -= 0.02 * delta;

                // Remove dead particles
                if (p.opacity <= 0) {
                    particles.current.splice(i, 1);
                    continue;
                }

                // Draw
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate((p.rotation * Math.PI) / 180);
                ctx.globalAlpha = p.opacity;
                ctx.fillStyle = p.color;

                // Draw small rectangles (confetti chips)
                ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.5);
                ctx.restore();
            }

            if (particles.current.length > 0) {
                animationId.current = requestAnimationFrame(animate);
            } else {
                // Clear canvas when done
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        };

        animationId.current = requestAnimationFrame(animate);

        return () => {
            if (animationId.current) cancelAnimationFrame(animationId.current);
        };
    }, [trigger]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[2000] w-full h-full"
            style={{ display: trigger ? 'block' : 'none' }}
        />
    );
}
