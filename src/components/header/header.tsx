import cartIcon from "../../assets/icons/cart.svg";
import searchIcon from "../../assets/icons/search.svg";

const Header = () => {
    return (
        <header className="py-5 px-3 w-full flex justify-center">
            <div className="flex flex-col md:flex-row-reverse items-center justify-between w-80 md:w-full gap-8">
                <div className="flex md:flex-row-reverse justify-between w-full">
                    <div className="flex justify-between w-full md:w-fit">
                        <h1 className="font-bold text-left text-[#252427] text-xl w-full md:hidden">
                            Catálogo de Produtos
                        </h1>
                        <div className="relative">
                            <img
                                className="self-end cursor-pointer"
                                src={cartIcon}
                                width={32}
                                alt="Icone carrinho de compra"
                            />
                            <div className="absolute right-0 top-0 bg-black text-white text-sm  w-3 h-3 flex justify-center items-center p-2 rounded-full">
                                1
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-[#f3f3f3] w-full flex pl-2 rounded-lg">
                    <img src={searchIcon} alt="" width={26} />
                    <input
                        type="text"
                        placeholder="Pesquisar produto"
                        className="w-full py-2 px-3 "
                    />
                </div>
            </div>
        </header>
    );
};

export default Header;
