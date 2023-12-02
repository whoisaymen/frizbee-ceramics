import ProductList from "@/components/ProductList";
import { getProductsInCollection, getAllProducts } from "@/lib/shopify";

export default async function Home() {
  const products = await getProductsInCollection();

  return (
    <>
      <ProductList products={products} />
    </>
  );
}
