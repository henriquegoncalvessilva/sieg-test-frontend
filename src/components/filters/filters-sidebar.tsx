import { useProductStore } from "../../store/useProductStore";
import { useEffect } from "react";
import Filters from "./filters";
import Button from "../button/button";

const FilterSideBar = () => {
    const openFilters = useProductStore((state) => state.isFilterOpen);
    const toggleFilters = useProductStore((state) => state.toggleFilter);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                toggleFilters();
            }
        };

        if (openFilters) {
            window.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [openFilters, toggleFilters]);

    return (
        <>
            {openFilters && (
                <button
                    className="fixed inset-0 bg-black opacity-20 z-40 cursor-pointer"
                    onClick={() => toggleFilters()}
                />
            )}

            <div
                className={`fixed p-2 right-0 top-0 h-full w-full md:w-1/2  bg-white shadow-lg z-50 transform transition-transform duration-300 ${
                    openFilters ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <Filters />
                <Button
                    className="w-full  bg-black text-white py-2 rounded-lg cursor-pointer"
                    onClick={() => toggleFilters()}
                >
                    Close filters
                </Button>
            </div>
        </>
    );
};

export default FilterSideBar;
