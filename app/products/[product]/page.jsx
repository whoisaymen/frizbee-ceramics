import ProductPageContent from "@/components/ProductPageContent";
import { getProduct } from "@/lib/shopify";
import { getPlaiceholder } from "plaiceholder";

export async function generateMetadata({ params, searchParams }, parent) {
  const product = await getProduct(params.product);
  console.log(product.description);

  return {
    title: "Frizbee Ceramics | " + product.title,
    description: product.description,
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
      <ProductPageContent product={product} blurDataURL={base64} />
    </>
  );
}
