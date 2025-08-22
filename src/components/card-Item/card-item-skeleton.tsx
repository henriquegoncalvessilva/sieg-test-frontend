const CardItemSkeleton = () => {
    return (
        <div className="bg-[#fffffe] w-fit h-fit relative text-black p-2 pt-4 animate-pulse">
            <div className="w-[180px] h-[180px] bg-gray-200 rounded-md"></div>

            <div className="flex flex-col gap-2 justify-between p-4 w-[180px]">
                <div className="h-4 bg-gray-300 rounded w-full"></div>

                <div className="h-3 bg-gray-300 rounded w-full"></div>

                <div className="h-4 bg-gray-300 rounded w-full"></div>
            </div>
        </div>
    );
};

export default CardItemSkeleton;
