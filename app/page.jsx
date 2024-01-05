import ProductList from "@/components/ProductList";

export default async function Home({ searchParams }) {
  const sortOption = searchParams.sort || null;

  return <ProductList sortOption={sortOption} />;
}
