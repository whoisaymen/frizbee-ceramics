"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useContext, useEffect, Suspense } from "react";
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

  const imageStyle = {
    maxWidth: "100%",
    height: "100%",
    objectFit: "cover",
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

  // const prepareSwiperSlides = () => {
  //   const images = product.node.images.edges;

  //   return images.map((image, i) => (
  //     <SwiperSlide key={`mobile-slide-${i}`}>
  //       <Image
  //         src={image.node.url}
  //         alt="Product image"
  //         width={500}
  //         height={500}
  //         loading="lazy"
  //         className="w-full h-full object-cover object-center"
  //         style={{
  //           width: "100%",
  //           height: "100%",
  //           objectFit: "cover",
  //         }}
  //       />
  //     </SwiperSlide>
  //   ));
  // };

  // console.log(product.node, "product.node");

  return (
    <div
      // layout
      // initial={{ opacity: 0 }}
      // animate={{ opacity: 1 }}
      // exit={{ opacity: 0 }}
      className={`group border-gray-600 border-b relative overflow-hidden ${
        index % 2 === 0 ? "border-r" : ""
      } ${(index + 1) % 3 !== 0 ? "md:border-r" : "md:border-r-0"} ${
        (index + 1) % 4 !== 0 ? "lg:border-r" : "lg:border-r-0"
      } ${(index + 1) % 5 !== 0 ? "xl:border-r" : "xl:border-r-0"} ${
        (index + 1) % 6 !== 0 ? "2xl:border-r" : "2xl:border-r-0"
      }`}
    >
      <div className="w-full overflow-hidden text-[0.70rem] md:text-sm h-[18rem] md:h-[49vh] bg-gray-100 relative text-sm text-gray-500">
        <Link href={`/products/${handle}`} className="custom-cursor">
          <Image
            src={displayImageUrl}
            alt={"Product image"}
            width={500}
            height={500}
            loading="lazy"
            // priority
            className="w-full h-full object-cover object-center max-w-full"
            onMouseEnter={() => setDisplayImageUrl(imageUrl2 || imageUrl1)}
            onMouseLeave={() => setDisplayImageUrl(imageUrl1)}
          />

          <div className="absolute left-4 font-semibold bottom-2 flex flex-col z-[7]">
            <div
              className="md:hidden w-1/2 blur-2xl absolute left-0 bottom-0 h-6 z-[8]"
              style={{
                backgroundColor: colorMappings[colorValue] || "#343dfb",
              }}
            ></div>
            <span className="tracking-tighter leading-none mb-2 font-light text-[0.80rem] md:text-[1rem] text-gray-800">
              {title.split("-")[0]}
            </span>
            <span className="tracking-tighter leading-none mb-1 text-xs font-extralight">
              {title.split("-")[1]}
            </span>
          </div>
          <div className="absolute right-3 font-semibold bottom-2 flex flex-col z-[7]">
            <span className="font-light">{formatter.format(price)}</span>
          </div>
        </Link>
        {!product.node.availableForSale && (
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-black"></div>
        )}
      </div>

      {/* Mobile Quick Buy  */}
      <div className="relative">
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
        className={`hidden md:block md:absolute right-8 -bottom-1 translate-y-full text-sm tracking-tighter font-light group-hover:translate-y-0 bg-white p-2 pt-1 border-black rounded-t-md border-[1px] uppercase z-[8] cursor- ${
          !product.node.availableForSale ? "bg-red-400 cursor-not-allowed" : ""
        }`}
        onClick={handleAddToCart}
        disabled={!product.node.availableForSale}
      >
        {product.node.availableForSale ? "Add to Cart" : "Sold Out"}
      </button>
    </div>
  );
};

export default ProductCard;
