const CardItem = () => {
    return (
        <div className="bg-[#fffffe] w-fit h-fit relative text-black">
            <p className="absolute top-0 right-0 text-black">dsdd</p>
            <img
                loading="lazy"
                src="https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp"
                width={200}
                height={200}
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
