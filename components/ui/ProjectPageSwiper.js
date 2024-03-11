"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";

const ProjectPageSwiper = ({ images }) => {
  return (
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
      loop={true}
      modules={[Navigation, Pagination, Autoplay]}
      slidesPerView={1}
      autoplay={{
        delay: 2000, // Adjust the delay between slides (in milliseconds)
        disableOnInteraction: false, // Autoplay won't be disabled after user interactions
      }}
      breakpoints={{
        640: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
      }}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index} className="relative">
          <Image
            src={image.src}
            alt={`Image ${index + 1}`}
            fill
            // placeholder="blur"
            className={`object-cover h-full w-full`}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProjectPageSwiper;
