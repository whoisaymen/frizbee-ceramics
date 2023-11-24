"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useState } from "react";

import Image from "next/legacy/image";
import { CartContext } from "../context/shopContext";
import MarketingBanner from "./MarketingBanner";
import MiniCart from "./MiniCart";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const submenus = {
  color: (
    <div className="absolute top-10 -left-4 ml-4 flex flex-row">
      <span className="bg-[#4169CC] p-[0.1rem] px-6 py-2 blur-none"></span>
      <span className="bg-[#67AB82] p-[0.1rem] px-6 py-2 blur-none"></span>
      <span className="bg-[#EADF50] p-[0.1rem] px-6 py-2 blur-none"></span>
      <span className="bg-[#EB792F] p-[0.1rem] px-6 py-2 blur-none"></span>
      <span className="bg-[#AAAAEF] p-[0.1rem] px-6 py-2 blur-none"></span>
    </div>
  ),
  shape: (
    <div className="absolute top-10 -left-4 ml-4 flex flex-row">
      <Image
        src="/images/iconShape1.png"
        alt="icon"
        height={32}
        width={32}
        className="object-contain bg-white border border-black hover:-rotate-3"
      />
      <Image
        src="/images/iconShape2.png"
        alt="icon"
        height={32}
        width={32}
        className="object-contain bg-white border border-black ml-1 hover:-rotate-3 "
      />
      <Image
        src="/images/iconShape3.png"
        alt="icon"
        height={32}
        width={32}
        className="object-contain bg-white border border-black ml-1"
      />
      <Image
        src="/images/iconShape4.png"
        alt="icon"
        height={32}
        width={32}
        className="object-contain bg-white border border-black ml-1"
      />
      <Image
        src="/images/iconShape5.png"
        alt="icon"
        height={32}
        width={32}
        className="object-contain bg-white border border-black ml-1"
      />
      <Image
        src="/images/iconShape6.png"
        alt="icon"
        height={32}
        width={32}
        className="object-contain bg-white border border-black ml-1"
      />
    </div>
  ),
  pattern: (
    <div className="absolute top-10 -left-4 ml-4 flex flex-row">
      <Image
        src="/images/pattern1.png"
        alt="icon"
        height={32}
        width={32}
        className="object-cover bg-white border border-black hover:-rotate-3"
      />
      <Image
        src="/images/pattern2.png"
        alt="icon"
        height={32}
        width={32}
        className="object-cover bg-white border border-black ml-1 hover:-rotate-3"
      />
      <Image
        src="/images/pattern3.png"
        alt="icon"
        height={32}
        width={32}
        className="object-cover bg-white border border-black ml-1 hover:-rotate-3"
      />
      <Image
        src="/images/pattern4.png"
        alt="icon"
        height={32}
        width={32}
        className="object-cover bg-white border border-black ml-1 hover:-rotate-3"
      />
      <Image
        src="/images/pattern5.png"
        alt="icon"
        height={32}
        width={32}
        className="object-cover bg-white border border-black ml-1 hover:-rotate-3"
      />
      <Image
        src="/images/pattern6.png"
        alt="icon"
        height={32}
        width={32}
        className="object-cover bg-white border border-black ml-1 hover:-rotate-3"
      />
    </div>
  ),
  set: (
    <div className="absolute top-10 -left-4 ml-4 flex flex-row">
      {/* Add submenu content specific to "set" category */}
    </div>
  ),
  new: (
    <div className="absolute top-10 -left-4 ml-4 flex flex-row">
      {/* Add submenu content specific to "new" category */}
    </div>
  ),
};

