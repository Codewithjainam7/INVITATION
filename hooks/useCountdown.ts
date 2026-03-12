"use client";
import { useEffect, useState } from "react";

export function useCountdown(targetDateStr: string) {
    const [timeLeft, setTimeLeft] = useState({
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
    });
    const [isPassed, setIsPassed] = useState(false);

    useEffect(() => {
        const target = new Date(targetDateStr).getTime();

        const calculateTime = () => {
            const now = new Date().getTime();
            const difference = target - now;

            if (difference <= 0) {
                setIsPassed(true);
                return false;
            }

            const d = Math.floor(difference / (1000 * 60 * 60 * 24));
            const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((difference % (1000 * 60)) / 1000);

            setTimeLeft({
                days: d.toString().padStart(2, "0"),
                hours: h.toString().padStart(2, "0"),
                minutes: m.toString().padStart(2, "0"),
                seconds: s.toString().padStart(2, "0"),
            });
            return true;
        };

        if (calculateTime()) {
            const timer = setInterval(calculateTime, 1000);
            return () => clearInterval(timer);
        }
    }, [targetDateStr]);

    return { ...timeLeft, isPassed };
}
