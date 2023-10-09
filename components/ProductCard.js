"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { formatter } from "../utils/helpers";

const ProductCard = ({ product }) => {
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
          <div className="md:hidden relative w-full h-80 overflow-hidden bg-gray-100">
            <Swiper className="h-full">{prepareSwiperSlides()}</Swiper>
            {/* <span className="absolute bottom-1 left-1 z-10 tracking-tighter font-bold text-xs">
              {title}
            </span> */}
          </div>
          <div className="hidden md:block w-full overflow-hidden h-80 md:h-[36rem] bg-gray-100 relative">
            <Image
              src={displayImageUrl}
              alt={"Test"}
              width={500}
              height={500}
              loading="lazy"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute left-5  font-semibold bottom-4 flex flex-col">
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
