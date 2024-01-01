// "use client";
import ProductList from "@/components/ProductList";
import { getProductsInCollection } from "@/lib/shopify";
import Image from "next/image";
import { getPlaiceholder } from "plaiceholder";
import { Skeleton } from "@mui/material";

export default async function Home() {
  const products = await getProductsInCollection();

  // Add base64 blur data to each product
  const productsWithBlurData = await Promise.all(
    products.map(async (product) => {
      const primaryImageUrl = product.node.images.edges[0].node.url;
      const blurDataURL = await getBase64Blur(primaryImageUrl);
      return {
        ...product,
        blurDataURL, // Add the blurDataURL to the product object
      };
    })
  );

  return <ProductList products={productsWithBlurData} />;
  // return (
  //   <div className="flex h-screen flex-wrap">
  //     {productsWithBlurData ? (
  //       productsWithBlurData.map((product, i) => (
  //         <div
  //           key={`mobile-slide-${i}`}
  //           className="relative h-[300px] min-w-[230px] w-[33vw]"
  //         >
  //           <Image
  //             src={product.node.images.edges[0].node.url}
  //             alt="Product image"
  //             fill
  //             // Uncomment below if you want to use blur effect
  //             // placeholder="blur"
  //             // blurDataURL={product.blurDataURL}
  //             loading="lazy"
  //             className="w-full h-full object-cover object-center"
  //           />
  //         </div>
  //       ))
  //     ) : (
  //       <SkeltonLoader numOfDisplays={8} />
  //     )}
  //   </div>
  // );
}

const SkeltonLoader = ({ numOfDisplays }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-9 py-9 md:py-14 md:py-12">
    {Array.from(new Array(numOfDisplays)).map((_, idx) => (
      <div className="skelton" key={idx}>
        <div
          className="skelton__image-container h-0 overflow-hidden relative"
          style={{ paddingTop: "100%" }}
        >
          <Skeleton
            variant="rect"
            className="absolute h-full left-0 top-0 w-full"
          />
        </div>
        <Skeleton variant="text" />
        <Skeleton variant="text" />
        <Skeleton variant="text" />
      </div>
    ))}
  </div>
);

// Function to get base64 blur data for an image
const getBase64Blur = async (imageUrl) => {
  const buffer = await fetch(imageUrl).then((res) => res.arrayBuffer());
  const { base64 } = await getPlaiceholder(buffer);
  return base64;
};
