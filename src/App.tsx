import "./App.css";
import Header from "./components/header/header";
import MainContainer from "./components/main-container/main-container";

import { useProductStore } from "./store/useProductStore";
import Modal from "./components/modal/modal";
import ScrollToTopButton from "./components/button-scroll-to-top/ScrollToTopButton";
import ProductGrid from "./components/product-grid/product-grid";
import FilterSideBar from "./components/filters/filters-sidebar";

function App() {
    const { produtos } = useProductStore();

    return (
        <>
            <MainContainer>
                <section className="w-full">
                    <Header />
                </section>

                <ProductGrid produtos={produtos} />

                <FilterSideBar />
                <Modal />
                <ScrollToTopButton />
            </MainContainer>
        </>
    );
}

export default App;
