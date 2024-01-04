import Link from "next/link";
import NavLinks from "./NavLinks";

import Logo from "./Logo";

export default function SideNav() {
  return (
    <div className="h-[10vh] fixed top-0 left-0 right-0 z-10 font-light tracking-tight uppercase mx-auto lg:mt-4">
      <Link href="/">
        {/* <div className="w-32 text-white md:w-40"> */}
        <Logo />
        {/* </div> */}
      </Link>

      <div className="flex space-x-2">
        <NavLinks />
      </div>
    </div>
  );
}
