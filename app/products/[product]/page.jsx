import ProductPageContent from "@/components/ProductPageContent";
import { getProduct } from "@/lib/shopify";

export async function generateMetadata({ params, searchParams }, parent) {
  const product = await getProduct(params.product);

  return {
    title: "Frizbee Ceramics | " + product.title,
    description: product.description,
  };
}

export default async function ProductPage({ params }) {
  const product = await getProduct(params.product);

  return (
    <>
      <ProductPageContent product={product} />
    </>
  );
}
