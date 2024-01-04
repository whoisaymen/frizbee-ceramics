import ProductCard from "./ProductCard";
import { getProductsInCollection, getTotalProducts } from "../lib/shopify";
import { getPlaiceholder } from "plaiceholder";
import { Suspense } from "react";

const ProductList = async () => {
  const products = await getProductsInCollection();

  return (
    <div
      className="mb-[24px] md:mb-[29px] md:mx-0 -mt-[2px]"
      style={{ backgroundImage: "url(/images/bgHomeGradient.svg)" }}
    >
      <div className="mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 -mt-3">
          {products.map((product, index) => (
            <ProductCard
              key={product.node.id}
              product={product}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
