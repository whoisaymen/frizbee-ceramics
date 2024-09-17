"use client";

import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import clsx from "clsx";
import { SORTING_OPTIONS } from "@/lib/constants";
import arrowLeft from "@/public/images/arrow-icon-left.svg";
import Image from "next/image";
import { getProductsInCollection } from "@/lib/shopify";

function SortFilterItem({ item }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = searchParams.get("sort") === item?.slug;

  const href = `${pathname}?sort=${item?.slug}`;
  const DynamicTag = active ? "p" : Link;


  return (
    <li
      className="tracking-[-1.2px] ml-4 custom-cursor text-black border-black border lg:hover:-rotate-3 transition duration-200 ease-out bg-white/90 font-light"
      key={item?.slug}
    >
      <Suspense>
        <DynamicTag
          href={href}
          className={clsx("w-full px-3 lg:px-4", {
            "bg-[#e8ecf4]": active,
          })}
        >
          {item?.title}
        </DynamicTag>
      </Suspense>
    </li>
  );
}

export default function SortFilterMenu() {
  const [currentSortIndex, setCurrentSortIndex] = useState(0);
  const [availableSortingOptions, setAvailableSortingOptions] = useState([]);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    async function fetchSaleProducts() {
      // Replace this with your actual Shopify API call to check for sale products
      const hasSaleProducts = await checkForSaleProducts();
      if (hasSaleProducts) {  
        setAvailableSortingOptions(SORTING_OPTIONS);
      } else {
        setAvailableSortingOptions(SORTING_OPTIONS.filter(option => option.slug !== 'sale'));
      }
    }
    fetchSaleProducts();
  }, []);

  const handleSortClick = () => {
    const newSortIndex = (currentSortIndex + 1) % availableSortingOptions.length;
    setCurrentSortIndex(newSortIndex);
    const newSortOption = availableSortingOptions[newSortIndex].slug;
    router.push(`${pathname}?sort=${newSortOption}`);
  };

  if (pathname !== "/") {
    return (
      <div className="flex justify-start items-center h-full  w-full md:bg-transparent">
        <ul className="flex">
          <li className="tracking-[-1.2px] ml-4 custom-cursor text-black border-black border lg:hover:-rotate-3 transition duration-200 ease-out font-light bg-white/90">
            {pathname.includes("products") ? (
              <button
                type="button"
                onClick={() => router.back()}
                className={
                  "px-1 py-1 flex items-center justify-center hover:bg-red-300"
                }
              >
                <div className="relative h-5 w-5">
                  <Image
                    src={arrowLeft}
                    priority
                    alt="Back"
                    fill
                    className="p-[0.5px]"
                  />
                </div>
              </button>
            ) : (
              <Link href="/?sort=shop" className={"w-full px-4"}>
                Shop
              </Link>
            )}
          </li>
        </ul>
      </div>
    );
  }

  return (
    <>
      <div className="lg:hidden">
        <ul onClick={handleSortClick}>
          <SortFilterItem item={availableSortingOptions[currentSortIndex]} />
        </ul>
      </div>
      <div className="hidden lg:flex justify-start items-center w-full h-full md:bg-transparent">
        <ul className="flex">
          {availableSortingOptions.map((option) => (
            <SortFilterItem key={option.slug} item={option} />
          ))}
        </ul>
      </div>
    </>
  );
}

export async function checkForSaleProducts() {
  try {
    const products = await getProductsInCollection();

    const saleProducts = products.filter((product) => {
      const isOnSale =
        product.node.compareAtPriceRange?.minVariantPrice.amount >
        product.node.priceRange?.minVariantPrice.amount;
      return isOnSale;
    });
    return saleProducts.length > 0;
  } catch (error) {
    console.error('Error checking for sale products:', error);
    return false;
  }
}
