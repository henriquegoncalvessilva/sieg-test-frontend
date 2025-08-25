import { useProductStore } from "../../store/useProductStore";
import Button from "../button/button";
import { useEffect } from "react";
import CartItem from "../cart-item/cart-item";

const Drawer = () => {
    const openDrawer = useProductStore((state) => state.isDrawerOpen);
    const toggleDrawer = useProductStore((state) => state.toggleDrawer);
    const totalCartItems = useProductStore((state) => state.totalCartItems);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                toggleDrawer();
            }
        };

        if (openDrawer) {
            window.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [openDrawer, toggleDrawer]);

    return (
        <>
            {openDrawer && (
                <button
                    className="fixed inset-0 bg-black opacity-20 z-40 cursor-pointer"
                    onClick={() => toggleDrawer()}
                />
            )}

            <div
                className={`fixed right-0 top-0 h-full w-80  bg-white shadow-lg z-50 transform transition-transform duration-300 ${
                    openDrawer ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="flex justify-between items-center p-4 border-b text-black">
                    <h2 className="text-lg font-bold">
                        Cart ( Total - {totalCartItems?.length} )
                    </h2>
                    <Button
                        className="cursor-pointer justify-center px-4 py-2  rounded-lg w-8 h-8 items-center flex flex-col bg-black text-white"
                        onClick={() => toggleDrawer()}
                    >
                        ✕
                    </Button>
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
                            <CartItem key={item.id} item={item} />
                        ))}
                    {totalCartItems && totalCartItems.length === 0 && (
                        <h2 className="items-center  text-center text-4xl font-bold ">
                            Cart Empty
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
                    <Button
                        disabled={totalCartItems?.length === 0}
                        className="w-full bg-black text-white py-2 rounded-lg cursor-pointer disabled:cursor-default disabled:opacity-50"
                    >
                        Checkout
                    </Button>
                </div>
            </div>
        </>
    );
};

export default Drawer;
