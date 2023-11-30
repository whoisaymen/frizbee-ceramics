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
  const colorValue = colorTag ? colorTag.split(":")[1] : "defaultColor";

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
      className="group border border-black -m-[0.5px] relative overflow-hidden"
    >
      <Link href={`/products/${handle}`} className="custom-cursor relative">
        <div
          key={id}
          className="group"
          onMouseEnter={() => setDisplayImageUrl(imageUrl2 || imageUrl1)}
          onMouseLeave={() => setDisplayImageUrl(imageUrl1)}
        >
          {/* Mobile Only Slider */}
          <div className="md:hidden h-[16rem] overflow-hidden bg-gray-100 text-[12px] text-center flex flex-col justify-end ml-2">
            <Swiper
              className="w-full"
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
              <div className="swiper-pagination"></div>
            </Swiper>

            <div className="flex justify-between">
              {" "}
              <span className="z-10 tracking-tighter text-left font-extrabold w-full">
                {title.split("-")[1]}
                {/* <br />
              <span className="font-normal inline-block text-black/70 capitalize italic py-0">
                {title.split(" ")[0]}
              </span> */}
                <br />
                <span className="font-normal mt-0 inline-block">
                  {formatter.format(price)}
                </span>
              </span>
              <button
                style={buttonStyle}
                className=" md:hidden text-sm tracking-tighter font-light  bg-gradient-to-b from-white h-8 w-8 border-black border-l border-t uppercase flex items-center justify-center"
                onClick={handleAddToCart}
              >
                <Image
                  src="/images/cartIcon.svg"
                  alt="Filter"
                  className="object-cover"
                  width={14}
                  height={14}
                />
              </button>
            </div>
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
        </div>
      </Link>
      {/* Centered '+' button for mobile views */}
      {/* <div className="flex justify-center md:hidden mt-0">
        <span className="border-t  border-black  w-full text-center text-sm flex items-center justify-center tracking-tighter">
          {formatter.format(price)}
        </span>
        <span
          className="text-xl font-extralight border-t border-l border-black px-1"
          onClick={handleAddToCart}
        >
          +
        </span>
      </div> */}

      {/* <div className="hidden md:absolute md:right-3 font-semibold md:bottom-2 md:flex flex-col text-right">
        <span className="text-4xl font-medium" onClick={handleAddToCart}>
          +
        </span>
      </div> */}
      {/* <button
        style={buttonStyle}
        className=" md:hidden absolute right-2 -bottom-1  text-sm tracking-tighter font-light  bg-white p-2 pt-1 border-black rounded-t-md border-[1px] uppercase"
        onClick={handleAddToCart}
      >
        <Image src="/images/cartIcon.svg" alt="Filter" width={14} height={14} />
      </button> */}
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
