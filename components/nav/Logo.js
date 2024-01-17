import Image from "next/image";
import Link from "next/link";
import logo from "@/public/images/logo-min.png";

export default function Logo() {
  return (
    <>
      <Link
        href="/products"
        className="absolute z-[2000] top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-6 custom-cursor mt-2"
      >
        <span className="sr-only">Frizbee Ceramics</span>
        <div className="h-16 lg:h-[5.4rem] w-auto">
          <Image
            src={logo}
            alt="Frizbee Ceramics logo"
            priority
            className="object-contain w-full h-full"
          />
        </div>
      </Link>
    </>
  );
}
