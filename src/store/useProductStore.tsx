import { create } from "zustand";
import type { Produto } from "../interfaces/card-item.interface";

interface StoreState {
    isDrawerOpen: boolean;
    loading: boolean;
    isModalOpen: boolean;
    countCartItem: Produto | null;
    totalCartItems: Produto[] | null;
    inputSearch: string;
    idItem: number | null;
    produtos: Produto[];
    toggleDrawer: () => void;
    toggleModal: () => void;
    clearFilters: () => void;
    incrementCountCartItem: (product: Produto, quantidade: number) => void;
    incrementItem: (product: Produto, quantidade: number) => void;
    clearIdItem: () => void;
    setIdItem: (value: number) => void;
    getIdItem: (value: number) => void;
    setInputValue: (value: string) => void;
    decrementCountCartItem: (product: Produto, quantidade: number) => void;
    setProductsData: (products: Produto[]) => void;
    removeCarItem: (product: Produto) => void;
    setLoading: (value: boolean) => void;
}

export const useProductStore = create<StoreState>((set) => ({
    isDrawerOpen: false,
    loading: true,
    isModalOpen: false,
    idItem: 0,
    inputSearch: "",
    countCartItem: null,
    totalCartItems: [],
    page: 1,
    limit: 10,
    produtos: [],
    totalPages: 1,
    incrementItem: (product: Produto) =>
        set((state) => {
            const exists = state.totalCartItems?.find(
                (item) => item.id === product.id
            );

            if (exists) {
                return {
                    totalCartItems: state.totalCartItems?.map((item) =>
                        item.id === product.id
                            ? {
                                  ...item,
                                  quantidade: item.quantidade + 1,
                              }
                            : item
                    ),
                };
            }

            return {
                totalCartItems: [
                    ...(state.totalCartItems ?? []),
                    { ...product, quantidade: 1 },
                ],
            };
        }),

    setLoading: (value) =>
        set({
            loading: value,
        }),
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

    incrementCountCartItem: (product: Produto, amount: number = 1) =>
        set((state) => {
            const existingItem = state.totalCartItems?.find(
                (item) => item.id === product.id
            );

            if (existingItem) {
                return {
                    totalCartItems: state.totalCartItems?.map((item) =>
                        item.id === product.id
                            ? {
                                  ...item,
                                  quantidade: (item.quantidade ?? 0) + amount,
                              }
                            : item
                    ),
                };
            }

            return {
                totalCartItems: [
                    ...(state.totalCartItems ?? []),
                    { ...product, quantidade: amount },
                ],
            };
        }),

    decrementCountCartItem: (product: Produto, amount: number = 1) =>
        set((state) => ({
            totalCartItems:
                state.totalCartItems
                    ?.map((item) =>
                        item.id === product.id
                            ? {
                                  ...item,
                                  quantidade: Math.max(
                                      (item.quantidade ?? 1) - amount,
                                      0
                                  ),
                              }
                            : item
                    )
                    .filter((item) => item.quantidade! > 0) ?? [],
        })),
}));
