import ScrollToTop from "@/components/ScrollToTop";
import Link from "next/link";
import Image from "next/image";

const images = [
  "/images/about/img1.jpg",
  "/images/about/img2.jpg",
  "/images/about/img3.jpg",
  "/images/about/img4.jpg",
  "/images/about/img1.jpg",
  "/images/about/img2.jpg",
  "/images/about/img3.jpg",
  "/images/about/img4.jpg",
];
export default function AboutPage() {
  return (
    <div className="bg-white font-extralight tracking-tight min-h-[100vh] flex flex-col justify-between items-center pt-10">
      <ScrollToTop />

      <div className="w-full h-auto">
        <div className="text-sm lg:text-lg columns-1 md:columns-2 gap-x-[20px] p-10 mt-20 sm:mt-32 mb-4">
          <p className="text-gray-900 tracking-tighter font-normal mb-2">
            FRIZBEE CERAMICS offers a high-end handcrafted porcelain tableware
            collection.
          </p>
          <p className="text-gray-700 mb-2">
            The brand’s cups, bowls, plates, planters and homeware often include
            nostalgic visuals like aliens and distorted smileys. Each item is
            casted using premium-quality porcelain and glazed by hand. While
            unique in design the collection remains true to FRIZBEE CERAMICS’
            core philosophy of durability and functionality. FRIZBEE CERAMICS
            adds a youthful charm and zest to modern kitchen and homeware with
            its evocative and offbeat designs.
          </p>
          <p className="text-gray-700 mb-2">
            Currently the brand is presented at over 40 stores/cafés, and in
            more than 15 countries. Since the launch, FRIZBEE CERAMICS has
            worked in a variety of contexts. Through collaborations, exhibitions
            and performances with fashion brands, museums, art galleries and
            artists.
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
      <div className="w-full overflow-x-auto h-1/2">
        <ul className="flex animate-carousel gap-0">
          {images.map((image, index) => (
            <li
              key={`${image}-${index + 1}`}
              className="relative h-[40vh] max-h-[555px] w-2/3 max-w-[475px] flex-none md:w-1/3"
            >
              <div className="relative h-full w-full">
                <div className="group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600 dark:bg-black">
                  <Image
                    src={image}
                    alt={"Image " + (index + 1)}
                    layout="fill"
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                    className="relative h-full w-full object-cover transition duration-300 ease-in-out group-hover:scale-105 border-t border-black border-r"
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
