import { create } from "zustand";
import type Produto from "../interfaces/card-item.interface";

interface StoreState {
    isDrawerOpen: boolean;
    isModalOpen: boolean;
    countCartItem: Produto | null;
    totalCartItems: Produto[] | null;
    inputSearch: string;
    idItem: number | null;
    produtos: Produto[];
    toggleDrawer: () => void;
    toggleModal: () => void;
    clearFilters: () => void;
    incrementCountCartItem: (product: Produto) => void;
    clearIdItem: () => void;
    setIdItem: (value: number) => void;
    getIdItem: (value: number) => void;
    setInputValue: (value: string) => void;
    // decrementCountCartItem: () => void;
    setProductsData: (products: Produto[]) => void;
    removeCarItem: (product: Produto) => void;
}

export const useProductStore = create<StoreState>((set) => ({
    isDrawerOpen: false,
    isModalOpen: false,
    idItem: 0,
    inputSearch: "",
    countCartItem: null,
    totalCartItems: [],
    page: 1,
    limit: 10,
    produtos: [],
    totalPages: 1,
    removeCarItem: (product: Produto) =>
        set((state) => ({
            totalCartItems: state.totalCartItems?.filter(
                (item) => item.id !== product.id
            ),
        })),
    clearIdItem: () =>
        set({
            idItem: null,
        }),
    setIdItem: (value) =>
        set({
            idItem: value,
        }),
    getIdItem: (value) =>
        set({
            idItem: value,
        }),
    clearFilters: () =>
        set({
            inputSearch: "",
        }),
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

    toggleModal: () =>
        set((state) => ({
            isModalOpen: !state.isModalOpen,
        })),

    incrementCountCartItem: (product: Produto) =>
        set((state) => ({
            totalCartItems: [...(state.totalCartItems ?? []), product],
        })),

    // decrementCountCartItem: () =>
    //     set((state) => ({
    //         countCartItem: state.countCartItem - 1,
    //     }
    // )),
}));
