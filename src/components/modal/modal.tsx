import { useEffect } from "react";
import { useProductStore } from "../../store/useProductStore";
import Rating from "../rating/rating";
import Button from "../button/button";

const Modal = () => {
    const openModal = useProductStore((state) => state.isModalOpen);
    const toggleModal = useProductStore((state) => state.toggleModal);
    const produtos = useProductStore((state) => state.produtos);
    const idItem = useProductStore((state) => state.idItem);
    const selectedProduct = produtos.find((p) => p.id === idItem);
    const totalCartItems = useProductStore((state) => state.totalCartItems);
    const addItemToCart = useProductStore(
        (state) => state.incrementCountCartItem
    );

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                toggleModal();
            }
        };

        if (openModal) {
            window.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [openModal, toggleModal]);

    const handleAddItemToCart = () => {
        if (
            selectedProduct &&
            !totalCartItems?.find((item) => item.id === selectedProduct?.id)
        ) {
            console.log(selectedProduct);
            addItemToCart(selectedProduct, 1);
            console.log(useProductStore.getState().totalCartItems);
        } else {
            alert("Já tem o item");
        }
        toggleModal();
    };
    return (
        <>
            {openModal && (
                <Button
                    className="fixed inset-0 bg-black opacity-20  z-40"
                    onClick={() => toggleModal()}
                />
            )}

            <div
                className={`${
                    openModal ? "block" : "hidden"
                } fixed top-1/2 left-1/2 ${
                    openModal && "w-[320px] h-fit md:w-fit md:h-fit"
                } bg-white shadow-lg z-50 rounded-xl p-4 transform transition-all duration-300 text-black ${
                    openModal
                        ? "opacity-100 scale-100 -translate-x-1/2 -translate-y-1/2"
                        : "opacity-0 scale-75 -translate-x-1/2 -translate-y-2"
                }`}
            >
                <div className="flex justify-between items-center border-b text-black pb-2">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-md font-bold">
                            {selectedProduct?.title}
                        </h2>
                        <small className="font-bold">
                            {selectedProduct?.brand}
                        </small>
                    </div>

                    <Button
                        className="cursor-pointer justify-center px-4 py-2  rounded-lg w-8 h-8 items-center flex flex-col bg-black text-white "
                        onClick={() => toggleModal()}
                    >
                        ✕
                    </Button>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col justify-center text-left h-fit md:gap-2">
                        <img
                            src={selectedProduct?.thumbnail}
                            alt={selectedProduct?.title}
                            className="w-48 h-48 rounded-lg self-center"
                        />
                        <small className="font-bold">Description</small>
                        <p>{selectedProduct?.description}</p>
                        <small className="font-bold">Category</small>
                        <p>{selectedProduct?.category}</p>
                        <small className="font-bold">Price</small>
                        <p> $ {selectedProduct?.price}</p>
                        <small className="font-bold">Rating</small>
                        <div className="flex">
                            <Rating
                                rating={selectedProduct?.rating.toFixed(0)}
                            />
                        </div>
                    </div>
                    <div className="w-full p-4 border-t justify-center items-center flex">
                        <Button
                            onClick={handleAddItemToCart}
                            className="w-full md:w-3xs bg-black text-white py-2 rounded-lg cursor-pointer"
                        >
                            Add to Cart
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;
