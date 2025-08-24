import { type ReactNode } from "react";

type Props = {
    children: ReactNode;
};

const MainContainer = ({ children }: Props) => {
    return (
        <main
            className="flex 
               flex-col
             items-center justify-center my-0 mx-auto w-full h-full md:w-3xl lg:max-w-5xl xl:w-full xl:max-w-7xl  text-black p-4 relative"
        >
            {children}
        </main>
    );
};

export default MainContainer;
