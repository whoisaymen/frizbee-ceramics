import ScrollToTop from "@/components/ScrollToTop";
import Link from "next/link";
import Image from "next/image";

export default function ContactPage() {
  return (
    <div className="bg-white font-extralight tracking-tight h-screen">
      <ScrollToTop />

      <div className="mx-auto">
        <div className="flex justify-start items-center">
          <div className="relative w-[200px] h-[200px]">
            <Image
              src={"/images/contact/frizbeeceramics.jpg"}
              alt={"Image"}
              layout="fill"
              className={``}
              objectFit="cover"
            />
          </div>
          <div className="p-8 mt-32">
            {/* Contact Information */}
            <div className="space-y-2">
              <span className="px-2 border-[#E42220] border text-[#E42220]">
                TO SAY HI
              </span>
              <p>
                CUSTOMER SUPPORT:
                <Link
                  href="mailto:hey@frizbeeceramics.com"
                  className="uppercase border-b border-gray-700 tracking-tighter mr-6"
                >
                  hey@frizbeeceramics.com
                </Link>
              </p>
              <p>
                WHOLESALE:
                <Link
                  href="mailto:go@frizbeeceramics.com"
                  className="uppercase border-b border-gray-700 tracking-tighter mr-6"
                >
                  go@frizbeeceramics.com
                </Link>
              </p>
              <p>
                PRESS INQUIRY:
                <Link
                  href="mailto:pizza@frizbeeceramics.com"
                  className="uppercase border-b border-gray-700 tracking-tighter mr-6"
                >
                  pizza@frizbeeceramics.com
                </Link>
              </p>
              <p>
                COLLABORATION:
                <Link
                  href="mailto:pizza@frizbeeceramics.com"
                  className="uppercase border-b border-gray-700 tracking-tighter mr-6"
                >
                  pizza@frizbeeceramics.com
                </Link>
              </p>
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-4 mt-8">
              <span className="px-2 border-[#E42220] border text-[#E42220]">
                TO FOLLOW US
              </span>
              <Link
                href="https://www.instagram.com"
                className="uppercase border-b border-gray-700 tracking-tighter mr-6"
              >
                Instagram
              </Link>
              <Link
                href="https://www.facebook.com"
                className="uppercase border-b border-gray-700 tracking-tighter mr-6"
              >
                Facebook
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-end h-full -mt-20">
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
      </div>
    </div>
  );
}
