import cartIcon from "../../assets/icons/cart.svg";
import searchIcon from "../../assets/icons/search.svg";
import Drawer from "../drawer/drawer";
import { useStore } from "../../store/useStore";
<<<<<<< HEAD
=======
import { useResponsive } from "../../hooks/useResponsive";
>>>>>>> 571d754f54e4ee4094dd344029c037384f33cd0a

const Header = () => {
    const drawer = useStore((state) => state.toggleDrawer);
    const countCartItem = useStore((state) => state.countCartItem);
    return (
        <>
            <header className="py-5 w-full flex flex-col justify-center gap-6">
                <h1 className="font-bold text-left text-[#252427] text-xl w-full hidden md:block">
                    Pesquisar produto
                </h1>
                <div className="flex flex-col md:flex-row-reverse items-center justify-between w-full gap-4">
                    <div className="flex md:flex-row-reverse justify-between w-full md:w-fit">
                        <div className="flex justify-between w-full md:w-fit">
                            <h1 className="font-bold text-left text-[#252427] text-xl w-full md:hidden">
                                Pesquisar Produto
                            </h1>
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
                            placeholder="Pesquisar produto"
                            className="w-full py-2 px-3 "
                        />
                    </div>
                </div>
            </header>

            <Drawer />
        </>
    );
};

export default Header;
