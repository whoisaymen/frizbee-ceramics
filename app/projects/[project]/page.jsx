// "use client";
import ScrollToTop from "@/components/ScrollToTop";
import projectsData from "/lib/projectsData";
import Image from "next/image";
import Link from "next/link";
// import { motion } from "framer-motion";

export async function generateMetadata({ params }) {
  const projectDetails = projectsData.find((p) => p.id === params.project);

  return {
    title: "Project | " + (projectDetails ? projectDetails.title : "Not Found"),
  };
}

export default function ProjectPage({ params }) {
  const projectDetails = projectsData.find((p) => p.id === params.project);

  if (!projectDetails) {
    return <div className="absolute left-10 top-1/4">Project not found.</div>;
  }

  return (
    <div className="bg-[#fff] font-extralight tracking-tight overflow-y-scroll snap-y snap-mandatory h-screen">
      <ScrollToTop />

      {/* First Section - Two Images Side by Side */}
      <div className="snap-start h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 h-screen -m-[1px]">
          {projectDetails.images.slice(0, 2).map((img) => (
            <div
              key={img.id}
              className="relative border-l border-black border-b"
            >
              <Image
                src={img.src}
                alt={img.alt}
                layout="fill"
                objectFit="cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Second Section - Text on the Left, Image on the Right */}
      <div className="snap-start h-screen border-b border-black relative">
        <div className="grid grid-cols-1 md:grid-cols-2 h-screen mt-0 -m-[1px]">
          <div className="flex flex-col justify-start p-28 pl-10 pr-32">
            <h2 className="text-4xl lg:text-5xl font-extralight tracking-tighter mb-10 leading-snug">
              {projectDetails.title.split("X")[0]}
            </h2>
          </div>
          <div className="relative border-l border-black">
            <Image
              src={projectDetails.images[2].src}
              alt={projectDetails.images[2].alt}
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      </div>

      <div className="snap-start h-screen border-b border-black border-t">
        <div className="grid grid-cols-1 md:grid-cols-2 h-screen relative -m-[1px]">
          <div className="flex items-start justify-start p-4 pr-30 absolute left-10 top-1/3 max-w-6xl">
            <div>
              <p className="text-3xl font-extralight tracking-tighter mb-4 uppercase">
                {projectDetails.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Rotating Image */}
      {/* <div className="snap-start h-screen">
        <div className="relative w-full h-screen flex justify-center items-center p-30">
          <motion.div
            style={{ width: "859px", height: "859px" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Image
              src={projectDetails.rotatingImage.src}
              alt={projectDetails.rotatingImage.alt}
              layout="fixed"
              width={1000}
              height={1000}
              objectFit="contain"
            />
          </motion.div>
        </div>
      </div> */}

      {/* First Product Images Section at the Bottom */}
      <div className="snap-start h-screen">
        <div className="flex flex-col justify-end h-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
            {projectDetails.productImages.slice(0, 4).map((image, index) => (
              <div key={image.id} className="relative w-full h-[50vh]">
                <Image
                  src={image.src}
                  alt={image.alt}
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

      {/* Second Product Images Section at the Top */}
      <div className="snap-start h-screen relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-0 h-screen border-t border-black">
          {projectDetails.productImages.slice(4, 8).map((image, index) => (
            <div key={image.id} className="relative w-full h-[50vh]">
              <Image
                src={image.src}
                alt={image.alt}
                layout="fill"
                objectFit="cover"
                className={`border-black border-l border-b ${
                  index !== 4 ? "border-l" : ""
                }`}
              />
            </div>
          ))}
        </div>
        <div className="absolute right-[5%] bottom-[10%]">
          <Link
            href={projectDetails.website}
            className="w-full text-2xl inline-block cursor-pointer uppercase tracking-tighter custom-cursor border-b border-black"
          >
            Visit {projectDetails.title.split("X")[0]}
          </Link>
        </div>
      </div>
    </div>
  );
}
