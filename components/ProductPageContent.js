"use client";
import Image from "next/image";
import ProductForm from "./ProductForm";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useState, useEffect } from "react";

export default function ProductPageContent({ product, blurDataURL }) {
  const imagesSwiper = [];
  const base64 = blurDataURL;
  const src = product.images.edges[0].node.url;

  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(window.innerHeight);
  }, []);

  // product.images.edges.map((image, i) => {
  //   console.log(image);
  //   imagesSwiper.push(
  //     <SwiperSlide key={`slide-${i}`} style={{ width: "100%", height: "100%" }}>
  //       <Image
  //         src={image.node.url}
  //         alt={image.node.altText}
  //         // alt="Product image"
  //         fill
  //         // sizes="100vw"
  //         // priority
  //         className="object-cover w-full h-full object-center"
  //         // placeholder="blur"
  //         // blurDataURL={base64}
  //         style={{
  //           maxWidth: "100%",
  //           height: "100%",
  //         }}
  //       />
  //     </SwiperSlide>
  //   );
  // });

  return (
    <div className="mx-auto">
      <div className="flex flex-row items-stretch w-full">
        <div
          className={`w-full`}
          style={{ height: `calc(${height}px - 24px)` }}
        >
          <Swiper
            style={{
              "--swiper-navigation-color": "#000",
              "--swiper-pagination-color": "#000",
            }}
            navigation={{
              nextEl: ".swiper-button-prev",
              prevEl: ".swiper-button-next",
            }}
            className="h-full"
            loop="true"
            modules={[Navigation, Pagination]}
          >
            {/* {imagesSwiper} */}

            {product.images.edges.map((image, i) => {
              return (
                <SwiperSlide
                  key={`slide-${i}`}
                  style={{ width: "100%", height: "100%" }}
                >
                  {/* <div className="relative"> */}
                  <Image
                    src={image.node.url}
                    alt={image.node.altText}
                    // alt="Product image"
                    fill
                    // sizes="100vw"
                    // priority
                    className="object-cover w-full h-full object-center"
                    placeholder="blur"
                    blurDataURL={base64}
                    // style={{
                    //   maxWidth: "100%",
                    //   height: "100%",
                    // }}
                  />
                  {/* </div> */}
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* <Image
            src={src}
            fill
            alt="image"
            placeholder="blur"
            priority
            blurDataURL={base64}
          /> */}
        </div>
        {/* Product Form */}
        <div className="z-[7]">
          <ProductForm product={product} />
        </div>
      </div>
    </div>
  );
}
