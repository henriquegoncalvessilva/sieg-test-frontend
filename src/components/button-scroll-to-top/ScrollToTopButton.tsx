import { useEffect, useState } from "react";
import ArrowUp from "../../assets/icons/arrow-up.svg";
import Button from "../button/button";
function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 200) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <>
            {isVisible && (
                <Button
                    onClick={scrollToTop}
                    className="fixed bottom-10 right-3 p-3 w-10 h-10 md:w-16 md:h-16 rounded-md bg-black text-white shadow-lg hover:bg-gray-800 transition"
                >
                    <img src={ArrowUp} alt="Arrow Up" />
                </Button>
            )}
        </>
    );
}

export default ScrollToTopButton;
