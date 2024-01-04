import ProductList from "@/components/ProductList";
import { CardsSkeleton } from "@/components/skeletons";
import { Suspense } from "react";

export default async function Home({ params }) {
  console.log(params);
  return (
    <>
      <Suspense fallback={<CardsSkeleton />}>
        <ProductList />
      </Suspense>
    </>
  );
}
