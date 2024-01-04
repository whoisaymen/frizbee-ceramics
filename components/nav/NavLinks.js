"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const filterLinks = [
  { name: "Color", href: "/sort&q=color" },
  {
    name: "Shape",
    href: "/sort&q=shape",
  },
  { name: "Pattern", href: "/sort&q=pattern" },
  { name: "New", href: "/sort&q=new" },
  { name: "Set", href: "/sort&q=set" },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {filterLinks.map((link) => {
        return (
          <Link key={link.name} href={link.href}>
            <p
              className={clsx(
                "uppercase px-4 tracking-[-1.2px] ml-4 custom-cursor border-black border-[1px] hover:-rotate-3 font-light",
                {
                  "bg-sky-100 text-blue-600": pathname === link.href,
                }
              )}
            >
              {link.name}
            </p>
          </Link>
        );
      })}
    </>
  );
}
