// Hook for gravity physics simulation
"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface FloatingElement {
    id: string;
    x: number;
    y: number;
    vx: number;
    vy: number;
    rotation: number;
    vr: number;
}

export function useGravityPhysics(gravity: number) {
    const [elements, setElements] = useState<FloatingElement[]>([]);
    const animFrameRef = useRef<number>(0);

    // Gravity ranges from 0 (normal) to 100 (zero-g float)
    const antigravityForce = gravity / 100;

    useEffect(() => {
        if (antigravityForce <= 0) {
            cancelAnimationFrame(animFrameRef.current);
            return;
        }

        const animate = () => {
            setElements((prev) =>
                prev.map((el) => ({
                    ...el,
                    y: el.y + el.vy * antigravityForce,
                    x: el.x + el.vx * antigravityForce,
                    rotation: el.rotation + el.vr * antigravityForce,
                    vy: el.vy * 0.99 + (Math.random() - 0.5) * 0.5 * antigravityForce,
                    vx: el.vx * 0.99 + (Math.random() - 0.5) * 0.3 * antigravityForce,
                }))
            );
            animFrameRef.current = requestAnimationFrame(animate);
        };

        animFrameRef.current = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animFrameRef.current);
    }, [antigravityForce]);

    const addElement = useCallback(
        (id: string) => {
            setElements((prev) => [
                ...prev,
                {
                    id,
                    x: 0,
                    y: 0,
                    vx: (Math.random() - 0.5) * 2,
                    vy: -Math.random() * 3,
                    rotation: 0,
                    vr: (Math.random() - 0.5) * 5,
                },
            ]);
        },
        []
    );

    return { elements, antigravityForce, addElement };
}
