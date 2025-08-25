import { renderHook, waitFor } from "@testing-library/react";
import * as api from "../services/api";
import useProducts from "./useProducts";
import type { Produto } from "../interfaces/produto.interface";

jest.mock("../services/api");

test("deve retornar produtos mockados", async () => {
    const mockProducts: Produto[] = [
        {
            id: 1,
            title: "Produto Teste",
            price: 10.99,
            category: "Vehicle",
            rating: 4.5,
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit",
            brand: "Marca do Produto",
            quantidade: 1,
            thumbnail: "image.png",
        },
    ];

    const mockedApi = api as jest.Mocked<typeof api>;
    mockedApi.fetchAllProducts.mockResolvedValue(mockProducts);

    const { result } = renderHook(() => useProducts({ search: "" }));
    await waitFor(() => expect(result.current.data.length).toBeGreaterThan(0));
});
