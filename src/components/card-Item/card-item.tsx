import HeartIcon from "../../assets/icons/heart.svg";
import HeartFavoritedIcon from "../../assets/icons/favorite.svg";
import { useProductStore } from "../../store/useProductStore";
import React, { useEffect, useState } from "react";
import Rating from "../rating/rating";

type CardItemProps = {
    id: number;
    nome: string;
    image: string;
    avaliacoes: number;
    preco: number;
    className?: string;
};

const CardItem = React.memo(
    ({ nome, preco, avaliacoes, image, id, className }: CardItemProps) => {
        const setIdItem = useProductStore((state) => state.setIdItem);
        const openModal = useProductStore((state) => state.toggleModal);
        const [isFavorite, setIsFavorite] = useState(false);

        const handleModal = () => {
            setIdItem(id);
            openModal();
        };

        useEffect(() => {
            const existing = JSON.parse(
                localStorage.getItem("favorite") || "[]"
            );

            setIsFavorite(existing.includes(id));
        }, []);

        const handleFavorite = () => {
            const existing = JSON.parse(
                localStorage.getItem("favorite") || "[]"
            );
            if (!existing.includes(id)) {
                const updated = [...existing, id];
                localStorage.setItem("favorite", JSON.stringify(updated));
                setIsFavorite(true);
                return;
            } else {
                const updated = existing.filter((item: number) => item !== id);
                localStorage.setItem("favorite", JSON.stringify(updated));
                setIsFavorite(false);
                return;
            }
        };

        return (
            <>
                <div
                    className={`bg-[#fffffe] w-[196px] h-fit relative text-black p-2 pt-4 ${className}`}
                >
                    <button
                        onClick={handleFavorite}
                        aria-pressed="true"
                        type="button"
                        className="absolute right-3 text-black  cursor-pointer"
                    >
                        <img
                            src={!isFavorite ? HeartIcon : HeartFavoritedIcon}
                            width={28}
                            height={20}
                            loading="lazy"
                            fetchPriority="low"
                            alt="Icone de favorito"
                        />
                    </button>
                    <button
                        aria-pressed="true"
                        type="button"
                        onClick={handleModal}
                        className="cursor-pointer"
                    >
                        <img
                            sizes="180px"
                            src={image}
                            width={180}
                            height={180}
                            className="object-cover"
                            loading="lazy"
                            fetchPriority="high"
                            alt={`Imagem do Item o produto ${nome}"`}
                        />
                        <div className="flex flex-col gap-4 items-start p-2 text-left w-fit ">
                            <strong className="truncate overflow-hidden w-[160px]">
                                {nome}
                            </strong>
                            <div className="flex gap-2 items-center justify-center">
                                <small className="font-bold">Rating: </small>
                                <div className="flex ">
                                    <Rating rating={avaliacoes} />
                                </div>
                            </div>
                            <div className="flex gap-2 items-center">
                                <small className="font-bold">Price: </small>
                                <strong>$ {preco}</strong>
                            </div>
                        </div>
                    </button>
                </div>
            </>
        );
    }
);

export default CardItem;
