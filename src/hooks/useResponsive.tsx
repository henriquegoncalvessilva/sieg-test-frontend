import { useEffect, useState } from "react";

export function useResponsive(breakpoint: number = 1280) {
    const [isResponsive, setIsResponsive] = useState<boolean>(
        typeof window !== "undefined" ? window.innerWidth >= breakpoint : false
    );

    useEffect(() => {
        const handleResize = () => {
            setIsResponsive(window.innerWidth >= breakpoint);
        };

        window.addEventListener("resize", handleResize);

        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [breakpoint]);

    return isResponsive;
}
