import ProductList from "@/components/ProductList";
import { CardsSkeleton } from "@/components/Skeleton";
import { Suspense } from "react";

export default async function Home({ searchParams }) {
  const sortOption = searchParams.sort || null;

  return (
    <Suspense fallback={<CardsSkeleton />}>
      <ProductList sortOption={sortOption} />
    </Suspense>
  );
}
