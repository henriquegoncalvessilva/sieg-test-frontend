import { type ReactNode } from "react";

type Props = {
    children: ReactNode;
};

const MainContainer = ({ children }: Props) => {
    return (
        <main
            className="flex 
               flex-col
             items-center justify-center my-0 mx-auto w-fit h-full md:w-3xl xl:max-w-5xl xl:w-full lg:max-w-4xl text-black"
        >
            {children}
        </main>
    );
};

export default MainContainer;
