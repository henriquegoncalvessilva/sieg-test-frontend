import "./App.css";
import Header from "./components/header/header";
import MainContainer from "./components/main-container/main-container";
import Filters from "./components/filters/filters";
import { useResponsive } from "./hooks/useResponsive";
import { useProductStore } from "./store/useProductStore";
import Modal from "./components/modal/modal";
import ScrollToTopButton from "./components/button-scroll-to-top/ScrollToTopButton";
import ProductGrid from "./components/product-grid/product-grid";

function App() {
    const isDesktop = useResponsive(1280);
    const { produtos } = useProductStore();

    return (
        <>
            <MainContainer>
                <section className="w-full">
                    <Header />
                    <Filters
                        className={`${isDesktop ? "hidden" : "block w-full"}`}
                    />
                </section>

                <ProductGrid produtos={produtos} />

                <Modal />
                <ScrollToTopButton />
            </MainContainer>
        </>
    );
}

export default App;