export default function Nav() {
  const pathname = usePathname();

  const { cart, cartOpen, setCartOpen, sortOption, setSortOption } =
    useContext(CartContext);
  const [isProjectsVisible, setIsProjectsVisible] = useState(false);
  const [isHeaderEnlarged, setIsHeaderEnlarged] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);

  let cartQuantity = 0;

  cart.map((item) => {
    return (cartQuantity += item?.variantQuantity);
  });

  const handleCategoryClick = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
      setIsHeaderEnlarged(false);
    } else {
      setSelectedCategory(category);
      setIsHeaderEnlarged(true);
    }

    setSortOption(category);
  };

  return (
    <div
      className="font-light tracking-tight uppercase fixed top-0 left-0 right-0 mx-auto z-50 mt-4"
      id="header"
    >
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <MarketingBanner />
      </div>

      <div
        className={` relative  mb-4 ${
          isHeaderEnlarged ? "header-enlarged" : ""
        }`}
      >
        <header className="relative">
          <nav aria-label="Top" className="mx-auto">
            <div className="w-full flex items-start justify-between">
              <div className="hidden lg:flex">
                {Object.keys(submenus).map((category) => (
                  <span
                    key={category}
                    className={`py-[2px]  ml-4 relative 
                    
                    `}
                  >
                    {/* shadow-sm hover:shadow-lg  transition rotate duration-200 ease-out */}
                    <div
                      className={`cursor-pointer px-4 custom-cursor  bg-white/90 border-black border hover:-rotate-3  ${
                        selectedCategory === category
                          ? "border border-black bg-white"
                          : ""
                      }`}
                      onClick={() => handleCategoryClick(category)}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </div>
                    {selectedCategory === category && submenus[category]}
                  </span>
                ))}
              </div>

              {/* Mobile Menu */}
              <div
                className="text-sm lg:hidden flex flex-wrap w-full m-0 p-0 text-center justify-center bg-white-500"
                style={{ backgroundImage: "url(/images/clouds.jpeg)" }}
              >
                <div className="flex justify-center">
                  <Link
                    href="/"
                    onClick={() => setSortOption("")}
                    className="-rotate-3 custom-cursor"
                  >
                    <span className="sr-only">Frizbee Ceramics</span>
                    <Image
                      src="/images/logo.png"
                      height={1000}
                      width={1000}
                      className="w-[80vw] mx-auto z-50 p-3 pb-5"
                      alt="Frizbee Ceramics logo"
                      priority
                    ></Image>
                  </Link>
                </div>

                <div className="w-full flex justify-center">
                  {["color", "shape", "pattern", "new", "set"].map((option) => (
                    <span
                      key={option}
                      className={` flex-grow border border-black py-[4px] font-light bg-white -ml-[1px] ${
                        sortOption === option
                          ? "bg-[#000] text-white"
                          : "text-black"
                      }`}
                      style={
                        sortOption === option ? { backgroundColor: "#000" } : {}
                      }
                    >
                      <Link
                        href="/"
                        onClick={() => setSortOption(option)}
                        className="px-3 flex justify-center items-center"
                      >
                        {sortOption === option ? (
                          // <svg className='h-1.5 w-1.5 fill-gray-800 mr-1' viewBox='0 0 6 6' aria-hidden='true'>
                          // 	<circle cx={3} cy={3} r={3} />
                          // </svg>
                          <svg
                            className="h-2.5 w-2.5 fill-white mr-1"
                            viewBox="0 0 10 15"
                          >
                            <path d="M10 6L5 0L0 6H10ZM10 9L5 15L0 9H10Z" />
                          </svg>
                        ) : (
                          <span className="h-1.5 w-1.5 opacity-0"> </span> // The mirror element
                        )}
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </Link>
                    </span>
                  ))}
                </div>

                <div className="w-full flex -mt-[1px]">
                  <span
                    onClick={() => setIsProjectsVisible(!isProjectsVisible)}
                    className={` border border-black px-4 py-[4px] font-light tracking-tight uppercase flex-grow bg-white -ml-[1px] flex justify-center items-center ${
                      isProjectsVisible ? "bg-[#FFE9B2]" : "bg-white"
                    }`}
                    style={
                      isProjectsVisible ? { backgroundColor: "#FFE9B2" } : {}
                    }
                  >
                    Projects
                    {isProjectsVisible ? (
                      // <svg className='h-1.5 w-1.5 fill-gray-800 mr-1' viewBox='0 0 6 6' aria-hidden='true'>
                      // 	<circle cx={3} cy={3} r={3} />
                      // </svg>

                      <svg
                        className="h-[11px] w-[11px] fill-gray-50 ml-1 mt-[1px]"
                        viewBox="0 0 28 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M26.022 0L27.436 1.414L1.414 27.434L0 26.021L26.022 0Z"
                          fill="black"
                        />
                        <path
                          d="M1.414 0L27.436 26.02L26.022 27.435L0 1.415L1.414 0Z"
                          fill="black"
                        />
                      </svg>
                    ) : (
                      ""
                    )}
                  </span>
                  <Link
                    href="/about"
                    className={`border border-black px-4 py-[4px] flex-grow ${
                      pathname === "/about" ? "bg-[#F3FFE0]" : "bg-white"
                    } -ml-[1px]`}
                    onClick={() => {
                      // console.log('Current sortOption value:', sortOption);
                      setSortOption("");
                    }}
                  >
                    <span>About</span>
                  </Link>
                  <span
                    className=" border border-black px-4 py-[4px] flex-grow bg-white -ml-[1px]"
                    onClick={() => setCartOpen(!cartOpen)}
                  >
                    Cart ({cartQuantity})
                  </span>
                </div>
              </div>

              <Link
                href="/"
                onClick={() => setSortOption("")}
                className="hidden lg:block lg:absolute lg:top-8 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 -rotate-6 custom-cursor lg:z-[2000] "
              >
                <span className="sr-only">Frizbee Ceramics</span>
                <Image
                  src="/images/logo.png"
                  height={1000}
                  width={1000}
                  className="h-20 w-auto -mb-6 mt-6 "
                  alt="Frizbee Ceramics logo"
                  priority
                ></Image>
              </Link>

              <Link
                href="/"
                onClick={() => setSortOption("")}
                className="hidden lg:block lg:absolute lg:top-4 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 -rotate-6 custom-cursor lg:z-[1]"
              >
                <span className="sr-only">Frizbee Ceramics</span>
                <div
                  className="relative h-20 w-auto bg-[#6535D2] blur-3xl"
                  style={{ animation: "colorChange 20s infinite alternate" }}
                >
                  <Image
                    src="/images/logo.png"
                    height={1000}
                    width={1000}
                    className="h-20 w-auto -mb-6 mt-6"
                    alt="Frizbee Ceramics logo"
                    priority
                  />
                </div>
              </Link>

              <div className="flex items-center justify-end z-10">
                <div className="hidden lg:block">
                  <div className="flex items-start justify-end">
                    <div className="hover:-rotate-3">
                      <span
                        onClick={() => setIsProjectsVisible(!isProjectsVisible)}
                        className="px-4 py-[2px] font-light tracking-tight uppercase bg-white/90 border border-black "
                      >
                        {isProjectsVisible ? "Projects X" : "Projects"}
                      </span>
                    </div>
                    <div className="hover:-rotate-3">
                      <Link
                        href="/about"
                        className={`px-4 py-[2px] ml-4 border border-black ${
                          pathname === "/about" ? "bg-[#F3FFE0]" : "bg-white"
                        } `}
                      >
                        <span>About</span>
                      </Link>
                    </div>
                    {/* <span
                      className="px-4 -ml-[1px] py-[2px]"
                      onClick={() => setCartOpen(!cartOpen)}
                    >
                      Cart ({cartQuantity})
                    </span> */}
                    <div
                      className="flex flex-col border items-center border-black ml-4 bg-white/95 hover:rotate-3"
                      onClick={() => setCartOpen(!cartOpen)}
                    >
                      <span className="px-1 pt-1">C</span>
                      <span className="px-1 -mt-[6px]">A</span>
                      <span className="px-1 -mt-[6px]">R</span>
                      <span className="px-1 -mt-[6px]">T</span>
                      <span className="px-1 pb-1">({cartQuantity})</span>
                    </div>
                    <span className="sr-only">items in cart, view bag</span>
                  </div>
                </div>
                <MiniCart cart={cart} />
              </div>
            </div>
          </nav>
        </header>
        {isProjectsVisible && (
          <div className="w-full bg-white z-20">
            <div className="absolute top-10 right-11 ml-4 flex flex-col w-[228px] border border-black">
              <ul className="list-none p-0 m-0">
                <li className="bg-[#fff] p-[0.1rem] px-1 py-1 blur-none">
                  A Box Is A Box
                </li>
                <li className="bg-gray-100 p-[0.1rem] px-1 py-1 blur-none">
                  Carne
                </li>
                <li className="bg-white p-[0.1rem] px-1 py-1 blur-none">
                  Chez Manger
                </li>
                <li className="bg-gray-100 p-[0.1rem] px-1 py-1 blur-none">
                  Lina Lapelyte
                </li>
                <li className="bg-white p-[0.1rem] px-1 py-1 blur-none">MAD</li>
                <li className="bg-gray-100 p-[0.1rem] px-1 py-1 blur-none">
                  Now Belgium Now
                </li>
                <li className="bg-white p-[0.1rem] px-1 py-1 blur-none">
                  Phyps
                </li>
                <li className="bg-gray-100 p-[0.1rem] px-1 py-1 blur-none">
                  Pon Ding
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
