import HeartIcon from "../../assets/icons/heart.svg";
import CartCard from "../../assets/icons/cart-card.svg";
import { useStore } from "../../store/useStore";
import React from "react";

type CardItemProps = {
    id: number;
    nome: string;
    image: string;
    avaliacoes: number;
    preco: number;
};

const CardItem = React.memo(
    ({ nome, preco, avaliacoes, image, id }: CardItemProps) => {
        const addItemToCart = useStore((state) => state.incrementCountCartItem);
        return (
            <>
                <div className="bg-[#fffffe] w-[196px] h-[308px] relative text-black p-2 pt-4">
                    <img
                        src={HeartIcon}
                        width={20}
                        height={20}
                        loading="lazy"
                        className="absolute  right-3 text-black"
                    />
                    <img
                        loading="lazy"
                        src={image}
                        width={180}
                        height={180}
                        alt=""
                    />
                    <div className="flex flex-col gap-0 justify-between p-4">
                        <strong>{nome}</strong>
                        <div className="flex"> Estrelas</div>
                        <strong>{preco}</strong>
                    </div>
                    <div className="relative" onClick={addItemToCart}>
                        <img
                            src={CartCard}
                            width={20}
                            height={20}
                            loading="lazy"
                            className="absolute right-3 bottom-5"
                        />
                    </div>
                </div>
            </>
        );
    }
);

export default CardItem;
