import { useState, useEffect } from "react";
import axios from "axios";
import type CardItemI from "../interfaces/card-item.interface";
import { useProductStore } from "../store/useProductStore";

interface UseProductsOptions {
    category?: string;
    search?: string;
}

const useProducts = ({ category, search }: UseProductsOptions) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const setProductsData = useProductStore((state) => state.setProductsData);
    const data = useProductStore((state) => state.produtos);
    const [debouncedSearch, setDebouncedSearch] = useState(search);

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
        fetchProductsByUrl(`https://dummyjson.com/products/?limit=10`);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);

            try {
                let productsFetch: CardItemI[] = [];

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

    return { data, loading, error };
};

export default useProducts;
