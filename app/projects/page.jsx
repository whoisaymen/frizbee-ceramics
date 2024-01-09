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
      src: "/images/projects/carne/motif.jpeg",
      alt: "Carne X Frizbee Motif",
    },
    // Second section - text on the left, image on the right
    {
      id: 3,
      title: "CARNE BOLLENTE X FRIZBEE",
      description: `Carne Bollente is a free and independent Paris-based brand established in 2015, focusing on the relation between sex and positivity to allow people to embrace their own sexuality and kinks through their clothes. By pairing straightforward streetwear staples with scenic sex illustrations that manage to cover a wide scope of sexual taboos without verging on the problematic, we inject irreverence and provocation into no-frills basics.`,
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
            <div
              key={project.id}
              className="relative border-l border-black border-b"
            >
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

      <div className="snap-start h-screen border-b border-black relative">
        <div className="grid grid-cols-1 md:grid-cols-2 h-screen mt-0 -m-[1px]">
          <div className="flex flex-col justify-start p-28 pl-10 pr-32">
            <h2 className="text-4xl lg:text-5xl font-extralight tracking-tighter  mb-10 leading-snug">
              {projects[2].title.split("X")[0]}
            </h2>
          </div>
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
        <div className="relative w-full h-screen flex justify-center items-center p-30">
          <motion.div
            style={{ width: "859px", height: "859px" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Image
              src="/images/projects/carne/rotating-plate.png"
              alt="Rotating Plate"
              layout="fixed"
              width={1000}
              height={1000}
              objectFit="contain"
            />
          </motion.div>
        </div>
      </div>

      <div className="snap-start h-screen border-b border-black border-t">
        <div className="grid grid-cols-1 md:grid-cols-2 h-screen relative -m-[1px]">
          <div className="flex items-start justify-start p-4 pr-30 absolute left-10 top-1/3 max-w-6xl">
            <div>
              <p className="text-3xl font-extralight tracking-tighter mb-4 uppercase">
                {projects[2].description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="snap-start h-screen">
        <div className="flex flex-col justify-end h-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
            {productImages.slice(0, 4).map((image, index) => (
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

      <div className="snap-start h-screen">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-0 h-screen border-t border-black">
          {productImages.slice(4, 8).map((image, index) => (
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
      </div>
    </div>
  );
}
