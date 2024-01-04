import Link from "next/link";
import Image from "next/image";

import logo from "@/public/images/logo-min.png";

export default function Logo() {
  return (
    <div
      href="/"
      className="absolute top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-6 custom-cursor mt-2"
    >
      <div className="h-16 lg:h-[5.4rem] w-auto">
        <Image
          src={logo}
          alt="Frizbee Ceramics logo"
          priority
          className="object-contain relative z-[2000] w-full h-full"
        />
        <span className="sr-only">Frizbee Ceramics</span>
      </div>
    </div>
  );
}
