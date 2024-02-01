// "use client";
import ScrollToTop from "@/components/ScrollToTop";
import projectsData from "/lib/projectsData";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getProductsForProject } from "@/lib/shopify";
import img1 from "/public/images/projects/a-box-is-a-box/img1.jpg";
import img2 from "/public/images/projects/a-box-is-a-box/img2.png";
import screenshot1 from "/public/images/projects/a-box-is-a-box/screenshot1.png";
import screenshot2 from "/public/images/projects/a-box-is-a-box/screenshot2.png";

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
      <div className="grid grid-cols-1 md:grid-cols-2 -m-[1px] h-screen">
        <div className="hidden md:block  border-l border-black border-b relative h-full w-full">
          <Image
            src={img1}
            alt="A Box is a Box"
            fill
            placeholder="blur"
            className={`relative h-full w-full object-cover`}
          />
        </div>
        <div className="border-l border-black border-b relative h-full w-full">
          <Image
            src={img2}
            alt="A Box is a Box"
            fill
            placeholder="blur"
            className={`relative h-full w-full object-cover`}
          />
        </div>
      </div>

      <div className="h-screen hidden md:block">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full mt-0 -m-[1px]">
          <div className="flex flex-col justify-start p-28 pl-10 pr-32">
            <h2 className="text-2xl lg:text-5xl font-extralight tracking-tighter mb-10 leading-snug">
              {projectDetails.title}
            </h2>
          </div>
          <div className="border-l border-t border-black relative">
            <Image
              src={projectDetails.images[2].src}
              alt="A Box is a Box"
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

      <div className="h-screen border-t border-black flex items-center justify-center p-4 pr-30 w-full">
        <p className="text-xl lg:text-3xl font-extralight tracking-tighter mb-4 uppercase  max-w-6xl">
          {projectDetails.description[0]}
        </p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 -mt-3 border-t border-black">
        {products.slice(0, 4).map((product, index) => (
          <ProductCard key={product.node.id} product={product} index={index} />
        ))}
      </div>

      <div className="h-screen flex items-center justify-center p-4 pr-30 w-full">
        <p className="text-xl lg:text-3xl font-extralight tracking-tighter mb-4 uppercase  max-w-6xl">
          {projectDetails.description[1]}
        </p>
      </div>

      <div className="h-auto md:flex w-full">
        <Image
          src={screenshot1}
          alt="A Box is a Box"
          height={1000}
          width={1000}
          placeholder="blur"
          className={`h-full w-full lg:w-1/2 object-contain`}
        />

        <Image
          src={screenshot2}
          alt="A Box is a Box"
          height={1000}
          width={1000}
          placeholder="blur"
          className={`h-full w-full lg:w-1/2 object-contain`}
        />
      </div>
    </div>
  );
}
