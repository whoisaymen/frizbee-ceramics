"use client";
import Image from "next/image";
import ProductForm from "./ProductForm";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useRef } from "react";

export default function ProductPageContent({ product }) {
  const images = [];
  const imagesSwiper = [];

  product.images.edges.map((image, i) => {
    imagesSwiper.push(
      <SwiperSlide key={`slide-${i}`} style={{ width: "100%", height: "100%" }}>
        <Image
          src={image.node.url}
          // alt={image.node.altText}
          alt="Product image"
          width={500}
          height={500}
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
        width={500}
        height={500}
        priority
        className="object-center border-b border-black"
        style={{
          maxWidth: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    );
  });

  return (
    <div className="mx-auto">
      <div className="flex flex-col md:flex-row items-stretch w-full">
        <div className="w-full h-screen">
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
            pagination={{ clickable: true }}
            className="h-full w-full"
            loop="true"
            modules={[Navigation, Pagination]}
          >
            {imagesSwiper}
          </Swiper>
        </div>
        {/* Product Form */}
        <div className="z-10">
          <ProductForm product={product} />
        </div>
      </div>
    </div>
  );
}
