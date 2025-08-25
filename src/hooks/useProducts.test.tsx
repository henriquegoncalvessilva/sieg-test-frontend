// products.test.tsx
import { renderHook, waitFor } from "@testing-library/react";
import * as api from "../services/api"; // onde estão suas funções fetchProductsByName, fetchAllProducts
import useProducts from "./useProducts";

jest.mock("../services/api");

test("deve retornar produtos mockados", async () => {
    const mockProducts = [
        {
            id: 1,
            title: "Produto Teste",
            price: 10.99,
            category: "Vehicle",
            rating: 4.5,
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit",
        },
    ];

    const mockedApi = api as jest.Mocked<typeof api>;
    mockedApi.fetchAllProducts.mockResolvedValue(mockProducts);

    const { result } = renderHook(() => useProducts({ search: "" }));
    await waitFor(() => expect(result.current.data.length).toBeGreaterThan(0));
});
