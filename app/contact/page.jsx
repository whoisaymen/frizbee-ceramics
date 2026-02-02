import ScrollToTop from "@/components/ScrollToTop";
import Link from "next/link";
import Image from "next/image";

export default function ContactPage() {
  return (
    <div className="bg-white font-extralight tracking-tight min-h-[100vh] flex flex-col gap-6 items-center">
      <ScrollToTop />

      <div className="w-full h-full mt-20 lg:mt-20">
        <div className="mt-20 flex flex-col lg:flex-row justify-center lg:items-center mx-10 lg:mx-48 space-y-8 lg:space-y-0">
          <div className="space-y-4 w-1/2">
            <span className="text-[#000] bg-[#aaefcc] mb-0 inline-block font-light py-[0px] px-3 tracking-[-1.2px] border border-black text-sm md:text-base">
              EMAIL US
            </span>
            <p className="text-sm">
              <span className="font-bold mb-1 inline-block">
                Customer support:
              </span>
              <br />
              <Link
                href="mailto:box@frizbeeceramics.com"
                className="uppercase border-b border-gray-700 tracking-tighter mr-6"
              >
                box@frizbeeceramics.com
              </Link>
            </p>
            <p className="text-sm">
              <span className="font-bold mb-1 inline-block">Wholesale: </span>
              <br />
              <Link
                href="mailto:go@frizbeeceramics.com"
                className="uppercase border-b border-gray-700 tracking-tighter mr-6"
              >
                go@frizbeeceramics.com
              </Link>
            </p>
            <p className="text-sm">
              <span className="font-bold mb-1 inline-block">
                Press inquiry:
              </span>
              <br />
              <Link
                href="mailto:pizza@frizbeeceramics.com"
                className="uppercase border-b border-gray-700 tracking-tighter mr-6"
              >
                pizza@frizbeeceramics.com
              </Link>
            </p>
            {/* <p className="text-sm">
              <span className="font-bold mb-1 inline-block">
                Collaboration:
              </span>
              <br />
              <Link
                href="mailto:pizza@frizbeeceramics.com"
                className="uppercase border-b border-gray-700 tracking-tighter mr-6"
              >
                pizza@frizbeeceramics.com
              </Link>
            </p> */}
          </div>

          {/* Social Links */}
          <div className="flex flex-col space-y-4 self-start w-1/2">
            <span className="text-[#000] bg-[#aaefcc] mb-0 inline-block md:text-base font-light py-[0px] px-3 tracking-[-1.2px] border border-black self-start text-sm">
              FOLLOW US
            </span>
            <div className="flex flex-col items-start space-y-2">
              <Link
                href="https://www.instagram.com/frizbeeceramics/?hl=en"
                className="uppercase border-b border-gray-700 tracking-tighter mr-6 text-sm"
              >
                Instagram
              </Link>
              <Link
                href="https://www.facebook.com"
                className="uppercase border-b border-gray-700 tracking-tighter text-sm"
              >
                Facebook
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="relative w-full bg-[#E42220] pb-[20px]">
        <Image
          // src={"/images/contact/frizbee-redlogo.jpg"}
          src={"https://cdn.shopify.com/s/files/1/0806/4381/7793/files/contact-image.jpg"}
          alt={"Image"}
          height={3000}
          width={3000}
          className={`object-contain`}
        />
      </div> */}
    </div>
  );
}
