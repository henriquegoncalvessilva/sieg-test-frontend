import cartIcon from "../../assets/icons/cart.svg";
import searchIcon from "../../assets/icons/search.svg";
import Drawer from "../drawer/drawer";
import { useProductStore } from "../../store/useProductStore";
import { useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";

const Header = () => {
    const drawer = useProductStore((state) => state.toggleDrawer);
    const countCartItem = useProductStore(
        (state) => state.totalCartItems?.length
    );
    const setInputValueStore = useProductStore((state) => state.setInputValue);
    const products = useProductStore((state) => state.produtos);
    const [inputValue, setInputValue] = useState("");
    const debouncedSearch = useDebounce(inputValue, 300);

    useEffect(() => {
        if (debouncedSearch !== undefined) {
            setInputValueStore(debouncedSearch);
        }
    }, [debouncedSearch, setInputValueStore]);
    return (
        <>
            <header className="py-5 w-full flex flex-col justify-center gap-6">
                <h1 className="font-bold text-left text-[#252427] text-xl w-full hidden md:block">
                    Search product
                </h1>

                <div className="flex flex-col md:flex-row-reverse items-center justify-between w-full gap-4">
                    <div className="flex md:flex-row-reverse justify-between w-full md:w-fit">
                        <div className="flex justify-between w-full md:w-fit">
                            <div className="flex flex-col gap-2">
                                <h1 className="font-bold text-left text-[#252427] text-xl w-full md:hidden">
                                    Search product
                                </h1>
                                <small className="font-medium md:hidden">
                                    Total products: {products.length}
                                </small>
                            </div>
                            <div
                                className="relative cursor-pointer"
                                onClick={() => drawer()}
                            >
                                <img
                                    className="self-end"
                                    src={cartIcon}
                                    width={32}
                                    alt="Icone carrinho de compra"
                                />
                                <div className="absolute right-0 top-0 bg-black text-white text-xs w-4 h-4 flex justify-center items-center rounded-full">
                                    {countCartItem}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white w-full flex pl-2 rounded-lg ">
                        <img src={searchIcon} alt="" width={26} />
                        <input
                            type="text"
                            value={inputValue}
                            placeholder="Iphone, Chair, Samsung, etc"
                            className="w-full py-2 px-3 "
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                    </div>
                </div>
            </header>

            <Drawer />
        </>
    );
};

export default Header;
