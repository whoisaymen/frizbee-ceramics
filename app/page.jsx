// import ProductList from "@/components/ProductList";
import dynamic from "next/dynamic";
import { CardsSkeleton } from "@/components/Skeleton";
import { Suspense } from "react";

const ProductList = dynamic(() => import("@/components/ProductList"), {
  loading: () => <CardsSkeleton />,
  ssr: false,
});

export default async function Products({ searchParams }) {
  const sortOption = searchParams.sort || "default";

  return <ProductList sortOption={sortOption} />;
}
