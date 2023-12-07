import ScrollToTop from "@/components/ScrollToTop";
import Link from "next/link";
import Image from "next/image";

export default function ContactPage() {
  return (
    <div className="bg-white font-extralight tracking-tight h-screen w-full">
      <ScrollToTop />

      <div className="h-[50vh] flex items-center justify-center">
        <div className="w-full">
          {/* <div className="self-stretch h-auto">
            <Image
              src={"/images/contact/frizbeeceramics.jpg"}
              alt={"Image"}
              width={500}
              height={500}
              className={`h-auto`}
            />
          </div> */}
          <div className="mt-32 flex justify-evenly w-full">
            {/* Contact Information */}
            <div className="space-y-2">
              <span className="px-2 border-[#E42220] border text-[#E42220] mb-6 inline-block">
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
            <div className="flex flex-col space-y-2">
              <span className="px-2 border-[#E42220] border text-[#E42220] self-start mb-6 inline-block">
                TO FOLLOW US
              </span>
              <div>
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
