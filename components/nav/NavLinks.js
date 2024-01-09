"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import clsx from "clsx";
import { MENU_ITEMS } from "@/lib/constants";
import { useState } from "react";

function NavLink({ item }) {
  const pathname = usePathname();
  const active = pathname === `/${item.slug}`;

  const href = `/${item.slug}`;

  const [isAboutHovered, setIsAboutHovered] = useState(false);
  const handleMouseEnter = () =>
    item.slug === "about" && setIsAboutHovered(true);
  const handleMouseLeave = () =>
    item.slug === "about" && setIsAboutHovered(false);

  return (
    <>
      <li
        className={`tracking-[-1.2px] ${
          item.slug === "about" ? "mr-12" : "mr-4"
        } custom-cursor text-black dark:text-white border-black border hover:-rotate-3 transition duration-200 ease-out font-light bg-white/90 relative`}
        key={item.slug}
        style={{
          background: active
            ? item.color
            : isAboutHovered
            ? "#AAAAEF"
            : "white",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Link href={href} className={"w-full px-4"}>
          {item.title}
        </Link>
        {isAboutHovered && aboutSubmenu}
      </li>
    </>
  );
}

export default function NavLinks() {
  return (
    <div className="hidden lg:flex justify-end items-center w-full md:bg-transparent">
      <ul className="flex">
        {MENU_ITEMS.map((option) => (
          <NavLink key={option.slug} item={option} />
        ))}
      </ul>
    </div>
  );
}

const aboutSubmenu = (
  <div className="about-submenu absolute top-full right-0 z-0 bg-[#AAAAEF] border border-t-0 border-black w-[180px] -mt-0 -mr-[1px]">
    <ul className="list-none p-0 m-0 text-right">
      {MENU_ITEMS[1].subsections.map((subsection) => (
        <li key={subsection.title} className="p-[0.1rem] px-1 py-0">
          <Link href={`/${subsection.slug}`}>
            <span className="block text-black no-underline">
              {subsection.title}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);
