"use client";
import ScrollToTop from "@/components/ScrollToTop";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ProjectsPage() {
  // Define your projects data, including text and images
  const projects = [
    // First section - two images side by side
    {
      id: 1,
      src: "/images/projects/carne/plate2.jpg",
      alt: "Carne X Frizbee Plate",
    },
    {
      id: 2,
      src: "/images/projects/carne/motif.jpg",
      alt: "Carne X Frizbee Motif",
    },
    // Second section - text on the left, image on the right
    {
      id: 3,
      content: "CARNE X FRIZBEE",
      description:
        "Cheer up your dining table with the creative aesthetic of CARNE BOLLENTE.  Established in 2014, Parisian fashion brand CARNE BOLLENTE collaborates with FRIZBEE Ceramics",
    },
    {
      id: 4,
      src: "/images/projects/carne/plate3.jpg",
      alt: "Carne X Frizbee Collaboration",
    },
    // ... add more projects as needed
  ];

  const textBlocks = [
    {
      id: 1,
      title: "Go to Carne Bollante",
      content:
        "Cheer up your dining table with the creative aesthetic of Carne Bollente.Established in 2014, Parisian fashion brand Carne Bollente collaborates with.",
    },
    {
      id: 2,
      title: "Second Text Block Title",
      content:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
  ];

  const productImages = [
    { id: 1, src: "/images/projects/carne/product1.jpg", alt: "Product 1" },
    { id: 2, src: "/images/projects/carne/plate1.jpg", alt: "Product 2" },
    { id: 3, src: "/images/projects/carne/product2.jpg", alt: "Product 3" },
    { id: 4, src: "/images/projects/carne/product3.jpg", alt: "Product 4" },
    { id: 5, src: "/images/projects/carne/product5.jpg", alt: "Product 4" },
    { id: 6, src: "/images/projects/carne/product6.jpg", alt: "Product 4" },
    { id: 7, src: "/images/projects/carne/product7.jpg", alt: "Product 4" },
    { id: 8, src: "/images/projects/carne/product8.jpg", alt: "Product 4" },
  ];

  return (
    <div className="bg-[#fff] font-extralight tracking-tight overflow-y-scroll snap-y snap-mandatory h-screen">
      <ScrollToTop />

      <div className="snap-start h-screen">
        {/* Projects Grid - First Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 h-screen -m-[1px]">
          {projects.slice(0, 2).map((project) => (
            <div key={project.id} className="relative border-l border-white">
              <Image
                src={project.src}
                alt={project.alt}
                layout="fill"
                objectFit="cover"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="snap-start h-screen">
        {/* Projects Grid - Second Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 h-screen mt-0 ml-[1px]">
          {/* Text block on the left */}
          <div className="flex items-start justify-start p-4 mt-12">
            <div>
              <h2 className="text-4xl font-normal tracking-tight  mb-4">
                {projects[2].content}
              </h2>
              {/* <p>{projects[2].description}</p> */}
            </div>
          </div>

          {/* Image on the right */}
          <div className="relative border-l border-black">
            <Image
              src={projects[3].src}
              alt={projects[3].alt}
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      </div>

      <div className="snap-start h-screen">
        {/* Third Section - Two Text Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-1 h-screen gap-4">
          {/* Left Text Block */}
          <div className="flex items-start justify-start p-4 pr-80 mt-64 w-3/4">
            <div>
              <p className="uppercase text-4xl font-normal tracking-tight  mb-4">
                {textBlocks[0].content}
              </p>
              <h2 className="border-b border-black uppercase inline-block mt-4">
                {textBlocks[0].title}
              </h2>
            </div>
          </div>

          {/* Right Text Block */}
          {/* <div className="flex items-center justify-center p-10">
          <div>
            <h2 className="text-2xl font-bold mb-4">{textBlocks[1].title}</h2>
            <p>{textBlocks[1].content}</p>
          </div>
        </div> */}
        </div>
      </div>

      <div className="snap-start h-screen">
        {/* Fourth Section - Product Images Row */}
        <div className="flex flex-col justify-end h-full">
          {" "}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {productImages.slice(0, 4).map((image) => (
              <div key={image.id} className="relative w-full h-[50vh]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="snap-start h-screen">
        {/* Fourth Section - Product Images Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 h-screen">
          {productImages.slice(4, 8).map((image) => (
            <div key={image.id} className="relative w-full h-[50vh]">
              <Image
                src={image.src}
                alt={image.alt}
                layout="fill"
                objectFit="cover"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="snap-start h-screen">
        {/* Fifth Section - Full Width Rotating Image */}
        <div className="relative w-full h-screen flex justify-center items-center">
          <motion.div
            style={{ width: "900px", height: "900px" }} // Set the size of the rotating element
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Image
              src="/images/projects/carne/rotatingplate.jpg"
              alt="Rotating Plate"
              layout="fixed" // Use 'fixed' layout for specific width and height
              width={1000}
              height={1000}
              objectFit="contain" // Adjust this as needed
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
