import ProductPageContent from "@/components/ProductPageContent";
import ScrollToTop from "@/components/ScrollToTop";
import { ProductCardSkeleton } from "@/components/skeletons";

import { getProduct } from "@/lib/shopify";
import Image from "next/image";
import { getPlaiceholder } from "plaiceholder";
import { Suspense } from "react";

export async function generateMetadata({ params, searchParams }, parent) {
  // fetch data
  const product = await getProduct(params.product);

  return {
    title: "Frizbee Ceramics | " + product.title,
  };
}

export default async function ProductPage({ params }) {
  const product = await getProduct(params.product);
  const src = product.images.edges[0].node.url;

  const buffer = await fetch(src).then(async (res) => {
    return Buffer.from(await res.arrayBuffer());
  });

  const { base64 } = await getPlaiceholder(buffer);
  const { css } = await getPlaiceholder(buffer);
  const { color } = await getPlaiceholder(buffer);
  console.log(base64, css, color);

  return (
    <>
      {/* <Suspense fallback={<ProductCardSkeleton />}> */}
      <ProductPageContent product={product} blurDataURL={base64} css={css} />
      {/* </Suspense> */}
    </>
  );
}
