"use client";
import Link from "next/link";
import { Fragment, useContext, useState } from "react";
import Image from "next/image";
import { CartContext } from "../context/shopContext";
import MarketingBanner from "./MarketingBanner";
import MiniCart from "./MiniCart";
import { useRouter, usePathname } from "next/navigation";

import { XMarkIcon } from "@heroicons/react/24/outline";

import { Dialog, Transition } from "@headlessui/react";

export default function Nav() {
  const router = useRouter();

  const { cart, setCartOpen, sortOption, setSortOption } =
    useContext(CartContext);

  const [isProjectsSubmenuOpen, setIsProjectsSubmenuOpen] = useState(false); // New state for mobile projects submenu

  // Toggle Projects Submenu on Mobile
  const toggleProjectsSubmenuMobile = () => {
    setIsProjectsSubmenuOpen(!isProjectsSubmenuOpen);
  };

  // const router = useRouter();
  const pathname = usePathname();
  const isSpecialPage =
    pathname === "/about" ||
    pathname === "/projects" ||
    pathname.includes("/products"); // Combine the checks for About and Projects pages

  const isAboutPage = pathname === "/about"; // Check if current page is About page
  const isProjectsPage = pathname === "/projects"; // Check if current page is Projects page

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProjectsVisible, setIsProjectsVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const cartQuantity = cart.reduce(
    (acc, item) => acc + item?.variantQuantity,
    0
  );

  const categories = [
    {
      name: "color",
      hoverColor: "bg-[#4169CC]",
      activeColor: "bg-[#4169CC]",
    },
    {
      name: "shape",
      hoverColor: "bg-[#67AB82]",
      activeColor: "bg-[#67AB82]",
    },
    {
      name: "pattern",
      hoverColor: "bg-[#EADF50]",
      activeColor: "bg-[#EADF50]",
    },
    {
      name: "set",
      hoverColor: "bg-[#AAAAEF]",
      activeColor: "bg-[#AAAAEF]",
    },
    {
      name: "new",
      hoverColor: "bg-[#EB792F]",
      activeColor: "bg-[#EB792F]",
    },
  ];

  const projects = [
    "A Box Is A Box",
    "Carne",
    "Chez Manger",
    "Lina Lapelyte",
    "MAD",
    "Now Belgium Now",
    "Phyps",
    "Pon Ding",
  ];

  const handleCategoryClick = (category) => {
    router.push({
      pathname: "/", // Path to the main page
      query: { sort: category },
    });
    setSortOption(category);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-10 font-light tracking-tight uppercase mx-auto lg:mt-4">
        <header className="relative mb-4">
          {/* Hamburger Icon for Mobile */}
          <div className="lg:hidden absolute top-2 right-4 z-10">
            <button
              onClick={toggleMenu}
              className="flex flex-col justify-center items-center w-8 h-8 border border-black bg-[#fff]"
              aria-label="Open menu"
            >
              <span className="block w-6 h-[1px] bg-black mb-1"></span>
              <span className="block w-6 h-[1px] bg-black mb-1"></span>
              <span className="block w-6 h-[1px] bg-black"></span>
            </button>
          </div>

          {/* Filter Icon as a Button */}
          <div className="lg:hidden absolute top-2 left-4 z-10">
            <button
              onClick={toggleDropdown}
              className="flex flex-col justify-center items-center w-8 h-8 border border-blac bg-white border-black"
              aria-label="Open filter menu"
            >
              {/* <Image
                src="/images/iconFilter.svg"
                alt="Filter"
                width={24}
                height={24}
              /> */}

              <span className="block w-6 h-[1px] bg-black mb-1"></span>
              <span className="block w-4 h-[1px] bg-black mb-1"></span>
              <span className="block w-2 h-[1px] bg-black"></span>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-full mt-2 left-0 z-10 bg-white border border-black">
                <select
                  id="sortby"
                  className="block w-full text-xs p-1"
                  onChange={(e) => handleCategoryClick(e.target.value)}
                >
                  <option value="">Select</option>
                  {/* ... options ... */}
                </select>
              </div>
            )}
          </div>
          <div className="bg-transparent w-full h-[10vh] md:h-0 -mb-[9.5vh] md:-mb-0"></div>

          <nav aria-label="Top" className="mx-auto">
            <div className="flex justify-center md:justify-between items-center w-full md:bg-transparent">
              {/* Logo */}
              <Link
                href="/"
                onClick={() => setSortOption("")}
                className="absolute top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-6 custom-cursor mt-2"
              >
                <span className="sr-only">Frizbee Ceramics</span>
                <div className="h-16 lg:h-[5.4rem] w-auto">
                  <Image
                    src="/images/logo.png"
                    height={1000}
                    width={1000}
                    alt="Frizbee Ceramics logo"
                    priority
                    className="object-contain relative z-[2000]"
                    style={{ width: "100%", height: "100%" }}
                  />
                  <div className="absolute top-0 left-1/4 h-16 w-1/2 blur-lg">
                    test
                  </div>
                </div>
              </Link>
              {/* <Link
                href="/"
                onClick={() => setSortOption("")}
                className="custom-cursor"
              >
                <span className="sr-only">Frizbee Ceramics</span>
                <div className="inline-block lg:absolute lg:top-6 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 -rotate-6 custom-cursor bg-red-500 mx-auto ">
                  <Image
                    src="/images/logo.png"
                    height={1000}
                    width={1000}
                    alt="Frizbee Ceramics logo"
                    priority
                    className="object-contain"
                    style={{ width: "auto", height: "4rem" }}
                  />
                </div>
              </Link> */}

              {/* Categories */}
              {!isSpecialPage && (
                <div className="hidden lg:flex py-[2px] relative">
                  {categories.map(({ name, hoverColor, activeColor }) => (
                    <button
                      key={name}
                      className={`cursor-pointer uppercase px-4 tracking-[-1.2px] ml-4 custom-cursor border-black border-[1px] hover:-rotate-3 ${
                        sortOption === name ? "bg-[#AAAAEF]" : "bg-white/90"
                      } ${
                        hoverColor !== activeColor ? `hover:${hoverColor}` : ""
                      } transition duration-200 ease-out`}
                      onClick={() => handleCategoryClick(name)}
                    >
                      {name.charAt(0).toUpperCase() + name.slice(1)}
                    </button>
                  ))}
                </div>
              )}

              {/* Desktop Menu Items */}
              <div className="hidden lg:flex py-[2px] relative mr-14">
                {isSpecialPage && (
                  <Link
                    href="/"
                    className="cursor-pointer uppercase px-4 tracking-[-1.2px] ml-4 custom-cursor border-black border-[1px] hover:-rotate-3 bg-white/90"
                  >
                    Shop
                  </Link>
                )}

                {/* Additional menu items */}
                <Link
                  href="/projects"
                  // onClick={() => setIsProjectsVisible(!isProjectsVisible)}
                  className={`cursor-pointer uppercase px-4 tracking-[-1.2px] ml-4 custom-cursor border-black border-[1px] hover:-rotate-3 ${
                    isProjectsPage ? "bg-[#DEF6E0]" : "bg-white/90" // Different background color if on Projects page
                  }`}
                >
                  Projects
                </Link>
                <Link
                  href="/about"
                  className={`cursor-pointer uppercase px-4 tracking-[-1.2px] ml-4 custom-cursor border-black border-[1px] hover:-rotate-3 ${
                    isAboutPage ? "bg-[#AAAAEF]" : "bg-white/90" // Different background color if on About page
                  }`}
                >
                  About
                </Link>
              </div>
            </div>
          </nav>
        </header>
      </div>

      {/* <CartIcon cartQuantity={cartQuantity} setCartOpen={setCartOpen} /> */}
      <div className="fixed bottom-0 left-0 right-0 z-[20000]">
        <MarketingBanner />
      </div>

      <NewsletterIcon setCartOpen={setCartOpen} />

      {/* MiniCart */}
      <MiniCart cart={cart} />

      {/* Projects submenu */}
      {isProjectsVisible && (
        <div className="w-full bg-white z-20">
          <div className="absolute top-10 right-11 ml-4 flex flex-col w-[228px] border border-black">
            <ul className="list-none p-0 m-0">
              {projects.map((project, index) => (
                <li
                  key={project}
                  className={`${
                    index % 2 === 0 ? "bg-[#fff]" : "bg-gray-100"
                  } p-[0.1rem] px-1 py-1 blur-none`}
                >
                  {project}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Mobile Menu Modal */}
      <Transition.Root show={isMenuOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[8]" onClose={toggleMenu}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-y-0 right-0 w-[calc(50%+2px)] flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-300"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-300"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="relative w-screen max-w-md">
                <div className="flex h-full flex-col overflow-y-scroll border-b border-black bg-[#e8ecf4] shadow-xl border-l-[1px] text-xs font-light">
                  <div className="h-screen bg-[#4019A9]/10 blur-xl mt-32 -mb-10"></div>

                  <div className="flex pb-40 px-4 sm:px-6 h-full">
                    <nav className="flex flex-col tracking-tighter uppercase text-sm justify-center space-y-2 mt-[60px]">
                      <Link href="/about" className="">
                        About
                      </Link>
                      <button
                        onClick={toggleProjectsSubmenuMobile}
                        className="text-left uppercase"
                      >
                        Projects
                      </button>
                      {isProjectsSubmenuOpen && (
                        <ul className="pl-4 list-none text-gray-400 my-0 py-0">
                          {projects.map((project, index) => (
                            <li key={project} className="py-1">
                              {project}
                            </li>
                          ))}
                        </ul>
                      )}
                      <Link href="/newsletter" className="">
                        Newsletter
                      </Link>
                      <Link href="/shipping-returns" className="">
                        Shipping & Returns
                      </Link>
                      <Link href="/about" className="">
                        Contact
                      </Link>
                      {/* Add more links as needed */}
                    </nav>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

function CartIcon({ cartQuantity, setCartOpen }) {
  return (
    <div className="fixed right-0 z-10 mt-4 text-sm font-light lg:text-base">
      <button
        className={`flex flex-col border items-center border-black rounded-l-md ${
          cartQuantity > 0 ? "bg-[#F7D949]" : "bg-white/95"
        } hover:rotate-3 p-0`}
        onClick={() => setCartOpen(true)}
      >
        <span className="px-1 pt-1">C</span>
        <span className="px-1 -mt-[8px]">A</span>
        <span className="px-1 -mt-[8px]">R</span>
        <span className="px-1 -mt-[8px]">T</span>
        <span className="px-1 pb-1">({cartQuantity})</span>
      </button>
    </div>
  );
}

function NewsletterIcon({ setCartOpen }) {
  return (
    <div className="hidden lg:fixed bottom-28 right-0 z-10 lg:bottom-12 text-sm lg:text-base font-light">
      <button
        className={`flex flex-col border items-center border-black bg-white hover:rotate-3 rounded-l-md px-1`}
        onClick={() => setCartOpen(true)}
      >
        <span className="px-1 pt-1">N</span>
        <span className="px-1 -mt-[8px]">E</span>
        <span className="px-1 -mt-[8px]">W</span>
        <span className="px-1 -mt-[8px] pb-1">S</span>
      </button>
    </div>
  );
}

function NewsletterMobile({ setCartOpen }) {
  return (
    <div className="!hidden fixed bottom-28 right-0 z-10 lg:bottom-12 text-sm lg:text-base font-light">
      <button
        className={`flex flex-col border items-center border-black bg-white hover:rotate-3 rounded-l-md px-1`}
        onClick={() => setCartOpen(true)}
      >
        <span className="px-1 pt-1">N</span>
        <span className="px-1 -mt-[8px]">E</span>
        <span className="px-1 -mt-[8px]">W</span>
        <span className="px-1 -mt-[8px] pb-1">S</span>
      </button>
    </div>
  );
}