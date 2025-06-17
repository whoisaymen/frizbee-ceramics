"use client";
import Image from "next/image";
import ProductForm from "./ProductForm";
import { SwiperSlide } from "swiper/react";
import { useRef, useState } from "react";
import { Swiper } from "swiper/react";
import "swiper/css";

export default function ProductPageContent({ product, blurDataURL }) {
  const [zoomedMedia, setZoomedMedia] = useState(null);
  const mediaRef = useRef(null);
  const swiperRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  // const prevImage = () => {
  //   setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  // };

  const prevImage = () => {
    const isMobile = window.innerWidth < 1024;
    if (isMobile) {
      if (swiperRef.current) swiperRef.current.slidePrev();
    } else {
      setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }
  };

  // const nextImage = () => {
  //   setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  // };

  const nextImage = () => {
    const isMobile = window.innerWidth < 1024;
    if (isMobile) {
      if (swiperRef.current) swiperRef.current.slideNext();
    } else {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }
  };

  const handleMouseMove = (e) => {
    const el = mediaRef.current;
    if (!el) return;

    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 20;
    const y = (e.clientY - top - height / 2) / 20;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };

  const handleMouseLeave = () => {
    const el = mediaRef.current;
    if (el) el.style.transform = "translate(0px, 0px)";
  };

  const handleZoom = (type, src) => {
    setZoomedMedia({ type, src });
    document.body.classList.add("screen-locked");
  };

  const handleCloseZoom = () => {
    setZoomedMedia(null);
    document.body.classList.remove("screen-locked");
  };

  const mediaSwiper = [];
  const mediaItems = product.media.edges;

  // Separate videos and images
  const videos = mediaItems.filter((item) => item.node.sources);
  const images = mediaItems.filter(
    (item) => item.node.image && !item.node.sources
  );

  mediaItems.map((mediaItem, i) => {
    if (mediaItem.node.sources) {
      // This is a video
      const videoSource =
        mediaItem.node.sources.find(
          (source) =>
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
    <>
      <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between w-full min-h-screen px-4 ">
        {/* LEFT: Video Container (dynamic or fallback) */}

        <div className="lg:static absolute flex top-[88px] right-[18px] z-[2] lg:w-[200px] lg:flex-col lg:items-center">
          {videos.length > 0 &&
            videos.map((videoItem, i) => {
              const source =
                videoItem.node.sources.find(
                  (src) =>
                    src.mimeType === "video/mp4" && src.url.includes("HD")
                ) || videoItem.node.sources[0];

              return (
                <video
                  key={`video-${i}`}
                  playsInline
                  loop
                  autoPlay
                  muted
                  preload="metadata"
                  poster={videoItem.node.previewImage?.url}
                  onClick={() => handleZoom("video", source.url)}
                  // className="h-[140px] object-cover cursor-zoom-in lg:mt-0 mt-16 lg:w-[200px] lg:h-auto lg:object-contain lg:shadow-md "
                  className="h-[200px] mt-[2rem] object-cover cursor-zoom-in lg:mt-0 
                lg:w-[200px] lg:h-[298px] lg:object-contain"
                >
                  <source src={source.url} type={source.mimeType} />
                  Your browser does not support the video tag.
                </video>
              );
            })}
        </div>

        {/* CENTER */}
        <div className="hidden lg:flex items-center justify-center lg:items-center lg:justify-center lg:w-full  lg:max-w-[580px] xl:max-w-[650px] 2xl:max-w-[1000px]">
          <button
            onClick={prevImage}
            aria-label="Previous Image"
            className="p-2"
          >
            <Image
              src="/images/arrowLeft.svg"
              alt="Previous"
              width={24}
              height={24}
            />
          </button>

          {images.length > 0 && (
            <div
              className="relative w-full h-[65vh] lg:relative lg:h-[75vh] lg:w-full "
              onClick={() =>
                handleZoom("image", images[currentIndex].node.image.url)
              }
            >
              <Image
                src={`${images[currentIndex].node.image.url}`}
                alt={images[currentIndex].node.image.altText || "Product image"}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                placeholder="blur"
                blurDataURL={blurDataURL}
                className="object-contain cursor-zoom-in"
              />
            </div>
          )}

          <button onClick={nextImage} aria-label="Next Image" className="p-2">
            <Image
              src="/images/arrowRight.svg"
              alt="Next"
              width={24}
              height={24}
            />
          </button>
        </div>

        {/* Mobile CENTER*/}
        {images.length > 0 && (
          <div className="flex lg:hidden items-center justify-center w-full h-[85vh]">
            <Swiper
              spaceBetween={10}
              slidesPerView={1}
              loop={true}
              onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)}
              className="w-full h-full"
              onSwiper={(swiper) => (swiperRef.current = swiper)}
            >
              {images.map((imgItem, i) => (
                <SwiperSlide key={`mobile-img-${i}`}>
                  <div
                    className="relative w-full h-full"
                    onClick={() => handleZoom("image", imgItem.node.image.url)}
                  >
                    <Image
                      src={imgItem.node.image.url}
                      alt={imgItem.node.image.altText || "Product image"}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      placeholder="blur"
                      blurDataURL={blurDataURL}
                      className="object-contain cursor-zoom-in"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        {/* RIGHT: Sticky Form */}
        <div className="hidden lg:flex w-full lg:w-[264px] shrink-0 border border-black lg:mb-0 mb-16 lg:min-h-[298px]">
          <ProductForm product={product} />
        </div>

        {/* Mobile RIGHT */}
        <div className="flex items-center lg:hidden absolute bottom-12 left-1/2 transform -translate-x-1/2 w-full z-[1]">
          <button
            onClick={prevImage}
            aria-label="Previous Image"
            className="p-2"
          >
            <Image
              src="/images/arrowLeft.svg"
              alt="Previous"
              width={32}
              height={32}
            />
          </button>

          <div className="flex w-auto border border-black ">
            <ProductForm product={product} />
          </div>

          <button onClick={nextImage} aria-label="Next Image" className="p-2">
            <Image
              src="/images/arrowRight.svg"
              alt="Next"
              width={32}
              height={32}
            />
          </button>
        </div>

        {/* ZOOMED MEDIA*/}
        {zoomedMedia && (
          <div
            className="fixed inset-0 z-[99999] bg-white flex items-center justify-center cursor-zoom-out"
            onClick={handleCloseZoom}
            onMouseMove={
              zoomedMedia.type === "image" ? handleMouseMove : undefined
            }
            onMouseLeave={
              zoomedMedia.type === "image" ? handleMouseLeave : undefined
            }
          >
            {zoomedMedia.type === "image" ? (
              <img
                ref={mediaRef}
                src={zoomedMedia.src}
                alt="Zoomed"
                className="transition-transform duration-75 ease-out object-contain max-w-full max-h-full"
              />
            ) : (
              <video
                ref={mediaRef}
                src={zoomedMedia.src}
                autoPlay
                loop
                muted
                playsInline
                className="max-w-full max-h-full object-contain"
              />
            )}
          </div>
        )}
      </div>
    </>
  );
}
