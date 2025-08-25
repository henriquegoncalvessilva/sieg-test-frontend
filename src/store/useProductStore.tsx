import { create } from "zustand";
import type { Produto } from "../interfaces/produto.interface";

interface StoreState {
    isDrawerOpen: boolean;
    isFilterOpen: boolean;
    loading: boolean;
    isModalOpen: boolean;
    countCartItem: Produto | null;
    totalCartItems: Produto[] | null;
    inputSearch: string | null;
    idItem: number | null;
    produtos: Produto[];
    sortValue: string;
    getIdItem: (value: number) => void;
    setIdItem: (value: number) => void;
    setInputValue: (value: string) => void;
    setProductsData: (products: Produto[]) => void;
    setLoading: (value: boolean) => void;
    setSort: (value: string) => void;
    clearIdItem: () => void;
    toggleDrawer: () => void;
    toggleFilter: () => void;
    toggleModal: () => void;
    clearFilters: () => void;
    incrementCountCartItem: (product: Produto, quantidade: number) => void;
    incrementItem: (product: Produto, quantidade: number) => void;
    decrementCountCartItem: (product: Produto, quantidade: number) => void;
    removeCarItem: (product: Produto) => void;
}

export const useProductStore = create<StoreState>((set) => ({
    isDrawerOpen: false,
    isFilterOpen: false,
    loading: true,
    isModalOpen: false,
    idItem: 0,
    inputSearch: null,
    countCartItem: null,
    totalCartItems: [],
    produtos: [],
    sortValue: "asc",
    setSort: (value) =>
        set({
            sortValue: value,
        }),
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
    toggleFilter: () =>
        set((state) => ({
            isFilterOpen: !state.isFilterOpen,
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
