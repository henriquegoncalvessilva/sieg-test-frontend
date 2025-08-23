import { useProductStore } from "../../store/useProductStore";

const Modal = () => {
    const openModal = useProductStore((state) => state.isModalOpen);
    const toggleModal = useProductStore((state) => state.toggleModal);
    const produtos = useProductStore((state) => state.produtos);
    const idItem = useProductStore((state) => state.idItem);
    const produtoSelecionado = produtos.find((p) => p.id === idItem);

    return (
        <>
            {openModal && (
                <div
                    className="fixed inset-0 bg-black opacity-20 z-40"
                    onClick={() => toggleModal()}
                ></div>
            )}

            <div
                className={`fixed top-1/2 left-1/2 ${
                    openModal && "w-[320px] h-[620px]"
                } bg-white shadow-lg z-50 rounded-xl p-4 transform transition-all duration-300 text-black ${
                    openModal
                        ? "opacity-100 scale-100 -translate-x-1/2 -translate-y-1/2"
                        : "opacity-0 scale-75 -translate-x-1/2 -translate-y-2"
                }`}
            >
                <div className="flex justify-between items-center p-4 border-b text-black">
                    <h2 className="text-lg font-bold">Seu Carrinho</h2>
                    <button onClick={() => toggleModal()}>✕</button>
                </div>
                {produtoSelecionado ? (
                    <h3 className="text-xl font-semibold">
                        {produtoSelecionado.title}
                    </h3>
                ) : (
                    <p>Carregando...</p>
                )}
                <div className="absolute bottom-0 w-full p-4 border-t">
                    <button className="w-full bg-black text-white py-2 rounded-lg">
                        Finalizar Compra
                    </button>
                </div>
            </div>
        </>
    );
};

export default Modal;
