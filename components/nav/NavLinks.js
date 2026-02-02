"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MENU_ITEMS } from "@/lib/constants";
import { useEffect, useState } from "react";
import { checkForSaleProducts, checkForFlawedProducts } from "./SortFilterMenu";

function NavLink({ item }) {
  const pathname = usePathname();
  const active = pathname.includes(`/${item.slug}`);
  const href = `/${item.slug}`;

  const [isAboutHovered, setIsAboutHovered] = useState(false);
  const [isProjectsHovered, setIsProjectsHovered] = useState(false);
  const [isProfessionalHovered, setIsProfessionalHovered] = useState(false);

  const handleMouseEnter = () => {
    if (item.slug === "about") {
      setIsAboutHovered(true);
    } else if (item.slug === "projects") {
      setIsProjectsHovered(true);
    } else if (item.slug === "professionals") {
      setIsProfessionalHovered(true);
    }
  };
  const handleMouseLeave = () => {
    if (item.slug === "about") {
      setIsAboutHovered(false);
    } else if (item.slug === "projects") {
      setIsProjectsHovered(false);
    } else if (item.slug === "professionals") {
      setIsProfessionalHovered(false);
    }
  };

  return (
    <>
      <li
        className={`tracking-[-1.2px] ${
          item.slug === "about" ? "mr-12" : "mr-4"
        } custom-cursor text-black border-black border hover:-rotate-3 transition duration-200 ease-out font-light bg-white/90 relative`}
        key={item.slug}
        style={{
          background: active
            ? item.color : isAboutHovered || isProjectsHovered || isProfessionalHovered ? "#AAAAEF" : "white",
          // background: active
          //   ? item.color
          //   : isAboutHovered
          //   ? "#AAAAEF"
          //   : isProjectsHovered || isProfessionalHovered
          //   ? "#eee"
          //   : "white",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {item.slug === "projects" || item.slug === "professionals" ? (
          <div className="w-full px-4">{item.title}</div>
        ) : (
          <Link href={href} className="w-full px-4">
            {item.title}
          </Link>
        )}
        {isAboutHovered && aboutSubmenu}
        {isProfessionalHovered && professionalsSubmenu }
        {isProjectsHovered && projectsSubmenu}
      </li>
    </>
  );
}

export default function NavLinks() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isProjectsSubmenuOpen, setIsProjectsSubmenuOpen] = useState(false);
  const [hasSaleProducts, setHasSaleProducts] = useState(0);
  const [hasFlawedProducts, setHasFlawedProducts] = useState(0);

  useEffect(() => {
    const fetchFlawedAndSaleProducts = async () => {
      // Check for Sale Products
      const res = await checkForSaleProducts();
      setHasSaleProducts(res);

      // Check for Flawed Products
      const res2 = await checkForFlawedProducts();
      setHasFlawedProducts(res2);
    };
    fetchFlawedAndSaleProducts();
  }, []);

  const toggleProjectsSubmenuMobile = () => {
    setIsProjectsSubmenuOpen(!isProjectsSubmenuOpen);
  };
 

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <>
      <div className="hidden lg:flex justify-end items-center w-full h-full md:bg-transparent">
        {/* <ul className="flex">
          {MENU_ITEMS.map((option) => (
            <NavLink key={option.slug} item={option} />
          ))}
        </ul> */}
        <ul className="flex">
        {MENU_ITEMS.filter((item) => item.slug !== "projects").map((option) => (
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
        {/* {menuOpen && (
          
        )} */}
      </div>
      {/* <div
        className={`fixed left-0 bottom-0 w-[50vw] transform transition-transform duration-500 ease-in-out  ${
          menuOpen ? "translate-x-0" : "translate-x-[calc(100%+3px)]"
        }`}
      > */}
      <div
        className={`lg:hidden fixed top-0 bottom-0 right-0 flex flex-col justify-center h-full transform transition ease-in-out duration-500 bg-[#e8ecf4] border-gray-800 border-l ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } `}
      >
        <div className="h-screen bg-[#4019A9]/10 blur-xl -mb-20 z-0 relative"></div>

        <div className="pb-40 px-4 sm:px-6 h-full overflow-y-scroll w-[50vw] z-1 relative">
          <nav className="flex flex-col tracking-tighter font-light uppercase text-sm justify-center space-y-2 mt-[60px]">
            {/* <Link
              href="/stockists"
              className=""
              onClick={() => setMenuOpen(false)}
            >
              Stockists
            </Link> */}

            {/* if sale products exist, show sale button */}
            {hasSaleProducts && (
              <Link
                href="/?sort=sale"
                className=""
                onClick={() => setMenuOpen(false)}
              >
                Sale
              </Link>
            )}

            {hasFlawedProducts && (
              <Link
                href="/?sort=flawfab"
                className=""
                onClick={() => setMenuOpen(false)}
              >
                Flawed & Faboulous
              </Link>
            )}

            {/* 
            <button
              onClick={toggleProjectsSubmenuMobile}
              className="text-left uppercase"
            >
              Projects
            </button> */}

            {isProjectsSubmenuOpen && (
              <ul className="pl-4 list-none my-0 py-0">
                {projectsItem.projects.map((project) => (
                  <li key={project.title} className="py-1 text-gray-400 ">
                    <Link
                      href={`/projects/${project.slug}`}
                      onClick={() => setMenuOpen(false)}
                    >
                      <span className="block no-underline">
                        {project.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            <Link href="/about" className="" onClick={() => setMenuOpen(false)}>
              Info
            </Link>
            <Link href="/professionals" className="" onClick={() => setMenuOpen(false)} >
              Professionals
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
            {/* Add more links as neeeed */}
          </nav>
        </div>
      </div>
      {/* </div> */}
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

// const professionalItem = MENU_ITEMS.find((item) => item.slug === "professionals");

// const professionalsSubmenu = (
//   <div className="professionals-submenu absolute top-full right-0 z-0 bg-[#AAAAEF] border border-t-0 border-black w-[180px] -mt-0 -mr-[1px]">
//     <ul className="list-none p-0 m-0 text-right">
//       {professionalItem.subsections.map((subsection) => (
//         <li key={subsection.title} className="p-[0.1rem] px-1 py-0">
//           <Link href={`/${subsection.slug}`}>
//             <span className="block text-black no-underline">
//               {subsection.title}
//             </span>
//           </Link>
//         </li>
//       ))}
//     </ul>
//   </div>
// );

const projectsItem = MENU_ITEMS.find((item) => item.slug === "projects");

const projectsSubmenu = (
  <div className="projects-submenu absolute top-full right-0 z-0 bg-[#AAAAEF] border border-t-0 border-black w-[150px] -mt-0 -mr-[1px]">
    <ul className="list-none p-0 m-0 text-right">
      {projectsItem.projects.map((project) => (
        <li key={project.slug} className="p-[0.1rem] px-1 py-0">
          <Link href={`/projects/${project.slug}`}>
            <span className="block text-black no-underline">
              {project.title}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);
