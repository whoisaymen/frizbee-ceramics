import ProductList from "@/components/ProductList";
import { CardsSkeleton } from "@/components/Skeleton";
import { Suspense } from "react";

export default async function Products({ searchParams }) {
  const sortOption = searchParams.sort || "default";

  return (
    <Suspense fallback={<CardsSkeleton />}>
      <ProductList sortOption={sortOption} />
    </Suspense>
  );
}
