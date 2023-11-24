import ProductList from "@/components/ProductList";
import { getProductsInCollection, getAllProducts } from "@/lib/shopify";

export default async function ProductsContainer() {
  const products = await getProductsInCollection();
  // console.log('get products in collection:', products);

  // const [sortOption, setSortOption] = useState(null);pa
  // const sortedProducts = sortProducts(products, sortOption);

  return (
    <div className="mt-8">
      <ProductList products={products} />
    </div>
  );
}
