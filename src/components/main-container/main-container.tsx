import { type ReactNode } from "react";

type Props = {
    children: ReactNode;
};

const MainContainer = ({ children }: Props) => {
    return (
        <main className="flex flex-col items-center justify-center  my-0 mx-auto w-fit he-f md:w-3xl md:max-w-5xl   lg:w-full lg:max-w-4xl">
            {children}
        </main>
    );
};

export default MainContainer;
