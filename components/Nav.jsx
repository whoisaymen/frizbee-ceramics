"use client";
import { Fragment, useContext, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

import { CartContext } from "../context/shopContext";
import { useRouter, usePathname } from "next/navigation";
import { Dialog, Transition } from "@headlessui/react";

import MarketingBanner from "./MarketingBanner";
import MiniCart from "./MiniCart";
import Newsletter from "./Newsletter";
import { useVideo } from "@/context/VideoContext";

export default function Nav() {
  const router = useRouter();

  const { cart, setCartOpen, sortOption, setSortOption } =
    useContext(CartContext);

  const [isProjectsSubmenuOpen, setIsProjectsSubmenuOpen] = useState(false);

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // CSS styles for filter container
  const filterContainerStyle = {
    position: "fixed",
    top: "0.5rem",
    left: isFilterOpen ? "0" : "-100vw",
    width: "8rem",
    // height: "100%",
    transition: "left 0.3s ease",
    backgroundColor: "white",
    zIndex: 20,
    borderBottom: "1px solid black",
    boxSizing: "border-box",
  };

  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);

  // Toggle Projects Submenu on Mobile
  const toggleProjectsSubmenuMobile = () => {
    setIsProjectsSubmenuOpen(!isProjectsSubmenuOpen);
  };

  const handleDropdownChange = (e) => {
    setSortOption(e.target.value);
  };

  const pathname = usePathname();
  const isSpecialPage =
    pathname === "/about" ||
    pathname === "/projects" ||
    pathname === "/stockists" ||
    pathname === "/terms-and-conditions" ||
    pathname === "/contact" ||
    pathname.includes("/products") ||
    pathname.includes("/projects");

  const isAboutPage = pathname === "/about";
  const isContactPage = pathname === "/contact";
  const isProjectsPage = pathname === "/projects";
  const isStockistsPage = pathname === "/stockists";
  const isTermsAndConditionsPage = pathname === "/terms-and-conditions";

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
    // { title: "A Box Is A Box", url: "/projects/a-box-is-a-box" },
    { title: "Carne Bollente", url: "/projects/carne-bollente" },
    // { title: "Chez Manger", url: "/projects/chez-manger" },
    // { title: "Lina Lapelyte", url: "/projects/lina-lapelyte" },
    // { title: "MAD", url: "/projects/mad" },
    // { title: "Now Belgium Now", url: "/projects/now-belgium-now" },
    // { title: "Phyps", url: "/projects/phyps" },
    { title: "Pon Ding", url: "/projects/pon-ding" },
  ];

  const about = [
    { title: "About us", url: "/about" },
    { title: "Contact", url: "/contact" },
    { title: "Terms & Conditions", url: "/terms-and-conditions" },
  ];

  // State for managing hover state of Projects dropdown
  const [isProjectsHovered, setIsProjectsHovered] = useState(false);
  const [isAboutHovered, setIsAboutHovered] = useState(false);

  // Projects submenu content
  const projectsSubmenu = (
    <div className="projects-submenu absolute top-full right-0 z-0 bg-[#D6FD53] border border-t-0 border-black w-[150px] -mt-0 -mr-[1px]">
      <ul className="list-none p-0 m-0 text-right">
        {projects.map((project) => (
          <li key={project.title} className="p-[0.1rem] px-1 py-0">
            <Link href={project.url}>
              <span className="block text-black no-underline">
                {project.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  // About submenu content
  const aboutSubmenu = (
    <div className="about-submenu absolute top-full right-0 z-0 bg-[#AAAAEF] border border-t-0 border-black w-[180px] -mt-0 -mr-[1px]">
      <ul className="list-none p-0 m-0 text-right">
        {about.map((item) => (
          <li key={item.title} className="p-[0.1rem] px-1 py-0">
            <Link href={item.url}>
              <span className="block text-black no-underline">
                {item.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  const handleCategoryClick = (category) => {
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
              className="flex flex-col justify-center items-center w-8 h-8 border border-black bg-[#fff]/90"
              aria-label="Open menu"
            >
              <span className="block w-6 h-[1px] bg-black mb-1"></span>
              <span className="block w-6 h-[1px] bg-black mb-1"></span>
              <span className="block w-6 h-[1px] bg-black"></span>
            </button>
          </div>

          {isSpecialPage ? (
            // Render 'Shop' button for special pages
            <Link
              href="/"
              className="lg:hidden cursor-pointer uppercase px-4 tracking-[-1.2px] ml-4 custom-cursor border-black border-[1px] hover:-rotate-3 bg-white/90  z-10 absolute top-2"
            >
              Shop
            </Link>
          ) : (
            <>
              <div
                className={`lg:hidden fixed flex items-center justify-center top-[0.5rem] ${
                  isFilterOpen ? "left-[8rem]" : "left-0"
                } z-30 h-[2rem] w-[1.5rem] bg-[#6072D3] border-black border border-l-0 cursor-pointer  rounded-r-lg transition-[left] duration-300 ease-in-out`}
                onClick={toggleFilter}
              >
                <ChevronUpIcon
                  className={`h-5 w-5 text-black transform ${
                    isFilterOpen ? "-rotate-90" : "rotate-90"
                  }`}
                />
              </div>

              <div
                style={filterContainerStyle}
                className="lg:hidden flex flex-col"
              >
                {categories.map(({ name, hoverColor, activeColor }) => (
                  <button
                    key={name}
                    className={`cursor-pointer uppercase tracking-[-1.2px] custom-cursor bg-[#B8D0F3] border-black border-t border-r`}
                    onClick={() => handleCategoryClick(name)}
                  >
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                  </button>
                ))}
              </div>
            </>
          )}
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

              {/* Categories */}
              {!isSpecialPage && (
                <div className="hidden lg:flex py-[2px] relative">
                  {categories.map(({ name, hoverColor, activeColor }) => (
                    <button
                      key={name}
                      className={`cursor-pointer uppercase px-4 tracking-[-1.2px] ml-4 custom-cursor border-black border-[1px] hover:-rotate-3 ${
                        sortOption === name ? "bg-gray-200" : "bg-white/90"
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
                  href="/stockists"
                  // onClick={() => setIsProjectsVisible(!isProjectsVisible)}
                  className={`cursor-pointer uppercase px-4 tracking-[-1.2px] ml-4 custom-cursor border-black border-[1px] hover:-rotate-3 ${
                    isStockistsPage
                      ? "bg-[#FD5381]/90"
                      : "bg-white/90 hover:bg-[#FD5381]/90" // Different background color if on Projects page
                  }`}
                >
                  Stockists
                </Link>
                {/* Projects menu item with hover effect */}
                {/* <div
                  onMouseEnter={() => setIsProjectsHovered(true)}
                  onMouseLeave={() => setIsProjectsHovered(false)}
                  className={` relative cursor-pointer uppercase px-4 tracking-[-1.2px] ml-4 custom-cursor border-black border-[1px] z-2 hover:-rotate-3 bg-white/90 ${
                    isProjectsPage ? "bg-[#D6FD53]" : "" // Different background color if on Projects page
                  } ${
                    isProjectsHovered
                      ? "hover:bg-[#D6FD53] border-b-[#D6FD53]"
                      : "border-b"
                  }`}
                >
                  <span className="">Projects</span>
                  {isProjectsHovered && projectsSubmenu}
                </div> */}

                <div
                  onMouseEnter={() => setIsAboutHovered(true)}
                  onMouseLeave={() => setIsAboutHovered(false)}
                  className={` relative cursor-pointer uppercase px-4 tracking-[-1.2px] ml-4 custom-cursor border-black border-[1px] z-2 hover:-rotate-3 bg-white/90 ${
                    isAboutPage
                      ? "bg-[#AAAAEF]/90"
                      : "bg-white/90 hover:bg-[#AAAAEF]/90"
                  } ${
                    isTermsAndConditionsPage
                      ? "bg-[#AAAAEF]/90"
                      : "bg-white/90 hover:bg-[#AAAAEF]/90"
                  } ${
                    isContactPage
                      ? "bg-[#AAAAEF]/90"
                      : "bg-white/90 hover:bg-[#AAAAEF]/90"
                  } ${
                    isAboutHovered
                      ? "hover:bg-[#AAAAEF] border-b-[#AAAAEF]"
                      : "border-b"
                  }`}
                >
                  <span className="">About</span>
                  {isAboutHovered && aboutSubmenu}
                </div>
              </div>
            </div>
          </nav>
        </header>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-[20000]">
        <MarketingBanner />
      </div>

      <MiniCart cart={cart} />

      <Newsletter />

      {/* Projects submenu */}
      {/* {isProjectsVisible && (
        <div className="w-full bg-white z-20">
          <div className="absolute top-10 right-11 ml-4 flex flex-col w-[228px] border border-black">
            <ul className="list-none p-0 m-0">
              {projects.map((project) => (
                <li
                  key={project.title}
                  className="bg-white p-[0.1rem] px-1 py-1 blur-none"
                >
                  <Link href={project.url}>
                    <span className="block text-black no-underline">
                      {project.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )} */}

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
                      <Link href="/stockists" className="">
                        Stockists
                      </Link>
                      {/* <button
                        onClick={toggleProjectsSubmenuMobile}
                        className="text-left uppercase"
                      >
                        Projects
                      </button>

                      {isProjectsSubmenuOpen && (
                        <ul className="pl-4 list-nonemy-0 py-0">
                          {projects.map((project) => (
                            <li
                              key={project.title}
                              className="py-1 text-gray-400 "
                            >
                              <Link href={project.url}>
                                <span className="block no-underline">
                                  {project.title}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )} */}
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
