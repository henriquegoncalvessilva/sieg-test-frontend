import { useEffect } from "react";
import { useProductStore } from "../../store/useProductStore";
import type { Produto } from "../../interfaces/card-item.interface";
import trashIcon from "../../assets/icons/trash.svg";

const Drawer = () => {
    const openDrawer = useProductStore((state) => state.isDrawerOpen);
    const toggleDrawer = useProductStore((state) => state.toggleDrawer);
    const totalCartItems = useProductStore((state) => state.totalCartItems);
    const removeItem = useProductStore((state) => state.removeCarItem);
    const incrementItem = useProductStore((state) => state.incrementItem);
    const descrementItem = useProductStore(
        (state) => state.decrementCountCartItem
    );

    const handleRemoveItem = (item: Produto) => {
        removeItem(item);
    };

    useEffect(() => {
        console.log(totalCartItems);
    }, [totalCartItems]);

    return (
        <>
            {openDrawer && (
                <button
                    aria-pressed="true"
                    type="button"
                    className="fixed inset-0 bg-black opacity-20 z-40 cursor-pointer"
                    onClick={() => toggleDrawer()}
                ></button>
            )}

            <div
                className={`fixed right-0 top-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
                    openDrawer ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="flex justify-between items-center p-4 border-b text-black">
                    <h2 className="text-lg font-bold">
                        Seu Carrinho ( Total - {totalCartItems?.length} )
                    </h2>
                    <button
                        aria-pressed="true"
                        type="button"
                        className="cursor-pointer"
                        onClick={() => toggleDrawer()}
                    >
                        ✕
                    </button>
                </div>
                <div
                    className={`p-4 space-y-4 text-black overflow-auto overflow-x-hidden h-3/5 flex gap-8 flex-col ${
                        totalCartItems?.length === 0
                            ? "items-center justify-center"
                            : "items-start justify-start"
                    }`}
                >
                    {totalCartItems &&
                        totalCartItems.length > 0 &&
                        totalCartItems.map((item) => (
                            <div
                                key={item.id}
                                className="flex flex-col items-start justify-between m-0 w-full"
                            >
                                <div className="flex flex-col gap-2 w-full justify-between">
                                    <img
                                        src={item.thumbnail}
                                        alt={item.title}
                                        width={120}
                                        height={100}
                                    />
                                    <div className="flex items-center gap-2 ">
                                        <small>Produto:</small>
                                        <p>{item.title}</p>
                                    </div>
                                    <div className="flex items-center gap-0 ">
                                        <small>Preço: $</small>
                                        <p>{item.price}</p>
                                    </div>

                                    <div className="flex items-center gap-2 ">
                                        <small>Quantidade: </small>

                                        <div className="flex items-center gap-2">
                                            <button
                                                aria-pressed="true"
                                                type="button"
                                                className="w-7 h-7  bg-black text-white rounded-lg cursor-pointer"
                                                onClick={() =>
                                                    incrementItem(item, 1)
                                                }
                                            >
                                                +
                                            </button>
                                            <p>{item.quantidade}</p>
                                            <button
                                                aria-pressed="true"
                                                type="button"
                                                className="w-7 h-7  bg-black text-white rounded-lg cursor-pointer"
                                                onClick={() =>
                                                    descrementItem(item, 1)
                                                }
                                            >
                                                -
                                            </button>
                                            <button
                                                aria-pressed="true"
                                                type="button"
                                                className="w-7 h-7 bg-black text-white rounded-lg cursor-pointer flex items-center justify-center"
                                                onClick={() =>
                                                    handleRemoveItem(item)
                                                }
                                            >
                                                <img
                                                    width={20}
                                                    height={20}
                                                    src={trashIcon}
                                                    alt="Icone de lixeira"
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    {totalCartItems && totalCartItems.length === 0 && (
                        <h2 className="items-center  text-center text-4xl font-bold ">
                            Carrinho Vazio
                        </h2>
                    )}
                </div>
                <div className="p-4 border-t h-fit flex items-center justify-start">
                    {totalCartItems && totalCartItems.length > 0 && (
                        <>
                            <p>Subtotal: $ </p>
                            <p>
                                {totalCartItems
                                    .reduce(
                                        (acc, item) =>
                                            acc + item.price * item.quantidade,
                                        0
                                    )
                                    .toFixed(2)}
                            </p>
                        </>
                    )}
                </div>
                <div className="absolute bottom-0 w-full p-4 border-t">
                    <button
                        disabled={totalCartItems?.length === 0}
                        aria-pressed="true"
                        type="button"
                        className="w-full bg-black text-white py-2 rounded-lg cursor-pointer disabled:cursor-default disabled:opacity-50"
                    >
                        Finalizar Compra
                    </button>
                </div>
            </div>
        </>
    );
};

export default Drawer;
