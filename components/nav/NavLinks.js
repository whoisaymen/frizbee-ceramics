"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import clsx from "clsx";
import { MENU_ITEMS } from "@/lib/constants";

function NavLink({ item }) {
  const pathname = usePathname();
  const active = pathname === `/${item.slug}`;

  const href = `/${item.slug}`;
  console.log(href);

  return (
    <li
      className="tracking-[-1.2px] mr-4 custom-cursor text-black dark:text-white border-black border hover:-rotate-3 transition duration-200 ease-out font-light bg-white/90"
      key={item.slug}
      style={{ background: active ? item.color : "bg-white/90" }}
    >
      <Link
        href={href}
        className={clsx("w-full px-4", {
          // "bg-[#b6ffb9] italic": active,
        })}
      >
        {item.title}
      </Link>
    </li>
  );
}

export default function NavLinks() {
  return (
    <div className="flex justify-end items-center w-full md:bg-transparent">
      <ul className="flex">
        {MENU_ITEMS.map((option) => (
          <NavLink key={option.slug} item={option} />
        ))}
      </ul>
    </div>
  );
}
