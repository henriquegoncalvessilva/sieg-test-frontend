import { useEffect, useState } from "react";

const Filters = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>("");
    const [selectedPriceRange, setSelectedPriceRange] = useState<
        string | undefined
    >("");

    const handleClearFilters = () => {
        setSelectedCategory("");
        setSelectedPriceRange("");
    };

    useEffect(() => {
        console.log("selectedCategory:", selectedCategory);
        console.log("selectedPriceRange:", selectedPriceRange);
    }, [selectedCategory, selectedPriceRange]);

    return (
        <section className="flex flex-col w-full justify-between items-center gap-4 ">
            <div className="flex gap-4 justify-between items-center w-full">
                <h2 className="font-bold text-left text-[#252427] text-xl">
                    Filtros
                </h2>
                <button type="button" onClick={handleClearFilters}>
                    Limpar Filtros
                </button>
            </div>
            <div className="flex flex-col gap-4 w-full justify-between items-center">
                <select
                    className="p-2 border rounded w-full  text-[#252427] text-xl"
                    defaultValue={""}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option className=" text-[#252427] text-xl" value="">
                        Categorias
                    </option>
                    <option
                        className=" text-[#252427] text-xl"
                        value="smartphones"
                    >
                        Smartphones
                    </option>
                    <option className=" text-[#252427] text-xl" value="laptops">
                        Laptops
                    </option>
                    <option
                        className=" text-[#252427] text-xl"
                        value="fragrances"
                    >
                        Fragrances
                    </option>
                    <option
                        className=" text-[#252427] text-xl"
                        value="skincare"
                    >
                        Skincare
                    </option>
                    <option
                        className=" text-[#252427] text-xl"
                        value="groceries"
                    >
                        Groceries
                    </option>
                </select>
                <div className="flex items-center gap-2">
                    <label htmlFor="price-range" className="whitespace-nowrap">
                        Preço:
                    </label>
                    <input
                        type="range"
                        id="price-range"
                        min="1"
                        max="10000"
                        className="w-48"
                        defaultValue={selectedPriceRange}
                        onChange={(e) => setSelectedPriceRange(e.target.value)}
                    />
                    <span>R$ 0 - R$ 10.000</span>
                </div>
            </div>
        </section>
    );
};

export default Filters;
