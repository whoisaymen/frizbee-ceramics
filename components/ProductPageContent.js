"use client";
import Image from "next/image";
import ProductForm from "./ProductForm";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

export default function ProductPageContent({ product, blurDataURL }) {
  const mediaSwiper = [];
  const mediaItems = product.media.edges;

  mediaItems.map((mediaItem, i) => {
    if (mediaItem.node.sources) {
      // This is a video
      const videoSource = mediaItem.node.sources.find(source => 
        source.mimeType === "video/mp4" && source.url.includes("HD")
      ) || mediaItem.node.sources[0];

      mediaSwiper.push(
        <SwiperSlide key={`slide-${i}`} className="relative">
          <div className="w-full h-full flex items-center justify-center bg-black">
            <video
              autoPlay
              loop
              muted
              className="h-full w-full object-cover object-center"
              poster={mediaItem.node.previewImage?.url}
            >
              <source src={videoSource.url} type={videoSource.mimeType} />
              Your browser does not support the video tag.
            </video>
          </div>
        </SwiperSlide>
      );
    } else if (mediaItem.node.image) {

      // This is an image
      mediaSwiper.push(
        <SwiperSlide key={`slide-${i}`} className="relative">
          <Image
            src={mediaItem.node.image.url}
            alt={mediaItem.node.image.altText || "Product image"}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority={i === 0 ? true : false}
            placeholder="blur"
            blurDataURL={blurDataURL}
            className="object-cover object-center"
          />
        </SwiperSlide>
      );
    }
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
            loop={mediaSwiper.length > 2 ? true : false}
            modules={[Navigation, Pagination]}
            slidesPerView={"auto"}
            breakpoints={{
              1024: {
                slidesPerView: mediaSwiper.length > 1 ? 2 : 1,
              },
            }}
          >
            {mediaSwiper}
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
