import ProductList from "@/components/ProductList";
import { getProductsInCollection, getAllProducts } from "@/lib/shopify";

export default async function ProductsContainer() {
  const products = await getProductsInCollection();

  return (
    <div className="mt-8">
      <ProductList products={products} />
    </div>
  );
}
