"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import clsx from "clsx";
import { SORTING_OPTIONS } from "@/lib/constants";

function SortFilterItem({ item }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = searchParams.get("sort") === item.slug;

  const href = `${pathname}?sort=${item.slug}`;
  const DynamicTag = active ? "p" : Link;

  return (
    <li
      className="tracking-[-1.2px] ml-4 custom-cursor text-black dark:text-white border-black border hover:-rotate-3 transition duration-200 ease-out bg-white/90 font-light"
      key={item.slug}
    >
      <DynamicTag
        href={href}
        className={clsx("w-full px-4", {
          "bg-[#b6ffb9] italic": active,
        })}
      >
        {item.title}
      </DynamicTag>
    </li>
  );
}

export default function SortFilterMenu() {
  const pathname = usePathname();

  if (pathname !== "/") {
    return (
      <div className="flex justify-start items-center w-full md:bg-transparent">
        <ul className="flex">
          <li className="tracking-[-1.2px] ml-4 custom-cursor text-black dark:text-white border-black border hover:-rotate-3 transition duration-200 ease-out font-light bg-white/90">
            <Link href="/" className={"w-full px-4"}>
              Shop
            </Link>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div className="justify-start items-center w-full md:bg-transparent hidden lg:flex">
      <ul className="flex">
        {SORTING_OPTIONS.map((option) => (
          <SortFilterItem key={option.slug} item={option} />
        ))}
      </ul>
    </div>
  );
}
