"use client";
import { cubicBezier } from "framer-motion";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useState, useContext, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { CartContext } from "../context/shopContext";

import { formatter, getColorFromTag, colorMappings } from "../utils/helpers";

import MobileQuickBuy from "./ui/MobileQuickBuy";
import DesktopQuickBuy from "./ui/DesktopQuickBuy";

// const MobileQuickBuy = dynamic(() => import("./ui/MobileQuickBuy"));
// const DesktopQuickBuy = dynamic(() => import("./ui/DesktopQuickBuy"));

const ProductCard = ({ product, index }) => {
  const { addToCart } = useContext(CartContext);
  const { handle, title, id } = product.node;
  const price = product.node.priceRange.minVariantPrice.amount;
  const compareAtPrice =
    product.node.compareAtPriceRange?.minVariantPrice.amount;
  const isAvailableForSale = product.node.availableForSale;
  const colorValue = getColorFromTag(product);
  const imageUrl1 = product.node.images.edges[0].node.url;
  const imageUrl2 = product.node.images.edges[1]?.node.url;
  const [displayImageUrl, setDisplayImageUrl] = useState(imageUrl1);

  const handleAddToCart = () => {
    const defaultVariant = product.node.variants.edges[0]?.node;
    const allOptions = {};
    defaultVariant.selectedOptions.map((item) => {
      allOptions[item.name] = item.value;
    });

    const itemToAdd = {
      id: defaultVariant.id,
      title: product.node.title,
      handle: product.node.handle,
      image: product.node.images.edges[0]?.node.url,
      variantTitle: defaultVariant.title,
      variantPrice: defaultVariant.priceV2.amount,
      variantQuantity: 1,
      options: allOptions,
    };

    if (!itemToAdd) return;
    addToCart(itemToAdd);
  };

  const SwiperSlides = () => {
    return product.node.images.edges.map((image, i) => (
      <SwiperSlide key={`mobile-slide-${i}`}>
        <Image
          src={image.node.url}
          alt="Product image"
          width={500}
          height={500}
          priority={i === 0 ? "true" : "false"}
          className="w-full h-full object-cover object-center"
        />
      </SwiperSlide>
    ));
  };

  return (
    <motion.div
      layout
      transition={{
        layout: { ease: cubicBezier(0.76, 0, 0.24, 1), duration: 1.1 },
      }}
      className={`group border-gray-800 border-b relative overflow-hidden ${
        index % 2 === 0 ? "border-r" : ""
      } ${(index + 1) % 3 !== 0 ? "md:border-r" : "md:border-r-0"} ${
        (index + 1) % 4 !== 0 ? "lg:border-r" : "lg:border-r-0"
      } ${(index + 1) % 5 !== 0 ? "xl:border-r" : "xl:border-r-0"} ${
        (index + 1) % 6 !== 0 ? "2xl:border-r" : "2xl:border-r-0"
      }`}
      key={id}
    >
      <Link href={`/products/${handle}`} className="custom-cursor relative">
        <div
          className="group"
          onMouseEnter={() => setDisplayImageUrl(imageUrl2 || imageUrl1)}
          onMouseLeave={() => setDisplayImageUrl(imageUrl1)}
        >
          {/* Mobile Product Card */}
          <div className="md:hidden overflow-hidden text-[12px] h-[40vh] text-center flex flex-col justify-end relative">
            <Swiper
              className="w-full h-full object-cover object-center"
              modules={[Pagination]}
              pagination={{ clickable: true, el: ".swiper-pagination" }}
              style={{
                "--swiper-pagination-color": "#000",
                "--swiper-pagination-bullet-inactive-color": "#C8C8C8",
                "--swiper-pagination-bullet-inactive-opacity": "1",
                "--swiper-pagination-bullet-size": "4px",
                "--swiper-pagination-bullet-horizontal-gap": "3px",
              }}
            >
              {SwiperSlides()}
              <div className="swiper-pagination -mt- ml-6"></div>
            </Swiper>

            <div className="flex justify-between mt-4 absolute left-3 bottom-[3px]">
              <div
                className="w-1/2 blur-2xl absolute left-0 bottom-0 h-6 z-[8]"
                style={{
                  backgroundColor: colorMappings[colorValue] || "#343dfb",
                }}
              ></div>
              <span className="z-[7] tracking-tighter text-left font-bold w-full leading-none">
                {title}
                <br />
                <span className="font-normal mt-[4px] mb-[8px] inline-block">
                  {compareAtPrice && price < compareAtPrice ? (
                    <>
                      <span className="text-gray-500 line-through pr-2">
                        {formatter.format(compareAtPrice)}
                      </span>
                      {formatter.format(price)}
                    </>
                  ) : (
                    formatter.format(price)
                  )}
                </span>
              </span>
            </div>
          </div>

          {/* Desktop Product Card */}
          <div className="hidden md:block w-full overflow-hidden md:h-[24rem] bg-gray-100 relative text-sm">
            <Image
              src={displayImageUrl}
              alt={"Product Image"}
              width={500}
              height={500}
              priority
              className="w-full h-full object-cover object-center max-w-full"
            />

            <div className="absolute left-3 font-semibold bottom-2 flex flex-col">
              <span>{title}</span>
              <span className="font-light -mt-1">
                {compareAtPrice && price < compareAtPrice ? (
                  <>
                    <span className="text-gray-500 line-through pr-2">
                      {formatter.format(compareAtPrice)}
                    </span>
                    {formatter.format(price)}
                  </>
                ) : (
                  formatter.format(price)
                )}
              </span>
            </div>
          </div>
        </div>
      </Link>

      <MobileQuickBuy
        handleAddToCart={handleAddToCart}
        isAvailableForSale={isAvailableForSale}
      />

      <DesktopQuickBuy
        handleAddToCart={handleAddToCart}
        isAvailableForSale={isAvailableForSale}
      />
    </motion.div>
  );
};

export default ProductCard;
