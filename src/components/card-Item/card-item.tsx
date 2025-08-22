import HeartIcon from "../../assets/icons/heart.svg";

const CardItem = () => {
    return (
        <div className="bg-[#fffffe] w-fit h-fit relative text-black p-2 pt-4">
            <img
                src={HeartIcon}
                width={20}
                height={20}
                loading="lazy"
                className="absolute  right-3 text-black"
            />
            <img
                loading="lazy"
                src="https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp"
                width={180}
                height={180}
                alt=""
            />
            <div className="flex flex-col gap-0 justify-between p-4">
                <strong>NOme do item</strong>
                <div className="flex"> Estrelas</div>
                <strong>Valor do item</strong>
            </div>
        </div>
    );
};

export default CardItem;
