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
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <>
      <div className="hidden lg:flex justify-end items-center w-full h-full md:bg-transparent">
        <ul className="flex">
          {MENU_ITEMS.map((option) => (
            <NavLink key={option.slug} item={option} />
          ))}
        </ul>
      </div>
      <div className="lg:hidden flex justify-end items-center w-full h-full mr-4">
        <div>
          <button
            onClick={toggleMenu}
            className="flex flex-col justify-center items-center w-8 h-8 border border-black bg-[#fff]/90 z-[9] relative"
            aria-label="Open menu"
          >
            <span
              className={`transition-all duration-300 ease-out w-6 h-[1px] bg-black mb-1 ${
                menuOpen ? "rotate-45 translate-y-[4.5px]" : "-translate-y-0.5"
              }`}
            ></span>
            <span
              className={`transition-all duration-300 ease-out w-6 h-[1px] bg-black mb-1 ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`transition-all duration-300 ease-out w-6 h-[1px] bg-black ${
                menuOpen ? "-rotate-45 -translate-y-[4.5px]" : "translate-y-0.5"
              }`}
            ></span>
          </button>
        </div>
      </div>
      <div
        className={`lg:hidden fixed top-0 bottom-0 right-0 flex flex-col justify-center h-full transform transition ease-in-out duration-500 bg-[#e8ecf4] border-gray-800 border-l ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } `}
      >
        <div className="h-screen bg-[#4019A9]/10 blur-xl -mb-20 z-0 relative"></div>

        <div className="pb-40 px-4 sm:px-6 h-full overflow-y-scroll w-[50vw] z-1 relative">
          <nav className="flex flex-col tracking-tighter font-light uppercase text-sm justify-center space-y-2 mt-[60px]">
            <Link
              href="/stockists"
              className=""
              onClick={() => setMenuOpen(false)}
            >
              Stockists
            </Link>
            <Link href="/about" className="" onClick={() => setMenuOpen(false)}>
              About
            </Link>
            <Link
              href="/terms-and-conditions"
              className=""
              onClick={() => setMenuOpen(false)}
            >
              Terms & Conditions
            </Link>
            <Link
              href="/contact"
              className=""
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </>
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
