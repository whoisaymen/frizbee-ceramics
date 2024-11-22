import ProductCard from "./ProductCard";
import { getProductsInCollection } from "@/lib/shopify";

const ProductList = async ({ sortOption }) => {
  const products = await getProductsInCollection();
  const sortedProducts = sortProducts(products, sortOption);

  return (
    <div
      className="mb-[24px] md:mb-[29px] md:mx-0 -mt-[2px] min-h-screen"
      style={{ backgroundImage: "url(/images/bgHomeGradient.svg)" }}
    >
      <div className="mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 -mt-3">
          {sortedProducts.map((product, index) => (
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

function sortProducts(products, option) {
  if (!option || !products) return products;

  // old default sort option
  // if (option === "default") {
  //   return [...products].sort((a, b) => {
  //     const isProjectA = a.node.tags.includes("project:a-box-is-a-box");
  //     const isProjectB = b.node.tags.includes("project:a-box-is-a-box");

  //     if (isProjectA && !isProjectB) return -1;
  //     if (!isProjectA && isProjectB) return 1;

  //     return 0;
  //   });
  // }

  // new default and shop option [with new products at the top]
  if (option === "default" || option === "shop") {
    //remove flawed products and rest will be manually sorted from backend
    const filteredProducts = products.filter(
      (product) =>
        !product.node.tags.includes("flawfab")
    );

    return filteredProducts;

    //only new products
    // const newProducts = products.filter((product) =>
    //   product.node.tags.includes("new")
    // );

    // //other products except new and flawed
    // const otherProducts = products.filter(
    //   (product) =>
    //     !product.node.tags.includes("new") &&
    //     !product.node.tags.includes("flawfab")
    // );

    //sort other products by latest updated
    // otherProducts.sort((a, b) => {
    //   const updatedAtA = new Date(a.node.updatedAt);
    //   const updatedAtB = new Date(b.node.updatedAt);
    //   return updatedAtB - updatedAtA;
    // });

    //sort both new and other products
    // newProducts.sort((a, b) => {
    //   const updatedAtA = new Date(a.node.updatedAt);
    //   const updatedAtB = new Date(b.node.updatedAt);
    //   return updatedAtB - updatedAtA;
    // });

    // return [...newProducts, ...otherProducts];
  }
  if (option === "flawfab") {
    return products.filter((product) => product.node.tags.includes("flawfab"));
  }

  if (option === "color") {
    return [...products].sort((a, b) => {
      const colorA =
        a.node.tags.find((tag) => tag.startsWith("color:"))?.split(":")[1] ||
        "";
      const colorB =
        b.node.tags.find((tag) => tag.startsWith("color:"))?.split(":")[1] ||
        "";

      const isSetA = a.node.tags.includes("set");
      const isSetB = b.node.tags.includes("set");

      if (isSetA && !isSetB) return 1;
      if (!isSetA && isSetB) return -1;

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
      const isSetA = a.node.tags.includes("set");
      const isSetB = b.node.tags.includes("set");

      if (isSetA && !isSetB) return 1;
      if (!isSetA && isSetB) return -1;

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
      const isSetA = a.node.tags.includes("set");
      const isSetB = b.node.tags.includes("set");

      if (isSetA && !isSetB) return 1;
      if (!isSetA && isSetB) return -1;

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

  // Show sale products at the top
  // if (option === "sale") {
  //   return [...products].sort((a, b) => {
  //     const isOnSaleA =
  //       a.node.compareAtPriceRange?.minVariantPrice.amount >
  //       a.node.priceRange.minVariantPrice.amount;
  //     const isOnSaleB =
  //       b.node.compareAtPriceRange?.minVariantPrice.amount >
  //       b.node.priceRange.minVariantPrice.amount;

  //     if (isOnSaleA && !isOnSaleB) return -1;
  //     if (!isOnSaleA && isOnSaleB) return 1;

  //     return 0;
  //   });
  // }

  // Only show sale products
  if (option === "sale") {
    const saleProducts = products.filter((product) => {
      const isOnSale =
        parseFloat(product.node.compareAtPriceRange?.minVariantPrice.amount) >
        parseFloat(product.node.priceRange.minVariantPrice.amount);
      return isOnSale;
    });
    return saleProducts;
  }

  return products;
}

export default ProductList;
