"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { formatter } from "../utils/helpers";

const ProductCard = ({ product }) => {
  const imageStyle = {
    maxWidth: "100%",
    height: "100%", // Ensure the image takes the full height
    objectFit: "cover", // Adjust the image to cover the area of the container
  };

  const { handle, title, id } = product.node;
  const { altText, url } = product.node.images.edges[0].node;
  const price = product.node.priceRange.minVariantPrice.amount;
  const color =
    product.node.tags.find((tag) => tag.startsWith("color:"))?.split(":")[1] ||
    "";

  const imageUrl1 = product.node.images.edges[0].node.url;
  const imageUrl2 = product.node.images.edges[1]?.node.url; // second image, if available

  const [displayImageUrl, setDisplayImageUrl] = useState(imageUrl1);

  const prepareSwiperSlides = () => {
    return product.node.images.edges.map((image, i) => (
      <SwiperSlide key={`mobile-slide-${i}`}>
        <Image
          src={image.node.url}
          alt="Product image"
          width={500}
          height={500}
          loading="lazy"
          className="w-full h-full object-cover object-center"
          style={{
            maxWidth: "100%",
            height: "100%",
            objectFit: "contain",
            // mixBlendMode: "multiply",
          }}
        />
      </SwiperSlide>
    ));
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="border border-black -m-[0.5px]"
    >
      <Link href={`/products/${handle}`} className="custom-cursor relative">
        <div
          key={id}
          className="group relative"
          onMouseEnter={() => setDisplayImageUrl(imageUrl2 || imageUrl1)}
          onMouseLeave={() => setDisplayImageUrl(imageUrl1)}
        >
          {/* Mobile Only Slider */}
          <div className="md:hidden relative w-full h-[18rem] overflow-hidden bg-gray-100 text-[12px]">
            <Swiper className="h-full -mt-4">{prepareSwiperSlides()}</Swiper>
            <span className="absolute bottom-4 left-[30%] z-10 tracking-tighter text-center font-semibold">
              {title.split("-")[1]}
              <br />{" "}
              <span className="italic font-normal">{title.split(" ")[0]}</span>
              <br />{" "}
              <span className="font-light border border-black/90 px-2">
                {" "}
                {formatter.format(price)}
              </span>
            </span>
          </div>
          <div className="hidden md:block w-full overflow-hidden h-80 md:h-[24rem] bg-gray-100 relative text-sm">
            <Image
              src={displayImageUrl}
              alt={"Test"}
              width={500}
              height={500}
              loading="lazy"
              className="w-full h-full object-cover object-center"
              style={imageStyle} // Apply the adjusted styles here
            />
            <div className="absolute left-3 font-semibold bottom-2 flex flex-col">
              <span>{title.split(" ")[0]}</span>
              <span className="font-light -mt-1">
                {formatter.format(price)}
              </span>
            </div>
          </div>
          {/* <div className="bg-white flex justify-between items-center p-2 py-1 tracking-tighter font-extralight text-xs lg:text-base border-black border-t">
            <div className="text-black text-left truncate pr-3">
              <span>{title}</span>
            </div>
            <div className="text-black text-right font-extralight">
              <span>{formatter.format(price)}</span>
            </div>
          </div> */}
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
