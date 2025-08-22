import { create } from "zustand";

interface StoreState {
    isDrawerOpen: boolean;
    countCartItem: number;
    toggleDrawer: () => void;
    incrementCountCartItem: () => void;
    decrementCountCartItem: () => void;
}

export const useStore = create<StoreState>((set) => ({
    isDrawerOpen: false,
    countCartItem: 0,
    toggleDrawer: () =>
        set((state) => ({
            isDrawerOpen: !state.isDrawerOpen,
        })),

    incrementCountCartItem: () =>
        set((state) => ({
            countCartItem: state.countCartItem + 1,
        })),

    decrementCountCartItem: () =>
        set((state) => ({
            countCartItem: state.countCartItem - 1,
        })),
}));
