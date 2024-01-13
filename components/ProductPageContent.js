"use client";
import Image from "next/image";
import ProductForm from "./ProductForm";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

export default function ProductPageContent({ product, blurDataURL }) {
  const imagesSwiper = [];
  const productImages = product.images.edges;

  productImages.map((image, i) => {
    imagesSwiper.push(
      <SwiperSlide key={`slide-${i}`} className="relative">
        <Image
          src={image.node.url}
          alt="Product image"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority={i === 0 ? "true" : "false"}
          placeholder="blur"
          blurDataURL={blurDataURL}
          className="object-cover object-center"
        />
      </SwiperSlide>
    );
  });

  return (
    <div className="mx-auto">
      <div className="flex flex-row items-stretch w-full">
        {/* Product Swiper */}
        <div className={`w-full h-[calc(100svh-24px)]`}>
          <Swiper
            style={{
              "--swiper-navigation-color": "#000",
              "--swiper-pagination-color": "#000",
            }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            className="h-full w-full"
            loop={imagesSwiper.length > 2 ? true : false}
            modules={[Navigation, Pagination]}
            slidesPerView={"auto"}
            breakpoints={{
              1024: {
                slidesPerView: imagesSwiper.length > 1 ? 2 : 1,
              },
            }}
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
