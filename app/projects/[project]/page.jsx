// "use client";
import ScrollToTop from "@/components/ScrollToTop";
import projectsData from "/lib/projectsData";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getProductsForProject } from "@/lib/shopify";

export async function generateMetadata({ params }) {
  const projectDetails = projectsData.find((p) => p.id === params.project);

  return {
    title: "Project | " + (projectDetails ? projectDetails.title : "Not Found"),
  };
}

export default async function ProjectPage({ params }) {
  const products = await getProductsForProject(params.project);

  const projectDetails = projectsData.find((p) => p.id === params.project);

  if (!projectDetails) {
    return <div className="absolute left-10 top-1/4">Project not found.</div>;
  }

  return (
    <div className="bg-[#fff] font-extralight tracking-tight">
      <ScrollToTop />

      <div className="grid grid-cols-1 md:grid-cols-2 -m-[1px] h-screen">
        {projectDetails.images.slice(0, 2).map((img, index) => (
          <div
            key={img.id}
            className="border-l border-black border-b relative h-full w-full"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className={`relative h-full w-full object-cover`}
            />
          </div>
        ))}
      </div>

      {/* Second Section - Text on the Left, Image on the Right */}
      <div className="h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full mt-0 -m-[1px]">
          <div className="flex flex-col justify-start p-28 pl-10 pr-32">
            <h2 className="text-2xl lg:text-5xl font-extralight tracking-tighter mb-10 leading-snug">
              {projectDetails.title}
            </h2>
          </div>
          <div className="border-l border-t border-black relative">
            <Image
              src={projectDetails.images[2].src}
              alt={projectDetails.images[2].alt}
              // height={1000}
              // width={1000}
              fill
              className={`object-cover h-full`}

              // layout="fill"
              // objectFit="cover"
            />
          </div>
        </div>
      </div>

      <div className="h-screen border-t border-black flex items-center justify-center p-4 pr-30 max-w-6xl">
        <p className="text-xl lg:text-3xl font-extralight tracking-tighter mb-4 uppercase">
          {projectDetails.description[0]}
        </p>
      </div>

      <div className="flex flex-col justify-end h-full">
        <div className="grid grid-cols-2 lg:grid-cols-4 -mt-3 border-t border-black">
          {products.slice(0, 4).map((product, index) => (
            <ProductCard
              key={product.node.id}
              product={product}
              index={index}
            />
          ))}
        </div>
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          {projectDetails.productImages.slice(0, 4).map((image, index) => (
            <div key={image.id} className="relative w-full h-[50vh]">
              <Image
                src={image.src}
                alt={image.alt}
                // layout="fill"
                height={1000}
                width={1000}
                className={`border-t border-black border-l ${
                  index !== 1 ? "border-l" : ""
                }`}
                // objectFit="cover"
              />
            </div>
          ))}
        </div> */}
      </div>

      <div className="h-screen border-b border-black flex items-center justify-center p-4 pr-30 max-w-6xl">
        <p className="text-xl lg:text-3xl font-extralight tracking-tighter mb-4 uppercase">
          {projectDetails.description[1]}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 -m-[1px] h-screen">
        {projectDetails.images.slice(3, 5).map((img, index) => (
          <div
            key={img.id}
            className="border-l border-black border-b relative h-full w-full"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className={`relative h-full w-full object-cover`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
