import Image from "next/image";
import homepageBanner from "@/public/images/homepage-banner2.jpeg";
import homepageBannerMobile from "@/public/images/homepage-banner-mobile.jpeg";
import Link from "next/link";
export default function HomepageBanner() {
  return (
    <div
      className="mb-[24px] md:mb-[29px] md:mx-0 -mt-[2px] h-[calc(100svh-24px)]  relative"
      style={{ backgroundImage: "url(/images/bgHomeGradient.svg)" }}
    >
      <Image
        src={homepageBanner}
        alt="Product image"
        fill
        priority
        placeholder="blur"
        className="hidden md:block object-cover object-center"
      />
      <Image
        src={homepageBannerMobile}
        alt="Product image"
        fill
        priority
        placeholder="blur"
        className="md:hidden object-cover object-center"
      />

      <div className="absolute left-1/2 lg:left-[25%] lg:bottom-[15%] -translate-x-1/2 bottom-[10%] w-64 md:max-w-7xl md:min-w-[400px] h-auto border border-gray-800 shadow-lg">
        <div className="bg-white p-4">
          <h2 className="leading-tight text-md md:text-lg lg:text-2xl tracking-tighter font-semibold uppercase">
            Winter Sales
          </h2>
          <p className="tracking-[-1px] my-6 text-black text-sm md:text-base font-light">
            A selection of pieces at 30% discount for 15 days. Limited stocks
            availability.
          </p>

          <Link href="/products?sort=sale">
            <span
              className={
                "tracking-[-1.2px] text-black font-light uppercase border text-base border-black px-4 py-1 inline-block w-full text-center hover:bg-[#e8ecf4]"
              }
            >
              Shop Now
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
