import type { Produto } from "../../interfaces/produto.interface";
import { useProductStore } from "../../store/useProductStore";
import Button from "../button/button";
import trashIcon from "../../assets/icons/trash.svg";

type CartItemProps = {
    item: Produto;
};
const CartItem = ({ item }: CartItemProps) => {
    const removeItem = useProductStore((state) => state.removeCarItem);
    const incrementItem = useProductStore((state) => state.incrementItem);
    const descrementItem = useProductStore(
        (state) => state.decrementCountCartItem
    );
    const handleRemoveItem = (item: Produto) => {
        removeItem(item);
    };

    return (
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
                    <small>Product:</small>
                    <p>{item.title}</p>
                </div>
                <div className="flex items-center gap-0 ">
                    <small>Price: $</small>
                    <p>{item.price}</p>
                </div>

                <div className="flex items-center gap-2 ">
                    <small>Count: </small>

                    <div className="flex items-center gap-2">
                        <Button
                            className="w-7 h-7  bg-black text-white rounded-lg cursor-pointer"
                            onClick={() => incrementItem(item, 1)}
                        >
                            +
                        </Button>
                        <p>{item.quantidade}</p>
                        <Button
                            className="w-7 h-7  bg-black text-white rounded-lg cursor-pointer"
                            onClick={() => descrementItem(item, 1)}
                        >
                            -
                        </Button>
                        <Button
                            className="w-7 h-7 bg-black text-white rounded-lg cursor-pointer flex items-center justify-center"
                            onClick={() => handleRemoveItem(item)}
                        >
                            <img
                                width={20}
                                height={20}
                                src={trashIcon}
                                alt="Icone de lixeira"
                            />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
