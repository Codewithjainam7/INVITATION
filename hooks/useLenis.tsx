"use client";
import React, { useEffect, useState } from "react";
import { ReactLenis } from "@studio-freight/react-lenis";
import { useCinemaStore } from "@/store/useCinemaStore";

export function LenisProvider({ children }: { children: React.ReactNode }) {
    const isUnlocked = useCinemaStore((state) => state.isUnlocked);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <>{children}</>;

    return (
        <ReactLenis
            root
            options={{
                lerp: 0.1,
                duration: 1.5,
                smoothWheel: true,
                wheelMultiplier: 1,
                touchMultiplier: 1.5,
            }}
        >
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {children as any}
        </ReactLenis>
    );
}
