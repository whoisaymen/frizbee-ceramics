import ProductList from "@/components/ProductList";
// import { getProductsInCollection, getAllProducts } from "@/lib/shopify";
// import VideoPlayer from "@/components/VideoPlayer";

// export default async function Home() {
//   const products = await getProductsInCollection();

//   return (
//     <>
//       <VideoPlayer onVideoEnd={() => {}} />

//       <ProductList products={products} />
//     </>
//   );
// }

// app/page.jsx
// import ClientVideoPlayer from "@/components/ClientVideoPlayer";
import { getProductsInCollection } from "@/lib/shopify";

export default async function Home() {
  const products = await getProductsInCollection();

  // return <ClientVideoPlayer products={products} />;
  return <ProductList products={products} />;
}
