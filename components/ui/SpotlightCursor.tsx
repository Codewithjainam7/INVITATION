"use client";
import { useEffect, useState } from "react";
import { useCinemaStore } from "@/store/useCinemaStore";

export default function SpotlightCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isPointer, setIsPointer] = useState(false);
    const [isTouch, setIsTouch] = useState(false);
    const isUnlocked = useCinemaStore((state) => state.isUnlocked);

    useEffect(() => {
        // Check if it's a touch device
        if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
            setIsTouch(true);
            return;
        }

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let currentX = mouseX;
        let currentY = mouseY;
        let animationFrameId: number;

        const onMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Check if hovering over clickable element
            const target = e.target as HTMLElement;
            setIsPointer(
                window.getComputedStyle(target).cursor === "pointer" ||
                target.tagName.toLowerCase() === "a" ||
                target.tagName.toLowerCase() === "button"
            );
        };

        const smoothMove = () => {
            // Lerp for smooth trailing effect
            currentX += (mouseX - currentX) * 0.15;
            currentY += (mouseY - currentY) * 0.15;

            setPosition({ x: currentX, y: currentY });
            animationFrameId = requestAnimationFrame(smoothMove);
        };

        window.addEventListener("mousemove", onMouseMove);
        animationFrameId = requestAnimationFrame(smoothMove);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    if (isTouch) return null;

    return (
        <div className="hidden md:block">
            <style dangerouslySetInnerHTML={{ __html: `@media (pointer: fine) { body { cursor: none !important; } }` }} />
            <div
                className="fixed top-0 left-0 w-6 h-6 rounded-full bg-gold pointer-events-none z-[9999] mix-blend-screen flex items-center justify-center"
                style={{
                    transform: `translate(${position.x - 12}px, ${position.y - 12}px) scale(${isPointer ? 1.5 : 1})`,
                    transition: 'transform 0.1s ease-out',
                    boxShadow: '0 0 20px rgba(255, 215, 0, 0.8), inset 0 0 10px rgba(255, 255, 255, 0.5)'
                }}
            >
                <div className="w-2 h-2 bg-white rounded-full opacity-80" />
            </div>
            {isUnlocked && (
                <div
                    className="fixed top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none z-[1]"
                    style={{
                        transform: `translate(${position.x - 250}px, ${position.y - 250}px)`,
                        background: 'radial-gradient(circle, rgba(255, 215, 0, 0.08) 0%, transparent 60%)',
                    }}
                />
            )}
        </div>
    );
}
