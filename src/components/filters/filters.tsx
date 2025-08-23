import { useEffect, useRef, useState } from "react";
import { useProductStore } from "../../store/useProductStore";
import type { Produto } from "../../interfaces/card-item.interface";

type FiltersProps = {
    className?: string;
};

const Filters = ({ className }: FiltersProps) => {
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [selectedPriceRange, setSelectedPriceRange] = useState<
        number | undefined
    >(500);
    const produtos = useProductStore((state) => state.produtos);
    const setProdutos = useProductStore((state) => state.setProductsData);
    const produtosOriginais = useRef<Produto[]>([]);

    const { clearFilters, inputSearch } = useProductStore();

    const handleClearFilters = () => {
        setSelectedCategory("");
        clearFilters();
    };

    useEffect(() => {
        if (produtosOriginais.current.length === 0) {
            produtosOriginais.current = produtos;
            console.log(produtosOriginais.current);
        }
    }, [produtos]);

    useEffect(() => {
        if (selectedCategory.length > 0) {
            setProdutos(
                produtosOriginais.current.filter(
                    (p) => p.category === selectedCategory
                )
            );
        } else {
            setProdutos(produtosOriginais.current);
        }
    }, [selectedCategory]);

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
        "automotive",
        "motorcycle",
        "lighting",
    ];

    return (
        <section
            className={`flex flex-col justify-between items-center gap-4 ${className}`}
        >
            <div className="flex gap-4 justify-between items-center w-full">
                <h2 className="font-bold text-left text-[#252427] text-xl">
                    Filtros
                </h2>
                <button
                    aria-pressed="true"
                    disabled={inputSearch == "" && selectedCategory == ""}
                    type="button"
                    className="cursor-pointer disabled:text-gray-400 focus:border p-2"
                    onClick={handleClearFilters}
                >
                    Limpar Filtros
                </button>
            </div>
            <div className="flex flex-col gap-4 w-full justify-between items-center">
                <select
                    className="p-2 border rounded w-full  text-[#252427] text-xl"
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    value={selectedCategory}
                >
                    <option className=" text-[#252427] text-xl" value="">
                        Todos
                    </option>
                    {categories.map((category) => (
                        <option
                            className=" text-[#252427] text-xl"
                            key={category}
                            value={category}
                        >
                            {category}
                        </option>
                    ))}
                </select>
                <div className="flex  xl:flex-col items-center gap-2 w-full ">
                    <label
                        htmlFor="price-range"
                        className="p-2 rounded w-full  text-[#252427] text-xl "
                    >
                        Faixa de preço:
                        {Number(selectedPriceRange).toFixed()}
                    </label>
                    <div className="flex w-full text-black items-center">
                        <p className="w-full text-center font-bold">$ 0</p>
                        <input
                            type="range"
                            id="price-range"
                            min="500"
                            max="8000"
                            step="500"
                            className="w-48"
                            defaultValue={selectedPriceRange}
                            onChange={(e) =>
                                setSelectedPriceRange(Number(e.target.value))
                            }
                        />
                        <p className="w-full text-center font-bold ">$ 8.000</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Filters;
