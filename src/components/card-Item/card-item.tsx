import HeartIcon from "../../assets/icons/heart.svg";
import { useProductStore } from "../../store/useProductStore";
import React from "react";
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

        const handleModal = () => {
            setIdItem(id);
            openModal();
        };

        return (
            <>
                <button type="button" onClick={handleModal}>
                    <div
                        className={`bg-[#fffffe] w-[196px] h-fit relative text-black p-2 pt-4 ${className}`}
                    >
                        <img
                            src={HeartIcon}
                            width={20}
                            height={20}
                            loading="lazy"
                            className="absolute right-3 text-black"
                            alt="Icone de favorito"
                        />
                        <img
                            loading="lazy"
                            src={image}
                            width={180}
                            height={180}
                            alt="Imagem do Item"
                        />
                        <div className="flex flex-col gap-4 items-start p-2 text-left w-fit ">
                            <strong className="truncate overflow-hidden w-[160px]">
                                {nome}
                            </strong>
                            <div className="flex gap-2 items-center justify-center">
                                <small className="font-bold">Avaliação: </small>
                                <div className="flex ">
                                    <Rating rating={avaliacoes} />
                                </div>
                            </div>
                            <div className="flex gap-2 items-center">
                                <small className="font-bold">Preço: </small>
                                <strong>$ {preco}</strong>
                            </div>
                        </div>
                    </div>
                </button>
            </>
        );
    }
);

export default CardItem;
