// "use client";
import ProductList from "@/components/ProductList";
import { CardsSkeleton } from "@/components/skeletons";
import { getProductsInCollection } from "@/lib/shopify";
import Image from "next/image";
import { getPlaiceholder } from "plaiceholder";
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
