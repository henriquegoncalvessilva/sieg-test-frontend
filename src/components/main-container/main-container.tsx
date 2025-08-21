import { type ReactNode } from "react";

type Props = {
    children: ReactNode;
};

const MainContainer = ({ children }: Props) => {
    return (
        <main className="flex items-center justify-center h-full my-0 mx-auto w-full md:w-full  ">
            {children}
        </main>
    );
};

export default MainContainer;
