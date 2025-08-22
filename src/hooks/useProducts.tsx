import { useState, useEffect } from "react";
import axios from "axios";
import type CardItemI from "../interfaces/card-item.interface";

interface UseProductsOptions {
    category?: string;
    search?: string;
}

const useProducts = ({ category, search }: UseProductsOptions) => {
    const [products, setProducts] = useState<CardItemI[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);

            try {
                let url = "https://dummyjson.com/products";

                if (category) {
                    url = `https://dummyjson.com/products/category/${category}`;
                } else if (search) {
                    url = `https://dummyjson.com/products/search?q=${search}`;
                }

                const { data } = await axios.get(url);

                const mappedProducts: CardItemI[] = data.products.map(
                    (p: CardItemI) => ({
                        id: p.id,
                        title: p.title,
                        thumbnail: p.thumbnail,
                        rating: p.rating,
                        price: p.price,
                        category: p.category,
                    })
                );

                setProducts(mappedProducts);
            } catch (err: unknown) {
                if (axios.isAxiosError(err)) {
                    setError(err.message);
                } else {
                    setError("Erro desconhecido");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [category, search]);

    return { products, loading, error };
};

export default useProducts;
