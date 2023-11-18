import ProductList from "@/components/ProductList";
import { getProductsInCollection, getAllProducts } from "@/lib/shopify";

export default async function Home() {
  const products = await getProductsInCollection();
  // console.log('get products in collection:', products);

  // const [sortOption, setSortOption] = useState(null);
  // const sortedProducts = sortProducts(products, sortOption);

  return (
    <div className="mt-8">
      <ProductList products={products} />
    </div>
  );
}
