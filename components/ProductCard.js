"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { CartContext } from "../context/shopContext";
import { getProduct } from "@/lib/shopify";

import { formatter } from "../utils/helpers";

const ProductCard = ({ product }) => {
  const [detailedProduct, setDetailedProduct] = useState(null);
  const { addToCart } = useContext(CartContext);

  const colorTag = product.node.tags.find((tag) => tag.startsWith("color:"));
  const colorValue = colorTag ? colorTag.split(":")[1] : null;

  // Color mappings
  const colorMappings = {
    acid: "#AECCD7",
    blue: "#3549A6",
    green: "#7BB97A",
    roses: "#942B50",
  };

  // Function to fetch detailed product information
  const fetchProductDetails = async () => {
    const detailedInfo = await getProduct(product.node.handle);
    setDetailedProduct(detailedInfo);
  };

  useEffect(() => {
    fetchProductDetails();
  }, []);

  // Function to handle adding product to cart
  const handleAddToCart = () => {
    if (!detailedProduct) return; // Ensure detailed product data is available

    const defaultVariant = detailedProduct.variants.edges[0].node;
    const itemToAdd = {
      id: defaultVariant.id,
      title: detailedProduct.title,
      handle: detailedProduct.handle,
      image: detailedProduct.images.edges[0]?.node.url,
      variantTitle: defaultVariant.title,
      variantPrice: defaultVariant.priceV2.amount,
      variantQuantity: 1,
      options: defaultVariant.selectedOptions.reduce((options, option) => {
        options[option.name] = option.value;
        return options;
      }, {}),
    };

    addToCart(itemToAdd);
  };
  const imageStyle = {
    maxWidth: "100%",
    height: "100%",
    objectFit: "cover",
  };

  const buttonStyle = {
    transition: "transform 0.5s ease-in-out",
    // backgroundColor: colorValue,
  };

  const { handle, title, id } = product.node;
  const { altText, url } = product.node.images.edges[0].node;
  const price = product.node.priceRange.minVariantPrice.amount;
  const color =
    product.node.tags.find((tag) => tag.startsWith("color:"))?.split(":")[1] ||
    "";

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
      className="group border border-gray-800 -m-[0.5px] relative overflow-hidden"
    >
      <Link href={`/products/${handle}`} className="custom-cursor relative">
        <div
          key={id}
          className="group"
          onMouseEnter={() => setDisplayImageUrl(imageUrl2 || imageUrl1)}
          onMouseLeave={() => setDisplayImageUrl(imageUrl1)}
        >
          {/* Mobile Product Card */}
          <div className="md:hidden overflow-hidden text-[12px] h-[18rem] text-center flex flex-col justify-end relative">
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
                {title.split("-")[0]}
                {/* {title.split(" ")[0]} */}
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
              alt={"Test"}
              width={500}
              height={500}
              loading="lazy"
              className="w-full h-full object-cover object-center"
              style={imageStyle}
            />

            <div className="absolute left-3 font-semibold bottom-2 flex flex-col">
              <span>{title.split("-")[0]}</span>
              <span className="font-light -mt-1">
                {formatter.format(price)}
              </span>
            </div>
          </div>
        </div>
      </Link>

      {/* Mobile Quick Buy  */}
      <div className="relative">
        <span className="bg-[#fbf234]/30 blur-xl absolute right-0 bottom-0 h-8 w-8 z-[8] md:hidden"></span>
        <button
          style={buttonStyle}
          className=" md:hidden absolute right-0 bottom-0 text-sm tracking-tighter font-light   h-10 w-10 border-black uppercase flex items-center justify-center z-[7] "
          onClick={handleAddToCart}
        >
          <Image
            src="/images/cartIcon.svg"
            alt="Filter"
            className="object-cover"
            width={16}
            height={16}
          />
        </button>
      </div>

      {/* Desktop Quick Buy */}
      <button
        style={buttonStyle}
        className="hidden md:block md:absolute right-8 -bottom-1   translate-y-full text-sm tracking-tighter font-light group-hover:translate-y-0 bg-white p-2 pt-1 border-black rounded-t-md border-[1px] uppercase"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </motion.div>
  );
};

export default ProductCard;
