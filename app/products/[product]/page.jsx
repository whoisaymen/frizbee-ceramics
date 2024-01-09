import ProductPageContent from "@/components/ProductPageContent";
import { notFound } from "next/navigation";

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
  console.log(product);
  if (!product) return notFound();

  const src = product.images.edges[0].node.url;

  const buffer = await fetch(src).then(async (res) => {
    return Buffer.from(await res.arrayBuffer());
  });

  const { base64 } = await getPlaiceholder(buffer);

  return (
    <>
      {/* <Suspense fallback={<ProductCardSkeleton />}> */}
      <ProductPageContent product={product} blurDataURL={base64} />
      {/* </Suspense> */}
    </>
  );
}
