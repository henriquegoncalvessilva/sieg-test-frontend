import { useState } from "react";
import { useProductStore } from "../../store/useProductStore";

type FiltersProps = {
    className?: string;
};

const Filters = ({ className }: FiltersProps) => {
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [selectedPriceRange, setSelectedPriceRange] = useState<
        string | undefined
    >("");
    const { clearFilters, inputSearch } = useProductStore();

    const handleClearFilters = () => {
        clearFilters();
    };

    return (
        <section
            className={`flex flex-col justify-between items-center gap-4 ${className}`}
        >
            <div className="flex gap-4 justify-between items-center w-full">
                <h2 className="font-bold text-left text-[#252427] text-xl">
                    Filtros
                </h2>
                <button
                    disabled={inputSearch == ""}
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
                <div className="flex  xl:flex-col items-center gap-2 w-full ">
                    <label
                        htmlFor="price-range"
                        className="p-2 rounded w-full  text-[#252427] text-xl "
                    >
                        Faixa de preço: R$ {selectedPriceRange}
                    </label>
                    <div className="flex w-full text-black items-center">
                        <p className="w-full text-center font-bold">R$ 0</p>
                        <input
                            type="range"
                            id="price-range"
                            min="1"
                            max="10000"
                            className="w-48"
                            defaultValue={selectedPriceRange}
                            onChange={(e) =>
                                setSelectedPriceRange(e.target.value)
                            }
                        />
                        <p className="w-full text-center font-bold ">
                            R$ 10.000
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Filters;
