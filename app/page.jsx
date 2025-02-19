import ProductList from "@/components/ProductList";
import { CardsSkeleton } from "@/components/Skeleton";
import { Suspense } from "react";
export const dynamic = "force-dynamic";

export default function Home({ searchParams }) {
  const sortOption = searchParams.sort || "default";

  return (
    <Suspense fallback={<CardsSkeleton />}>
      <ProductList sortOption={sortOption} />
    </Suspense>
  );
}
