"use client";
import Image from "next/image";
import ProductForm from "./ProductForm";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Suspense, useState } from "react";
import { ProductPageImageSkeleton } from "./Skeleton";

export default function ProductPageContent({ product, base64 }) {
  const [loaded, setLoaded] = useState(false);

  const imagesSwiper = [];

  product.images.edges.map((image, i) => {
    imagesSwiper.push(
      <SwiperSlide key={`slide-${i}`} className="w-full h-full relative">
        <Image
          src={image.node.url}
          alt="Product image"
          fill
          sizes="100vw"
          className="object-cover w-full h-full object-center"
          onLoad={() => setLoaded(true)}
        />
        {!loaded && <ProductPageImageSkeleton />}
      </SwiperSlide>
    );
  });

  return (
    <div className="mx-auto">
      <div className="flex flex-row items-stretch w-full">
        <div className={`w-full h-[calc(100svh-24px)]`}>
          <Suspense>
            <Swiper
              style={{
                "--swiper-navigation-color": "#000",
                "--swiper-pagination-color": "#000",
              }}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              className="h-full"
              loop="true"
              modules={[Navigation, Pagination]}
            >
              {imagesSwiper}
            </Swiper>
          </Suspense>
        </div>

        {/* Product Form */}
        <div className="z-[7]">
          <ProductForm product={product} />
        </div>
      </div>
    </div>
  );
}
