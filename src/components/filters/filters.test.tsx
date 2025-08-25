import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Filters from "./filters";
import { useProductStore } from "../../store/useProductStore";
import type { Produto } from "../../interfaces/produto.interface";

jest.mock("../../store/useProductStore");

const mockProducts: Produto[] = [
    {
        id: 1,
        title: "iPhone 14",
        category: "smartphones",
        price: 4000,
        thumbnail: "",
        rating: 5,
        brand: "Apple",
        description: "top",
        quantidade: 1,
    },
    {
        id: 2,
        title: "Dell XPS",
        category: "laptops",
        price: 8000,
        thumbnail: "",
        rating: 5,
        brand: "Dell",
        description: "notebook",
        quantidade: 1,
    },
];

describe("Filters - lógica de filtragem", () => {
    const setProducts = jest.fn();
    const clearFilters = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useProductStore as unknown as jest.Mock).mockImplementation(
            (selector) => {
                const state = {
                    produtos: mockProducts,
                    setProductsData: setProducts,
                    clearFilters,
                    inputSearch: "",
                };
                return typeof selector === "function" ? selector(state) : state;
            }
        );
    });

    it("filtra por categoria", async () => {
        render(<Filters />);

        const select = screen.getByRole("combobox");
        fireEvent.change(select, { target: { value: "laptops" } });

        await waitFor(() => {
            expect(setProducts).toHaveBeenCalledWith([
                expect.objectContaining({ title: "Dell XPS" }),
            ]);
        });
    });

    it("filtra por preço", async () => {
        render(<Filters />);

        const range = screen.getByRole("slider");
        fireEvent.change(range, { target: { value: "5000" } });

        await waitFor(() => {
            expect(setProducts).toHaveBeenCalledWith([
                expect.objectContaining({ title: "iPhone 14" }),
            ]);
        });
    });
});
