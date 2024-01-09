import ProductCard from "./ProductCard";
import { getProductsInCollection } from "@/lib/shopify";
import { CardsSkeleton } from "./Skeleton";
import { Suspense } from "react";

const ProductList = async ({ sortOption }) => {
  const products = await getProductsInCollection();
  const sortedProducts = sortProducts(products, sortOption);

  return (
    <div
      className="mb-[24px] md:mb-[29px] md:mx-0 -mt-[2px]"
      style={{ backgroundImage: "url(/images/bgHomeGradient.svg)" }}
    >
      <div className="mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 -mt-3">
          <Suspense fallback={<CardsSkeleton />}>
            {sortedProducts.map((product, index) => (
              <ProductCard
                key={product.node.id}
                product={product}
                index={index}
              />
            ))}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

function sortProducts(products, option) {
  if (!option || !products || option === "default") return products;

  if (option === "color") {
    return [...products].sort((a, b) => {
      const colorA =
        a.node.tags.find((tag) => tag.startsWith("color:"))?.split(":")[1] ||
        "";
      const colorB =
        b.node.tags.find((tag) => tag.startsWith("color:"))?.split(":")[1] ||
        "";
      return colorA.localeCompare(colorB);
    });
  }
  if (option === "shape") {
    return [...products].sort((a, b) => {
      const shapeA =
        a.node.tags.find((tag) => tag.startsWith("shape:"))?.split(":")[1] ||
        "";
      const shapeB =
        b.node.tags.find((tag) => tag.startsWith("shape:"))?.split(":")[1] ||
        "";
      return shapeA.localeCompare(shapeB);
    });
  }
  if (option === "pattern") {
    return [...products].sort((a, b) => {
      const patternA =
        a.node.tags.find((tag) => tag.startsWith("pattern:"))?.split(":")[1] ||
        "";
      const patternB =
        b.node.tags.find((tag) => tag.startsWith("pattern:"))?.split(":")[1] ||
        "";
      return patternA.localeCompare(patternB);
    });
  }

  if (option === "set") {
    const filteredProducts = [...products].filter((product) => {
      return product.node.tags.includes("set");
    });
    return filteredProducts;
  }
  if (option === "new") {
    return products.filter((product) => product.node.tags.includes("new"));
  }

  if (option === "date") {
    return [...products].sort((a, b) => {
      const dateA = new Date(a.node.createdAt);
      const dateB = new Date(b.node.createdAt);
      return dateB - dateA;
    });
  }

  return products;
}

export default ProductList;
