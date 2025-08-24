import { useEffect, useMemo, useRef, useState } from "react";
import { useProductStore } from "../../store/useProductStore";
import type { Produto } from "../../interfaces/card-item.interface";
import { useDebounce } from "../../hooks/useDebounce";
import Button from "../button/button";

type FiltersProps = {
    className?: string;
};

const Filters = ({ className }: FiltersProps) => {
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [selectedPriceRange, setSelectedPriceRange] = useState<
        number | undefined
    >(undefined);
    const products = useProductStore((state) => state.produtos);
    const setProducts = useProductStore((state) => state.setProductsData);
    const originalProductsData = useRef<Produto[]>([]);
    const debouncedValue = useDebounce(selectedPriceRange, 300);
    const [badgeFilters, setBadgeFilters] = useState<
        (string | number | undefined)[]
    >([]);
    const { clearFilters } = useProductStore();

    const handleClearFilters = () => {
        setSelectedCategory("");
        setBadgeFilters([]);
        setSelectedPriceRange(undefined);
        clearFilters();
    };

    useEffect(() => {
        if (originalProductsData.current.length === 0) {
            originalProductsData.current = products;
        }
    }, [products]);

    const filteredProducts = useMemo(() => {
        let filtereds = [...originalProductsData.current];

        if (selectedCategory) {
            filtereds = filtereds.filter(
                (p) => p.category === selectedCategory
            );
        }

        if (debouncedValue) {
            filtereds = filtereds.filter((p) => p.price <= debouncedValue);
        }

        return filtereds;
    }, [selectedCategory, debouncedValue]);

    useEffect(() => {
        setProducts(filteredProducts);
    }, [filteredProducts]);

    useEffect(() => {
        const filters = [selectedCategory, selectedPriceRange].filter(Boolean);

        setBadgeFilters(filters);
    }, [selectedCategory, selectedPriceRange, debouncedValue]);

    const categories: string[] = [
        "smartphones",
        "laptops",
        "fragrances",
        "skincare",
        "groceries",
        "home-decoration",
        "furniture",
        "tops",
        "womens-dresses",
        "womens-shoes",
        "mens-shirts",
        "mens-shoes",
        "mens-watches",
        "womens-watches",
        "womens-bags",
        "womens-jewellery",
        "sunglasses",
        "vehicle",
        "motorcycle",
        "lighting",
    ];

    return (
        <section
            className={`flex flex-col justify-between items-start gap-4 ${className}`}
        >
            <small className="font-medium hidden md:block">
                Total Products: {products.length}
            </small>
            <div className="flex gap-4 justify-between items-center w-full">
                <div className="flex gap-2 items-center justify-center">
                    <h2 className="font-bold text-left text-[#252427] text-xl">
                        Filters
                    </h2>
                    <p className="px-3 bg-black text-white rounded-md self-end">
                        {badgeFilters.length}
                    </p>
                </div>

                <Button
                    disabled={badgeFilters.length === 0}
                    className="cursor-pointer disabled:text-gray-400 focus:border p-2"
                    onClick={handleClearFilters}
                >
                    Clear Filters
                </Button>
            </div>
            <div className="flex flex-col gap-4 w-full justify-between items-start">
                <select
                    className="p-2 border rounded w-full  text-[#252427] text-xl capitalize"
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    value={selectedCategory}
                >
                    <option className=" text-[#252427] text-xl" value="">
                        All Categories
                    </option>
                    {categories.map((category) => (
                        <option
                            className="text-[#252427] text-xl capitalize"
                            key={category}
                            value={category}
                        >
                            {category.replace("-", " ")}
                        </option>
                    ))}
                </select>
                <div className="flex  xl:flex-col items-center gap-2 w-full ">
                    <label
                        htmlFor="price-range"
                        className="p-2 px-0 rounded w-full  text-[#252427] text-xl "
                    >
                        Price Range:
                        {selectedPriceRange
                            ? Number(selectedPriceRange).toFixed()
                            : 0}
                    </label>

                    <div className="flex w-full text-black items-center">
                        <p className="w-full text-center font-bold">$ 0</p>
                        <input
                            type="range"
                            id="price-range"
                            min="1"
                            max="50000"
                            step="10"
                            className="w-48"
                            defaultValue={500}
                            onChange={(e) =>
                                setSelectedPriceRange(Number(e.target.value))
                            }
                        />
                        <p className="w-full text-center font-bold ">
                            $ 50.000
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Filters;
