import { useEffect } from "react";
import type Produto from "../../interfaces/card-item.interface";
import { useProductStore } from "../../store/useProductStore";

const Drawer = () => {
    const openDrawer = useProductStore((state) => state.isDrawerOpen);
    const toggleDrawer = useProductStore((state) => state.toggleDrawer);
    const totalCartItems = useProductStore((state) => state.totalCartItems);
    const removeItem = useProductStore((state) => state.removeCarItem);

    const handleRemoveItem = (item: Produto) => {
        removeItem(item);
    };

    useEffect(() => {
        console.log(totalCartItems);
    }, [totalCartItems]);

    return (
        <>
            {openDrawer && (
                <div
                    className="fixed inset-0 bg-black opacity-20 z-40"
                    onClick={() => toggleDrawer()}
                ></div>
            )}

            <div
                className={`fixed right-0 top-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
                    openDrawer ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="flex justify-between items-center p-4 border-b text-black">
                    <h2 className="text-lg font-bold">Seu Carrinho</h2>
                    <button onClick={() => toggleDrawer()}>✕</button>
                </div>
                <div className="p-4 space-y-4 text-black">
                    {totalCartItems &&
                        totalCartItems.length > 0 &&
                        totalCartItems.map((item) => (
                            <div key={item.id}>
                                <p>{item.title}</p>
                                <button
                                    type="button"
                                    className="bg-gray-400 p-2"
                                    onClick={() => handleRemoveItem(item)}
                                >
                                    Remover
                                </button>
                            </div>
                        ))}
                </div>
                <div className="absolute bottom-0 w-full p-4 border-t">
                    <button className="w-full bg-black text-white py-2 rounded-lg">
                        Finalizar Compra
                    </button>
                </div>
            </div>
        </>
    );
};

export default Drawer;
