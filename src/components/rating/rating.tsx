import React from "react";
import RatingIcon from "../../assets/icons/rating.svg";
type RatingProps = {
    rating?: number | string;
};

const Rating = React.memo(({ rating }: RatingProps) => {
    return (
        <>
            {Array.from({ length: Number(rating) }, (_, i) => (
                <img
                    loading="lazy"
                    fetchPriority="low"
                    key={i}
                    src={RatingIcon}
                    width={20}
                    alt="Icone de avaliação"
                />
            ))}
        </>
    );
});

export default Rating;
