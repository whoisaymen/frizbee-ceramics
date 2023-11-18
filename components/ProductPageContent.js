"use client";
import Image from "next/image";
import ProductForm from "./ProductForm";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import RecommendedList from "./RecommendedList";

export default function ProductPageContent({ product }) {
  const images = [];
  const imagesSwiper = [];

  product.images.edges.map((image, i) => {
    imagesSwiper.push(
      <SwiperSlide key={`slide-${i}`}>
        <Image
          src={image.node.url}
          // alt={image.node.altText}
          alt="Product image"
          width={500}
          height={500}
          priority
          className="h-full w-full object-cover object-center"
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
        className="h-full w-full object-cover object-center border-b border-black"
      />
    );
  });

  return (
    // <div className="mx-auto">
    //   <div className="flex flex-col items-center justify-center mx-auto md:flex-row md:items-stretch">
    //     <div className="w-full overflow-hidden bg-white md:w-1/3">
    //       <div className="hidden md:block relative w-full h-[55vh] lg:h-screen">
    //         <Swiper
    //           style={{
    //             "--swiper-navigation-color": "#000",
    //             "--swiper-pagination-color": "#000",
    //           }}
    //           navigation
    //           pagination={{ clickable: true }}
    //           className="h-full"
    //           loop="true"
    //           modules={[Navigation, Pagination]}
    //         >
    //           {imagesSwiper}
    //         </Swiper>
    //       </div>
    //     </div>
    //     <div className="md:hidden relative w-full">{images}</div>
    //     <div className="flex flex-1 w-full bg-gray-100">
    //       <ProductForm product={product} />
    //     </div>
    //   </div>

    // <div className="mx-auto">
    //   <div className="flex flex-col md:flex-row items-center justify-center mx-auto md:items-stretch">
    //     {/* Main image container */}
    //     <div className="w-full md:w-1/3 overflow-hidden bg-white">
    //       <div className="relative w-full h-[55vh] lg:h-screen">
    //         <Image
    //           src={product.images.edges[0].node.url}
    //           alt="Main Product image"
    //           width={500}
    //           height={500}
    //           priority
    //           className="h-full w-full object-cover object-center"
    //         />
    //       </div>
    //     </div>

    //     {/* Secondary images container */}
    //     <div className="w-full md:w-2/3">
    //       <div className="flex flex-wrap">
    //         {product.images.edges.slice(1).map((image, i) => (
    //           <div
    //             key={`secondary-${i}`}
    //             className="w-full md:w-1/2 h-[27.5vh] lg:h-[42.5vh]"
    //           >
    //             <Image
    //               src={image.node.url}
    //               alt={`Product image ${i + 2}`}
    //               width={500} // Adjust width as necessary
    //               height={250} // Adjust height as necessary
    //               priority
    //               className="w-full h-full object-cover object-center"
    //             />
    //           </div>
    //         ))}
    //       </div>
    //     </div>

    //     {/* Product Form */}
    //     <div className="flex flex-1 w-full bg-gray-100">
    //       <ProductForm product={product} />
    //     </div>
    //   </div>

    <div className="mx-auto">
      <div className="flex flex-col md:flex-row items-stretch w-full">
        {/* Images container */}
        <div className="w-full h-screen flex flex-row flex-wrap">
          {product.images.edges.map((image, i) => {
            const numImages = product.images.edges.length;
            const widthPercentage = 100 / numImages;
            const widthClass = `w-[${widthPercentage}%]`;

            return (
              <div key={`image-${i}`} className={`${widthClass} h-full`}>
                <Image
                  src={image.node.url}
                  alt={`Product image ${i + 1}`}
                  layout="fill"
                  objectFit="cover"
                  priority
                />
              </div>
            );
          })}
        </div>

        {/* Product Form */}
        <div className="w-full">
          <ProductForm product={product} />
        </div>
      </div>

      {/* <p className='w-11/12 max-w-3xl pt-16 mx-auto space-y-8 md:space-x-4 lg:space-x-8'>{product.description}</p> */}
      {/*
			<RecommendedList current={product.id} products={product.collections.edges[0].node.products.edges} /> */}
    </div>
  );
}
