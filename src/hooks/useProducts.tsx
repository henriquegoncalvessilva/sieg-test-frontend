import { useState, useEffect } from "react";
import axios from "axios";
import { useProductStore } from "../store/useProductStore";
import type { Produto } from "../interfaces/produto.interface";
import { fetchAllProducts, fetchProductsByName } from "../services/api";
import { useDebounce } from "./useDebounce";

interface UseProductsOptions {
    search?: string;
}

const useProducts = ({ search }: UseProductsOptions) => {
    const [error, setError] = useState<string | null>(null);
    const setProductsData = useProductStore((state) => state.setProductsData);
    const setLoading = useProductStore((state) => state.setLoading);
    const data = useProductStore((state) => state.produtos);

    const debouncedSearch = useDebounce(search, 300);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                let productsFetch: Produto[] = [];

                if (search) {
                    productsFetch = await fetchProductsByName(
                        debouncedSearch ?? ""
                    );
                } else {
                    productsFetch = await fetchAllProducts();
                }

                setProductsData(productsFetch);
            } catch (err) {
                setError(
                    axios.isAxiosError(err) ? err.message : "Erro desconhecido"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [debouncedSearch]);

    return { data, error };
};

export default useProducts;
