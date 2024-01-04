import ProductList from "@/components/ProductList";
import { CardsSkeleton } from "@/components/skeletons";
import { Suspense } from "react";

export default async function Home() {
  return (
    <>
      <Suspense fallback={<CardsSkeleton />}>
        <ProductList />
      </Suspense>
    </>
  );
}
