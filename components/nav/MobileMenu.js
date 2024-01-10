"use client";
import { XMarkIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function MobileMenu() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="z-[8]">
      <div className="lg:hidden fixed top-5 right-4 z-10">
        <button
          onClick={toggleMenu}
          className="flex flex-col justify-center items-center w-8 h-8 border border-black bg-[#fff]/90"
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
      <div
        className={`z-[9] fixed bottom-0 left-0 transform transition-transform duration-500 ease-in-out  ${
          menuOpen ? "translate-x-0" : "translate-x-[calc(100%+3px)]"
        }`}
      >
        <div
          className={`flex flex-col justify-center h-full transform transition ease-in-out duration-500 bg-[#e8ecf4] w-[calc(50vw-1px)] translate-x-full z-0 border-gray-800 border-l`}
        >
          <div className="h-screen bg-[#4019A9]/10 blur-xl -mb-20"></div>

          <div className="pb-40 px-4 sm:px-6 h-full overflow-y-scroll">
            <nav className="flex flex-col tracking-tighter font-light uppercase text-sm justify-center space-y-2 mt-[60px]">
              <Link href="/stockists" className="">
                Stockists
              </Link>
              <Link href="/about" className="">
                About
              </Link>
              <Link href="/terms-and-conditions" className="">
                Terms & Conditions
              </Link>
              <Link href="/contact" className="">
                Contact
              </Link>
              {/* Add more links as needed */}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
