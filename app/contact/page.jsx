import ScrollToTop from "@/components/ScrollToTop";
import Link from "next/link";
import Image from "next/image";

export default function ContactPage() {
  return (
    <div className="bg-white font-extralight tracking-tight h-screen w-full">
      <ScrollToTop />

      <div className="h-full flex flex-col items-between justify-between">
        <div className="w-full h-full mt-20">
          {/* <div className="self-stretch h-auto">
            <Image
              src={"/images/contact/frizbeeceramics.jpg"}
              alt={"Image"}
              width={500}
              height={500}
              className={`h-auto`}
            />
          </div> */}
          <div className="mt-20 flex flex-col lg:flex-row justify-center lg:items-center w-full mx-10 lg:mx-48 text-xs">
            {/* Contact Information */}
            <div className="space-y-4 w-1/2">
              <span className="bg-[#E42220] text-[#fff] mb-0 inline-block font-normal tracking-tight px-1 py-[2px] text-sm">
                TO SAY HI
              </span>
              <p>
                <span className="uppercase">Customer support: </span>
                <Link
                  href="mailto:hey@frizbeeceramics.com"
                  className="uppercase border-b border-gray-700 tracking-tighter mr-6"
                >
                  hey@frizbeeceramics.com
                </Link>
              </p>
              <p>
                <span className="uppercase">Wholesale: </span>
                <Link
                  href="mailto:go@frizbeeceramics.com"
                  className="uppercase border-b border-gray-700 tracking-tighter mr-6"
                >
                  go@frizbeeceramics.com
                </Link>
              </p>
              <p>
                <span className="uppercase">Press inquiry: </span>
                <Link
                  href="mailto:pizza@frizbeeceramics.com"
                  className="uppercase border-b border-gray-700 tracking-tighter mr-6"
                >
                  pizza@frizbeeceramics.com
                </Link>
              </p>
              <p>
                <span className="uppercase">Collaboration: </span>
                <Link
                  href="mailto:pizza@frizbeeceramics.com"
                  className="uppercase border-b border-gray-700 tracking-tighter mr-6"
                >
                  pizza@frizbeeceramics.com
                </Link>
              </p>
            </div>

            {/* Social Links */}
            <div className="flex flex-col space-y-4 self-start w-1/2">
              <span className="bg-[#E42220] text-[#fff] self-start mb-0 inline-block font-normal tracking-tight px-1 py-[2px] lg:mt-0 text-sm mt-8">
                TO FOLLOW US
              </span>
              <div className="flex flex-col items-start space-y-2">
                <Link
                  href="https://www.instagram.com"
                  className="uppercase border-b border-gray-700 tracking-tighter mr-6"
                >
                  Instagram
                </Link>
                <Link
                  href="https://www.facebook.com"
                  className="uppercase border-b border-gray-700 tracking-tighter"
                >
                  Facebook
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="absolute bottom-[24px] lg:bottom-[30px] left-0"> */}
        <div className="relative w-full bg-[#E42220] pb-[40px]">
          <Image
            src={"/images/contact/frizbee-redlogo.jpg"}
            alt={"Image"}
            height={3000}
            width={3000}
            className={`border-t border-black object-contain`}
          />
        </div>
        {/* </div> */}
      </div>

      {/* <div className="flex flex-col justify-end h-full -mt-20">
        <div className="w-full">
          <div className="relative w-full h-[50vh]">
            <Image
              src={"/images/contact/frizbee-redlogo.jpg"}
              alt={"Image"}
              layout="fill"
              className={`border-t border-black`}
              objectFit="cover"
            />
          </div>
        </div>
      </div> */}
    </div>
  );
}
