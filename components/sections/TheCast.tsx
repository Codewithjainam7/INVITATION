"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { castMembers } from "@/lib/castData";
import { useCinemaStore } from "@/store/useCinemaStore";

export default function TheCast() {
    const isUnlocked = useCinemaStore((s) => s.isUnlocked);
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.2 });

    // Track active dot
    const [activeIdx, setActiveIdx] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        if (!scrollRef.current) return;
        const container = scrollRef.current;
        const cards = container.children;
        const scrollCenter = container.scrollLeft + container.clientWidth / 2;

        let closestIdx = 0;
        let closestDist = Infinity;

        for (let i = 0; i < castMembers.length; i++) {
            const card = cards[i] as HTMLElement;
            if (!card) continue;
            const cardCenter = card.offsetLeft + card.offsetWidth / 2;
            const dist = Math.abs(scrollCenter - cardCenter);
            if (dist < closestDist) {
                closestDist = dist;
                closestIdx = i;
            }
        }
        if (closestIdx !== activeIdx) setActiveIdx(closestIdx);
    };

    if (!isUnlocked) return null;

    return (
        <section
            ref={containerRef}
            className="py-20 w-full overflow-hidden flex flex-col items-center"
        >
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="font-display text-subtitle text-gold tracking-[0.4em] uppercase mb-12"
            >
                STARRING
            </motion.h2>

            <div className="w-full relative px-5">
                <motion.div
                    ref={scrollRef}
                    onScroll={handleScroll}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.1 }
                        }
                    }}
                    className="flex md:flex-wrap md:justify-center overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none gap-6 pb-12 hide-scrollbar"
                    style={{
                        paddingLeft: "max(20px, env(safe-area-inset-left))",
                        paddingRight: "max(20px, env(safe-area-inset-right))",
                        scrollBehavior: "smooth"
                    }}
                >
                    {castMembers.map((cast) => {
                        let IconProps = ""; // Fallback
                        if (cast.role === "Lead Hero") IconProps = "🦸‍♂️";
                        if (cast.role === "The Villain") IconProps = "🦹‍♂️";
                        if (cast.role === "Item Number Performer") IconProps = "🕺";
                        if (cast.role === "Comic Relief") IconProps = "🎭";
                        if (cast.role === "Leading Lady") IconProps = "👸";

                        return (
                            <motion.div
                                key={cast.id}
                                variants={{
                                    hidden: { opacity: 0, x: 50 },
                                    visible: { opacity: 1, x: 0 }
                                }}
                                whileHover={{ scale: 1.02 }}
                                className="glass-cinema relative flex-shrink-0 snap-center md:snap-none flex flex-col items-center text-center p-8 pt-10 w-[85vw] max-w-[340px] md:w-[calc(33.33%-1rem)] lg:w-[calc(20%-1.2rem)] min-h-[380px]"
                                style={{
                                    borderColor: `var(--border-gold)`,
                                    willChange: "transform, opacity"
                                }}
                            >
                                {/* Colored Glow Border on Hover */}
                                <style dangerouslySetInnerHTML={{
                                    __html: `
                #card-${cast.id}:hover {
                  box-shadow: 0 0 30px ${cast.color}40, inset 0 1px 0 rgba(255, 255, 255, 0.05);
                  border-color: ${cast.color}80;
                }
              `}} />

                                <div id={`card-${cast.id}`} className="absolute inset-0 rounded-2xl pointer-events-none transition-all duration-300" />

                                <div
                                    className="mb-8 relative z-10 transform origin-bottom hover:scale-105 transition-transform"
                                    style={{ animationDuration: '0.5s' }}
                                >
                                    {cast.image ? (
                                        <div className="w-32 h-32 rounded-full border-2 p-1 overflow-hidden flex items-center justify-center bg-black/40" style={{ borderColor: cast.color, boxShadow: `0 0 20px ${cast.color}40` }}>
                                            <img
                                                src={cast.image}
                                                alt={cast.name}
                                                className="w-full h-full object-cover object-top rounded-full pointer-events-none"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-32 h-32 rounded-full border-2 flex items-center justify-center bg-black/50" style={{ borderColor: cast.color, boxShadow: `0 0 20px ${cast.color}40` }}>
                                            <div className="text-5xl">{IconProps}</div>
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1 flex flex-col items-center justify-end w-full">
                                    <div
                                        className="font-mono text-[0.65rem] px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest relative z-10"
                                        style={{ background: `${cast.color}15`, color: cast.color }}
                                    >
                                        {cast.role}
                                    </div>

                                    <h3
                                        className="font-display text-2xl mb-1 relative z-10 uppercase tracking-widest"
                                        style={{ color: cast.color }}
                                    >
                                        {cast.name}
                                    </h3>

                                    <p className="font-mono text-[0.75rem] mb-3 text-white/50 relative z-10 tracking-[0.2em] uppercase">
                                        AKA "{cast.nickname}"
                                    </p>

                                    <p
                                        className="font-display text-sm mb-4 relative z-10 px-3 py-1.5 rounded-lg"
                                        style={{ background: `${cast.color}15`, color: cast.color }}
                                    >
                                        "{cast.catchphrase}"
                                    </p>

                                    <p className="font-body text-body-rg text-muted italic relative z-10 px-2 line-clamp-3">
                                        "{cast.tagline}"
                                    </p>
                                </div>
                            </motion.div>
                        )
                    })}
                    {/* Invisible spacer so last card can hit center properly on desktop if scrolling is used, useless otherwise but safe to keep */}
                    <div className="w-[10vw] flex-shrink-0 md:hidden" />
                </motion.div>
            </div>

            {/* Pagination Dots (Mobile primarily) */}
            <div className="flex justify-center gap-2 mt-4 md:hidden">
                {castMembers.map((_, idx) => (
                    <div
                        key={idx}
                        className="w-2 h-2 rounded-full transition-all duration-300"
                        style={{
                            background: idx === activeIdx ? '#FFD700' : 'rgba(255,255,255,0.2)',
                            width: idx === activeIdx ? '16px' : '8px'
                        }}
                    />
                ))}
            </div>

            {/* Hide scrollbar utility class (applied via JSX) */}
            <style dangerouslySetInnerHTML={{
                __html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
        </section>
    );
}
