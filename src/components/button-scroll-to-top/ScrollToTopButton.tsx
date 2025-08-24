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
                <div className="fixed bottom-10 right-6 p-3 rounded-md bg-black text-white shadow-lg hover:bg-gray-800 transition">
                    <Button
                        onClick={scrollToTop}
                        className="w-4 h-4 flex justify-center items-center"
                    >
                        <img src={ArrowUp} alt="Arrow Up" />
                    </Button>
                </div>
            )}
        </>
    );
}

export default ScrollToTopButton;
