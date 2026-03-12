"use client";
import React, { Suspense, useCallback } from "react";
import { LenisProvider } from "@/hooks/useLenis";
import FilmGrain from "@/components/ui/FilmGrain";
import SpotlightCursor from "@/components/ui/SpotlightCursor";
import CinematicLoader from "@/components/ui/CinematicLoader";
import VipEntryGate from "@/components/sections/VipEntryGate";

// Section imports
import HeroSection from "@/components/sections/HeroSection";
import PartyDetails from "@/components/sections/PartyDetails";
import TheCast from "@/components/sections/TheCast";
import Countdown from "@/components/sections/Countdown";
import DialogueGen from "@/components/sections/DialogueGen";
import EmojiMovieQuiz from "@/components/sections/GuessWho";
import RoleSlotMachine from "@/components/sections/BollywoodNameGen";
import SquadAwards from "@/components/sections/SquadAwards";
import MovieQuoteTyper from "@/components/sections/MovieQuoteTyper";
import Footer from "@/components/sections/Footer";

import { useCinemaStore } from "@/store/useCinemaStore";

export default function Home() {
  const isUnlocked = useCinemaStore((state) => state.isUnlocked);
  const [mounted, setMounted] = React.useState(false);
  const [loaderDone, setLoaderDone] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleLoaderComplete = useCallback(() => {
    setLoaderDone(true);
  }, []);

  // Prevent hydration mismatch blank screens from Zustand persist
  if (!mounted) {
    return (
      <main className="relative min-h-[100dvh] bg-cinema-black text-white font-body flex items-center justify-center">
        <div className="text-gold font-display text-xl animate-pulse">Loading Premiere...</div>
      </main>
    );
  }

  return (
    <LenisProvider>
      {/* Cinematic Loading Screen */}
      {!loaderDone && <CinematicLoader onComplete={handleLoaderComplete} />}

      <main className="relative min-h-[100dvh] bg-cinema-black text-white selection:bg-gold selection:text-black font-body overflow-x-hidden">
        {/* Cinematic Background Image */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <img src="/bg-home.png" alt="" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black" />
        </div>

        {/* Grand Premiere Ambient Background Glow */}
        <div className="fixed top-0 left-0 w-full h-[120vh] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cinema-maroon/20 via-transparent to-transparent pointer-events-none z-0" />
        <div className="fixed top-[40vh] left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] max-w-2xl max-h-2xl bg-gold/5 blur-[120px] rounded-full pointer-events-none z-0" />

        {/* Global Cinematic Overlays */}
        <FilmGrain />
        <SpotlightCursor />

        {/* Level 1: VIP Gate / Entry Sequence */}
        {loaderDone && (
          <Suspense fallback={<div className="screen-center text-gold font-display text-xl animate-pulse">Loading Premiere...</div>}>
            <VipEntryGate />
          </Suspense>
        )}

        {/* Actual Body Content - Mounted only after unlock so animations play correctly */}
        <div className="relative z-10 w-full flex flex-col items-center px-[16px]">
          {isUnlocked && loaderDone && (
            <Suspense fallback={null}>
              <HeroSection />
              <PartyDetails />
              <TheCast />
              <Countdown />
              <DialogueGen />
              <EmojiMovieQuiz />
              <RoleSlotMachine />
              <SquadAwards />
              <MovieQuoteTyper />
              <Footer />
            </Suspense>
          )}
        </div>
      </main>
    </LenisProvider>
  );
}
