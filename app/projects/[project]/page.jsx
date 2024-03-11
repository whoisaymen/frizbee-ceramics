// "use client";

import projectsData from "/lib/projectsData";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getProductsForProject } from "@/lib/shopify";
import img1 from "/public/images/projects/a-box-is-a-box/img1.jpg";
import img2 from "/public/images/projects/a-box-is-a-box/img2.png";
import screenshot1 from "/public/images/projects/a-box-is-a-box/screenshot1.png";
import screenshot2 from "/public/images/projects/a-box-is-a-box/screenshot2.png";
import ProjectPageSwiper from "@/components/ui/ProjectPageSwiper";

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
      <div className="grid grid-cols-1 xl:grid-cols-3 min-h-screen mt-0 -m-[1px]">
        <div className="col-span-2 xl:order-2 border-l border-black border-b relative h-[60vh] xl:h-full w-full">
          <ProjectPageSwiper images={projectDetails.images} />
        </div>
        <div className="flex flex-col justify-between pt-14 xl:pt-28 pb-10 px-10">
          <div>
            <h2 className="text-2xl xl:text-5xl font-extralight tracking-tighter mb-10 leading-snug">
              {projectDetails.title}
            </h2>
            <p className="text-md lg:text-lg font-extralight tracking-tighter mb-8 max-w-6xl">
              {projectDetails.description[0]}
            </p>
            <p className="text-md lg:text-lg font-extralight tracking-tighter mb-8 max-w-6xl">
              {projectDetails.description[1]}
            </p>
          </div>
          <h2 className="uppercase text-md lg:text-lg tracking-tighter">
            Capsule collection below
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-black mb-[24px] md:mb-[28px]">
        {products.slice(0, 4).map((product, index) => (
          <ProductCard key={product.node.id} product={product} index={index} />
        ))}
      </div>
    </div>
  );
}
