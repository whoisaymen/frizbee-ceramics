import ScrollToTop from "@/components/ScrollToTop";
import Link from "next/link";
import Image from "next/image";

const images = [
  "/images/about/img1.jpg",
  "/images/about/img2.jpg",
  "/images/about/img3.JPG",
  "/images/about/img4.jpg",
];
export default function AboutPage() {
  return (
    <div className="bg-white font-extralight tracking-tight min-h-screen">
      <ScrollToTop />

      <div className="mx-auto">
        <div className="flex flex-col md:flex-row justify-center items-center">
          <div className="order-2 lg:order-1 w-full">
            <div className="text-sm lg:text-lg columns-2 gap-x-[20px] p-10 mt-40 mb-10">
              {/* <h2 className='uppercase mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>About</h2> */}
              {/* <Image src='/images/sun.png' height={1000} width={1000} className='w-auto mx-auto z-50' alt='Frizbee Ceramics logo'></Image> */}
              {/* <p className="text-gray-900 tracking-tighter mb-10">
                <strong className="text-xl tracking-tighter">
                  <span className="font-black">FRIZBEE CERAMICS</span> offers a
                  high-end handcrafted porcelain tableware collection.
                </strong>
              </p> */}
              <p className="text-gray-900 tracking-tighter font-normal mb-2">
                FRIZBEE CERAMICS offers a high-end handcrafted porcelain
                tableware collection.
              </p>
              <p className="text-gray-700 mb-2">
                The brand’s cups, bowls, plates, planters and homeware often
                include nostalgic visuals like aliens and distorted smileys.
                Each item is casted using premium-quality porcelain and glazed
                by hand. While unique in design the collection remains true to
                FRIZBEE CERAMICS’ core philosophy of durability and
                functionality. FRIZBEE CERAMICS adds a youthful charm and zest
                to modern kitchen and homeware with its evocative and offbeat
                designs.
              </p>
              <p className="text-gray-700 mb-2">
                Currently the brand is presented at over 40 stores/cafés, and in
                more than 15 countries. Since the launch, FRIZBEE CERAMICS has
                worked in a variety of contexts. Through collaborations,
                exhibitions and performances with fashion brands, museums, art
                galleries and artists.
              </p>
              <p className="text-gray-700 mb-2">
                Frizbee Ceramics’ line ranges from tiny shot glasses to large
                serving dishes and is 100% dishwasher safe!
              </p>
              <p className="text-gray-700">
                Please reach out for special requests, studio visits and custom
                orders at{" "}
                <span className="font-medium">hey@frizbeeceramics.com</span>.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-end h-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          {images.map((image, index) => (
            <div key={image.id} className="relative w-full h-[50vh]">
              <Image
                src={image}
                alt={"Image"}
                layout="fill"
                className={`border-t border-black border-l ${
                  index !== 1 ? "border-l" : ""
                }`}
                objectFit="cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
