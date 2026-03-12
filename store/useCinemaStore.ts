import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CinemaState {
    isUnlocked: boolean;
    unlock: () => void;
    reset: () => void;
}

export const useCinemaStore = create<CinemaState>()(
    persist(
        (set) => ({
            isUnlocked: false,
            unlock: () => set({ isUnlocked: true }),
            reset: () => set({ isUnlocked: false }),
        }),
        {
            name: "cinema-storage",
            partialize: (state) => ({ isUnlocked: state.isUnlocked }),
        }
    )
);
