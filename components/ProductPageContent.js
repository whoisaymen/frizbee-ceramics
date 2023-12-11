"use client";
import Image from "next/image";
import ProductForm from "./ProductForm";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useState, useEffect } from "react";

export default function ProductPageContent({ product }) {
  const images = [];
  const imagesSwiper = [];

  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(window.innerHeight);
  }, []);

  product.images.edges.map((image, i) => {
    imagesSwiper.push(
      <SwiperSlide key={`slide-${i}`} style={{ width: "100%", height: "100%" }}>
        <Image
          src={image.node.url}
          // alt={image.node.altText}
          alt="Product image"
          width={2000}
          height={2000}
          priority
          className="object-cover w-full h-full object-center"
          style={{
            maxWidth: "100%",
            height: "100%",
          }}
        />
      </SwiperSlide>
    );
  });

  product.images.edges.map((image, i) => {
    images.push(
      <Image
        src={image.node.url}
        // alt={image.node.altText}
        key={`${i}`}
        alt="Product image"
        width={2000}
        height={2000}
        // priority
        className="object-center border-b border-black"
        style={{
          maxWidth: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      />
    );
  });

  return (
    <div className="mx-auto">
      <div className="flex flex-row items-stretch w-full">
        <div
          className={`w-full`}
          style={{ height: `calc(${height}px - 24px)` }}
        >
          <Swiper
            // ref={swiperRef}
            style={{
              "--swiper-navigation-color": "#000",
              "--swiper-pagination-color": "#000",
            }}
            navigation={{
              nextEl: ".swiper-button-prev",
              prevEl: ".swiper-button-next",
            }}
            // pagination={{ clickable: true }}
            className="h-full"
            loop="true"
            modules={[Navigation, Pagination]}
          >
            {imagesSwiper}
          </Swiper>
        </div>
        {/* Product Form */}
        <div className="z-[7]">
          <ProductForm product={product} />
        </div>
      </div>
    </div>
  );
}
