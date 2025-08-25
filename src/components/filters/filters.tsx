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
    const sortValue = useProductStore((state) => state.sortValue);
    const valueSearch = useProductStore((state) => state.inputSearch);
    const setSort = useProductStore((state) => state.setSort);

    const handleClearFilters = () => {
        setSelectedCategory("");
        setBadgeFilters([]);
        setSelectedPriceRange(undefined);
        clearFilters();
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSort(e.target.value);
    };

    useEffect(() => {
        if (originalProductsData.current.length === 0) {
            originalProductsData.current = products;
        }
    }, [products]);

    const filteredProducts = useMemo(() => {
        let result = [...originalProductsData.current];

        if (valueSearch) {
            result = result.filter((p) =>
                p.title.toLowerCase().includes(valueSearch.toLowerCase())
            );
        }

        if (selectedCategory) {
            result = result.filter((p) => p.category === selectedCategory);
        }

        if (debouncedValue) {
            result = result.filter((p) => p.price <= debouncedValue);
        }

        switch (sortValue) {
            case "asc":
                result.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case "desc":
                result.sort((a, b) => b.title.localeCompare(a.title));
                break;
            case "expensive":
                result.sort((a, b) => b.price - a.price);
                break;
            case "cheap":
                result.sort((a, b) => a.price - b.price);
                break;
        }

        return result;
    }, [valueSearch, selectedCategory, debouncedValue, sortValue]);

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
            className={`flex flex-col justify-between items-start gap-4  ${className}`}
        >
            <small className="font-medium hidden md:block">
                Total Products: {products.length}
            </small>
            <div className="flex gap-4 justify-between items-center w-full">
                <div className="flex gap-8 items-start justify-start flex-col">
                    <div className="flex gap-2 items-start justify-start">
                        <h2 className="font-bold text-left text-[#252427] text-xl">
                            Filters
                        </h2>
                        <p className="px-3 bg-black text-white rounded-md self-end">
                            {badgeFilters.length}
                        </p>
                    </div>
                    <div className="flex items-center self-start mb-5 gap-1">
                        <p className="text-[#252427] text-sm md:text-xl">
                            Sort by:{" "}
                        </p>
                        <form className="self-start w-fit bg-white p-2 rounded-md">
                            <select
                                name="sort"
                                value={sortValue}
                                id="sort"
                                onChange={handleSortChange}
                            >
                                <option value="">Default</option>
                                <option value="asc">A - Z</option>
                                <option value="desc">Z - A</option>
                                <option value="expensive">Expensive</option>
                                <option value="cheap">Cheap</option>
                            </select>
                        </form>
                    </div>
                </div>

                <Button
                    disabled={badgeFilters.length === 0}
                    className="cursor-pointer p-2  hover:text-white self-start "
                    onClick={handleClearFilters}
                >
                    Clear Filters
                </Button>
            </div>
            <form className="flex flex-col gap-4 w-full justify-between items-start mb-10">
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
                <div
                    className="flex 
                          md:flex-row xl:flex-col items-center gap-2 w-full "
                >
                    <label
                        htmlFor="price-range"
                        className="p-2 px-0 rounded w-full  text-[#252427] text-sm md:text-xl "
                    >
                        Price Range: $
                        {selectedPriceRange ? (
                            Number(selectedPriceRange).toFixed()
                        ) : (
                            <span>1000</span>
                        )}
                    </label>

                    <div className="flex w-full text-black items-center">
                        <p className="w-2/12 text-center font-bold text-sm md:text-xl">
                            $ 0
                        </p>
                        <input
                            type="range"
                            id="price-range"
                            min="1"
                            max="50000"
                            step="10"
                            className="w-48"
                            defaultValue={1000}
                            onChange={(e) =>
                                setSelectedPriceRange(Number(e.target.value))
                            }
                        />
                        <p className="w-4/12 text-center font-bold text-sm md:text-xl ">
                            $ 50.000
                        </p>
                    </div>
                </div>
            </form>
        </section>
    );
};

export default Filters;
