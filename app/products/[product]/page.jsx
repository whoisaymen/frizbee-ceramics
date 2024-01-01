import ProductPageContent from "@/components/ProductPageContent";
import ScrollToTop from "@/components/ScrollToTop";

import { getProduct } from "@/lib/shopify";
import Image from "next/image";
import { getPlaiceholder } from "plaiceholder";

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

  return (
    <>
      <ScrollToTop />
      <div className="relative"></div>
      {/* <Image
        src={src}
        fill
        alt="image"
        placeholder="blur"
        blurDataURL={base64}
      /> */}
      <ProductPageContent product={product} blurDataURL={base64} />
    </>
  );
}
