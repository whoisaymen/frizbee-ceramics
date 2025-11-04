import ProductCard from "./ProductCard";
import { getProductsInCollection } from "@/lib/shopify";

async function checkImageExists(url) {
  try {
    const response = await fetch(url, { 
      method: 'HEAD',
      cache: 'no-store' // or 'force-cache' depending on your needs
    })
    return response.ok
  } catch (error) {
    return false
  }
}

const ProductList = async ({ sortOption }) => {
  const products = await getProductsInCollection();
  const sortedProducts = sortProducts(products, sortOption);

  //need 3 separate arrays for shop/default products, capsules products and sunset products
  const sunsetProducts = sortedProducts.filter(
    (product) => product.node.tags.includes("sunset")
  );
  
  // Clarks
  const clarksProducts = sortedProducts.filter(
    (product) => product.node.tags.includes("clarks")
  );
  
  // Everlasting
  const shopProducts = sortedProducts.filter(
    (product) => !product.node.tags.includes("capsule") && !product.node.tags.includes("sunset") && !product.node.tags.includes("clarks")
  );
  const capsuleProducts = sortedProducts.filter((product) =>
    product.node.tags.includes("capsule")
  );

  //check if clarks cover image exists
  const clarkImgUrl = 'https://cdn.shopify.com/s/files/1/0806/4381/7793/files/clark_cover_image.jpg';
  const sunsetImgUrl = 'https://cdn.shopify.com/s/files/1/0806/4381/7793/files/sunset-collection-banner.gif';
  const isClarkImgExists = await checkImageExists(clarkImgUrl);
  const isSunsetImgExists = await checkImageExists(sunsetImgUrl);

  return (
    <div
      className="mb-[24px] md:mb-[29px] md:mx-0 -mt-[2px] min-h-screen"
      style={{ backgroundImage: "url(/images/bgHomeGradient.svg)" }}
    >
      <div className="mx-auto" >
        
        {/* clarks Products products section */}
        {/* requirement : if there are 2 clarks products, make the grid of 2 and else usual grid */}
        {clarksProducts.length > 0 && (
          <>
            {isClarkImgExists && <div
              className="w-full bg-center border-y border-black uppercase h-[100vh] flex items-center justify-center text-2xl md:text-3xl bg-cover bg-[url('https://cdn.shopify.com/s/files/1/0806/4381/7793/files/clark_cover_image.jpg?v=1758097124')]"
            ></div>}
            <div className={`grid  ` + (clarksProducts.length === 2 ? 'grid-cols-2 md:h-[60vh] lg:h-[80vh] xl:h-[90vh]' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5')}>
              {clarksProducts.map((product, index) => (
                <ProductCard
                  key={product.node.id}
                  product={product}
                  index={index}
                  totalProducts={clarksProducts.length}
                  isCapsule={false}
                  isClarks={clarksProducts.length === 2 ? true : false}
                />
              ))}
            </div>
          </>
        )}

        {/* sunsetProducts products section */}
        {sunsetProducts.length > 0 && (
          <>
            {isSunsetImgExists && <div
              className="w-full bg-center border-y border-black uppercase h-[100vh] flex items-center justify-center text-2xl md:text-3xl bg-cover bg-[url('https://cdn.shopify.com/s/files/1/0806/4381/7793/files/sunset-collection-banner.gif?v=1749632587')]"
            ></div>}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5">
              {sunsetProducts.map((product, index) => (
                <ProductCard
                  key={product.node.id}
                  product={product}
                  index={index}
                  totalProducts={sunsetProducts.length}
                  isCapsule={false} //it is capsule but temporarily set to false for styling
                />
              ))}
            </div>
          </>
        )}
        
        {/* shop or default products section */}
        {shopProducts.length > 0 && (
          <>
            {/* <div className="w-full border-y border-black uppercase h-[100vh] flex items-center justify-center text-2xl md:text-3xl bg-cover" style={{backgroundImage: "url(https://cdn.shopify.com/s/files/1/0806/4381/7793/files/shop-collection.jpg?v=1742990302)"}}>
            </div> */}
            {/* diff img for mobile */}
            <div
              className="w-full bg-center border-y border-black uppercase h-[100vh] flex items-center justify-center text-2xl md:text-3xl bg-cover md:bg-[url('https://cdn.shopify.com/s/files/1/0806/4381/7793/files/everlasting-collection-web.jpg?v=1743588736')] bg-[url('https://cdn.shopify.com/s/files/1/0806/4381/7793/files/everlasting-collection-mobile.png?v=1743588826')]"
            ></div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5">
              {shopProducts.map((product, index) => (
                <ProductCard
                  key={product.node.id}
                  product={product}
                  index={index}
                  totalProducts={shopProducts.length}
                  isCapsule={false}
                />
              ))}
            </div>
          </>
        )}

        {/* capsules products section */}
        {capsuleProducts.length > 0 && (
          <>
            {/* <div className="w-full border-y border-black uppercase h-[100vh] flex items-center justify-center text-2xl md:text-3xl bg-cover" style={{backgroundImage: "url(https://cdn.shopify.com/s/files/1/0806/4381/7793/files/capsule-collection.jpg?v=1742990303)"}}>
            </div> */}
            {/* diff img for mobile */}
            <div
              className="w-full bg-center border-y border-black uppercase h-[100vh] flex items-center justify-center text-2xl md:text-3xl bg-cover bg-[url('https://cdn.shopify.com/s/files/1/0806/4381/7793/files/kota-collection-mobile.jpg?v=1743588887')] md:bg-[url('https://cdn.shopify.com/s/files/1/0806/4381/7793/files/kota-collection-web.jpg?v=1743588685')]"
            ></div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5">
              {capsuleProducts.map((product, index) => (
                <ProductCard
                  key={product.node.id}
                  product={product}
                  index={index}
                  totalProducts={capsuleProducts.length}
                  isCapsule={false} //it is capsule but temporarily set to false for styling
                />
              ))}
            </div>
          </>
        )}
        
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
    //remove flawed and on-sale products and rest will be manually sorted from backend
    const filteredProducts = products.filter((product) => {
      //filter out on-sale products and flawed products
      // const isOnSale =
      //   parseFloat(product.node.compareAtPriceRange?.minVariantPrice.amount) >
      //   parseFloat(product.node.priceRange.minVariantPrice.amount);
      // return !isOnSale && !product.node.tags.includes("flawfab");
      return !product.node.tags.includes("flawfab");
    });

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
