import ScrollToTop from "@/components/ScrollToTop";
import Link from "next/link";
import Image from "next/image";

export default function ContactPage() {
  return (
    <div className="bg-white font-extralight tracking-tight">
      <ScrollToTop />

      <div className="mx-auto">
        <div className="flex flex-col md:flex-row justify-center items-center h-screen">
          <div className="order-2 lg:order-1 w-full">
            <div className="p-12 md:py-28 text-sm lg:text-base max-w-5xl">
              {/* <h2 className='uppercase mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>About</h2> */}
              {/* <Image src='/images/sun.png' height={1000} width={1000} className='w-auto mx-auto z-50' alt='Frizbee Ceramics logo'></Image> */}
              <p className="text-gray-900 pr-52 tracking-tighter mb-10">
                <strong className="text-4xl tracking-tighter">
                  <span className="font-black">FRIZBEE CERAMICS</span> offers a
                  high-end handcrafted porcelain tableware collection.
                </strong>
              </p>
              <p className="mt-4 text-gray-700">
                Designed and produced by two Belgian artists Lisa Egio and
                Elliot Kervyn graduated from the Royal College of Arts London.
              </p>

              <div className="mt-6">
                <Link href="/terms-and-conditions">
                  <span className="uppercase border-b border-gray-700 tracking-tighter mr-6">
                    Terms and Conditions
                  </span>
                </Link>
                <Link href="/contact">
                  <span className="uppercase border-b border-gray-700 tracking-tighter">
                    Contact
                  </span>
                </Link>
              </div>
            </div>
          </div>
          {/* Assuming that you want the image to take full width on mobile */}
          {/* <div className="order-1 lg:order-2 w-full md:w-1/2 ">
            <Image
              src="/images/logoDrawing.png"
              alt="Product screenshot"
              className="border-b border-black md:border-none object-cover h-[30vh] lg:h-auto"
              width={1000}
              height={1000}
              priority
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
          </div> */}
        </div>
      </div>
    </div>
  );
}
