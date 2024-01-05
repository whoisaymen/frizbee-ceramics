"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { CartContext } from "../context/shopContext";
import { getProduct } from "@/lib/shopify";

import { formatter, getColorFromTag, colorMappings } from "../utils/helpers";

const ProductCard = ({ product, index }) => {
  const { addToCart } = useContext(CartContext);
  const colorValue = getColorFromTag(product);

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

  const buttonStyle = {
    transition: "transform 0.5s ease-in-out",
  };

  const { handle, title, id } = product.node;
  const { altText, url } = product.node.images.edges[0].node;
  const price = product.node.priceRange.minVariantPrice.amount;

  const imageUrl1 = product.node.images.edges[0].node.url;
  const imageUrl2 = product.node.images.edges[1]?.node.url;
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
            width: "100%",
            height: "100%",
            objectFit: "cover",
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
          <div className="md:hidden overflow-hidden text-[12px] h-[33vh] text-center flex flex-col justify-end relative">
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
              {prepareSwiperSlides()}
              <div className="swiper-pagination -mt-4"></div>
            </Swiper>

            <div className="flex justify-between mt-4 absolute left-3 bottom-[3px]">
              <div
                className="w-1/2 blur-2xl absolute left-0 bottom-0 h-6 z-[8]"
                style={{
                  backgroundColor: colorMappings[colorValue] || "#343dfb",
                }}
              ></div>
              <span className="z-[7] tracking-tighter text-left font-bold w-full leading-none">
                {/* {title.split("-")[0]} */}
                {title}
                {/* {title.split(" ")[0]}  */}
                {/* <br />
              <span className="font-normal inline-block text-black/70 capitalize italic py-0">
                {title.split(" ")[0]}
              </span> */}
                <br />
                <span className="font-normal mt-[4px] mb-[8px] inline-block">
                  {formatter.format(price)}
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
              loading="lazy"
              className="w-full h-full object-cover object-center max-w-full"
            />

            <div className="absolute left-3 font-semibold bottom-2 flex flex-col">
              {/* <span>{title.split("-")[0]}</span> */}
              <span>{title}</span>
              <span className="font-light -mt-1">
                {formatter.format(price)}
              </span>
            </div>
          </div>
        </div>
      </Link>

      {/* Mobile Quick Buy  */}
      <div className="relative">
        {/* <span className="bg-[#eee]/30 blur-xl absolute right-0 bottom-0 h-8 w-8 z-[8] md:hidden"></span> */}
        {product.node.availableForSale ? (
          <button
            style={buttonStyle}
            className=" md:hidden absolute right-0 bottom-0 text-sm tracking-tighter font-light h-10 w-10 border-black uppercase flex items-center justify-center z-[8]"
            onClick={handleAddToCart}
            disabled={!product.node.availableForSale}
          >
            <Image
              src="/images/cartIcon.svg"
              alt="Filter"
              className="object-cover"
              priority
              width={16}
              height={16}
            />
          </button>
        ) : (
          ""
        )}
      </div>

      {/* Desktop Quick Buy REWORK */}
      <button
        style={buttonStyle}
        className={`hidden md:block md:absolute right-8 -bottom-1 translate-y-full text-sm tracking-tighter font-light group-hover:translate-y-0 bg-white p-2 pt-1 border-black rounded-t-md border-[1px] uppercase cursor- ${
          !product.node.availableForSale ? "bg-red-400 cursor-not-allowed" : ""
        }`}
        onClick={handleAddToCart}
        disabled={!product.node.availableForSale}
      >
        {product.node.availableForSale ? "Add to Cart" : "Sold Out"}
      </button>
    </motion.div>
  );
};

export default ProductCard;
