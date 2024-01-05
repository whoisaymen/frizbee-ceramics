// components/SortFilterItem.js
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import clsx from "clsx";
import { SORTING_OPTIONS } from "@/lib/constants";

function SortFilterItem({ item }) {
  const pathname = usePathname();
  const [searchParams] = useSearchParams();
  const active = searchParams[1] === item.slug;

  const href = `${pathname}?sort=${item.slug}`;
  const DynamicTag = active ? "p" : Link;

  return (
    <li
      className="mt-2 tracking-[-1.2px] ml-4 custom-cursor text-black dark:text-white border-black border hover:-rotate-3 transition duration-200 ease-out bg-white/90"
      key={item.slug}
    >
      <DynamicTag
        href={href}
        className={clsx("w-full px-4", {
          "bg-red-200": active,
        })}
      >
        {item.title}
      </DynamicTag>
    </li>
  );
}

export default function SortFilterMenu() {
  return (
    <ul className="flex">
      {SORTING_OPTIONS.map((option) => (
        <SortFilterItem key={option.slug} item={option} />
      ))}
    </ul>
  );
}
