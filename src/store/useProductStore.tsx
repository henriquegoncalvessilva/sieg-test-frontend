import { create } from "zustand";
import type Produto from "../interfaces/card-item.interface";

interface StoreState {
    isDrawerOpen: boolean;
    countCartItem: number;
    inputSearch: string;
    produtos: Produto[];
    toggleDrawer: () => void;
    incrementCountCartItem: () => void;
    setInputValue: (value: string) => void;
    decrementCountCartItem: () => void;
    setProductsData: (products: Produto[]) => void;
}

export const useProductStore = create<StoreState>((set) => ({
    isDrawerOpen: false,
    inputSearch: "",
    countCartItem: 0,
    page: 1,
    limit: 10,
    produtos: [],
    totalPages: 1,
    setInputValue(value) {
        set({
            inputSearch: value,
        });
    },
    setProductsData: (produtos) =>
        set({
            produtos,
        }),

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
