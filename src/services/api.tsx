import axios from "axios";

export const fetchProductsByUrl = async (url: string) => {
    const { data } = await axios.get(url);
    return data.products;
};

export const fetchProductsByName = (name: string) =>
    fetchProductsByUrl(`https://dummyjson.com/products/search?q=${name}`);

export const fetchAllProducts = () =>
    fetchProductsByUrl(`https://dummyjson.com/products/?limit=0`);
