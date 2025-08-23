import { useState, useEffect } from "react";
import axios from "axios";
import { useProductStore } from "../store/useProductStore";
import type { Produto } from "../interfaces/card-item.interface";

interface UseProductsOptions {
    category?: string;
    search?: string;
}

const useProducts = ({ category, search }: UseProductsOptions) => {
    const [error, setError] = useState<string | null>(null);
    const setProductsData = useProductStore((state) => state.setProductsData);
    const setLoading = useProductStore((state) => state.setLoading);
    const data = useProductStore((state) => state.produtos);
    const [_, setDebouncedSearch] = useState(search);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);
        return () => clearTimeout(handler);
    }, [search]);

    const fetchProductsByUrl = async (url: string) => {
        const { data } = await axios.get(url);
        return data.products;
    };

    const fetchProductsByCategory = (category: string) =>
        fetchProductsByUrl(
            `https://dummyjson.com/products/category/${category}`
        );

    const fetchProductsByName = (name: string) =>
        fetchProductsByUrl(`https://dummyjson.com/products/search?q=${name}`);

    const fetchAllProducts = () =>
        fetchProductsByUrl(`https://dummyjson.com/products/?limit=0`);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                let productsFetch: Produto[] = [];

                if (category) {
                    productsFetch = await fetchProductsByCategory(category);
                } else if (search) {
                    productsFetch = await fetchProductsByName(search);
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
    }, [category, search]);

    return { data, error };
};

export default useProducts;
