import ProductList from "@/components/ProductList";
import { getProductsInCollection, getAllProducts } from "@/lib/shopify";
import Image from "next/image";
import { Fragment } from "react";

export default async function Home() {
  const products = await getProductsInCollection();
  // console.log('get products in collection:', products);

  // const [sortOption, setSortOption] = useState(null);
  // const sortedProducts = sortProducts(products, sortOption);

  return (
    <>
      {/* <div className="h-[96vh] w-screen">
        <Image
          src="/images/imgHero3.jpg"
          height={1000}
          width={1000}
          alt="Frizbee Ceramics logo"
          priority
          className="object-cover object-center w-full"
          style={{ height: "100%" }}
        />
      </div> */}
      {/* <div className="mt-14 md:mt-0"> */}
      <ProductList products={products} />
      {/* </div> */}
    </>
  );
}
