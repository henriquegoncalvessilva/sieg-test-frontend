import useProducts from "../../hooks/useProducts";
import { useResponsive } from "../../hooks/useResponsive";
import type { Produto } from "../../interfaces/card-item.interface";
import { useProductStore } from "../../store/useProductStore";
import CardItem from "../card-Item/card-item";
import CardItemSkeleton from "../card-Item/card-item-skeleton";
import Filters from "../filters/filters";

type ProductGridProps = {
    produtos: Produto[];
};

const ProductGrid = ({ produtos }: ProductGridProps) => {
    const loading = useProductStore((state) => state.loading);
    const isDesktop = useResponsive(1280);

    useProducts({ search: "" });

    return (
        <>
            <section className="flex w-full justify-center gap-4 md:justify-start xl:justify-between xl:items-start relative">
                <Filters
                    className={`${
                        isDesktop ? "block w-fit" : "hidden"
                    } w-3xs items-start justify-start sticky top-6`}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-fit m-auto">
                    {loading
                        ? Array.from({ length: 10 }).map((_, i) => (
                              <CardItemSkeleton key={i + 1} />
                          ))
                        : produtos.map((p) => (
                              <CardItem
                                  className="cursor-pointer"
                                  id={p.id}
                                  key={p.id}
                                  nome={p.title}
                                  image={p.thumbnail}
                                  avaliacoes={p.rating}
                                  preco={p.price}
                              />
                          ))}
                    {produtos.length === 0 && !loading && (
                        <p className="col-span-full text-center text-gray-500">
                            Nenhum produto encontrado.
                        </p>
                    )}
                </div>
            </section>
        </>
    );
};

export default ProductGrid;
