"use client";

import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";
import { SORTING_OPTIONS } from "@/lib/constants";
import arrowLeft from "@/public/images/arrow-icon-left.svg";
import Image from "next/image";

function SortFilterItem({ item }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = searchParams.get("sort") === item.slug;

  const href = `${pathname}?sort=${item.slug}`;
  const DynamicTag = active ? "p" : Link;

  return (
    <li
      className="tracking-[-1.2px] ml-4 custom-cursor text-black border-black border lg:hover:-rotate-3 transition duration-200 ease-out bg-white/90 font-light"
      key={item.slug}
    >
      <DynamicTag
        href={href}
        className={clsx("w-full px-3 lg:px-4", {
          "bg-[#e8ecf4]": active,
        })}
      >
        {item.title}
      </DynamicTag>
    </li>
  );
}

export default function SortFilterMenu() {
  const [currentSortIndex, setCurrentSortIndex] = useState(0);

  const pathname = usePathname();
  const router = useRouter();

  const handleSortClick = () => {
    const newSortIndex = (currentSortIndex + 1) % SORTING_OPTIONS.length;
    setCurrentSortIndex(newSortIndex);
    const newSortOption = SORTING_OPTIONS[newSortIndex].slug;
    router.push(`${pathname}?sort=${newSortOption}`);
  };

  if (pathname !== "/products") {
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
              <Link href="/products" className={"w-full px-4"}>
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
          <SortFilterItem item={SORTING_OPTIONS[currentSortIndex]} />
        </ul>
      </div>
      <div className="hidden lg:flex justify-start items-center w-full h-full  md:bg-transparent">
        <ul className="flex">
          {SORTING_OPTIONS.map((option) => (
            <SortFilterItem key={option.slug} item={option} />
          ))}
        </ul>
      </div>
    </>
  );
}
