import RatingIcon from "../../assets/icons/rating.svg";
type RatingProps = {
    rating?: number | string;
};

const Rating = ({ rating }: RatingProps) => {
    return (
        <>
            {Array.from({ length: Number(rating) }, (_, i) => (
                <img
                    key={i}
                    src={RatingIcon}
                    width={20}
                    alt="Icone de avaliação"
                />
            ))}
        </>
    );
};

export default Rating;
