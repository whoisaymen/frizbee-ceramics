'use client'
import { cubicBezier } from 'framer-motion'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useState, useContext, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import { CartContext } from '../context/shopContext'

import { formatter, getColorFromTag, colorMappings } from '../utils/helpers'

import MobileQuickBuy from './ui/MobileQuickBuy'
import DesktopQuickBuy from './ui/DesktopQuickBuy'

// const MobileQuickBuy = dynamic(() => import("./ui/MobileQuickBuy"));
// const DesktopQuickBuy = dynamic(() => import("./ui/DesktopQuickBuy"));

const ProductCard = ({ product, index }) => {
  const { addToCart } = useContext(CartContext);
  const { handle, title, id } = product.node;
  const price = product.node.priceRange.minVariantPrice.amount;
  const compareAtPrice = product.node.compareAtPriceRange?.minVariantPrice.amount;
  const isAvailableForSale = product.node.availableForSale;
  const colorValue = getColorFromTag(product);
  
  // Get images and video
  const mediaItems = product.node.media.edges;
  const imageUrl1 = mediaItems[0]?.node.image?.url;
  const imageUrl2 = mediaItems[1]?.node.image?.url;
  const video = mediaItems.find(edge => edge.node.sources)?.node;
  

  const handleAddToCart = () => {
    const defaultVariant = product.node.variants.edges[0]?.node
    const allOptions = {}
    defaultVariant.selectedOptions.map((item) => {
      allOptions[item.name] = item.value
    })

    const itemToAdd = {
      id: defaultVariant.id,
      title: product.node.title,
      handle: product.node.handle,
      image: product.node.images.edges[0]?.node.url,
      variantTitle: defaultVariant.title,
      variantPrice: defaultVariant.priceV2.amount,
      variantQuantity: 1,
      options: allOptions,
    }

    if (!itemToAdd) return
    addToCart(itemToAdd)
  }

  const SwiperSlides = () => {
    return mediaItems.map((mediaItem, i) => {
      if (mediaItem.node.sources) {
        // This is a video
        const videoSource = mediaItem.node.sources.find(source => 
          source.mimeType === "video/mp4" && source.url.includes("HD")
        ) || mediaItem.node.sources[0];
          return <SwiperSlide key={`slide-${i}`} className="relative">
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
      } else if (mediaItem.node.image) {
  
        // This is an image
        return <SwiperSlide key={`slide-${i}`} className="relative">
            <Image
              src={mediaItem.node.image.url}
              alt={mediaItem.node.image.altText || "Product image"}
              width={300}
              height={300}
              // priority={i === 0 ? 'true' : 'false'}
              loading='lazy'
              className='w-full h-full object-cover object-center'
            />
          </SwiperSlide>
      }
    });
  }
  
  const [displayMedia, setDisplayMedia] = useState({
    type: 'IMAGE',
    content: imageUrl1
  });

  const handleMouseEnter = () => {
    if (video) {
      // Find the MP4 video source with the highest quality
      const videoSource = video.sources.find(source => 
        source.mimeType === "video/mp4" && source.url.includes("HD")
      ) || video.sources[0];
      
      setDisplayMedia({
        type: 'VIDEO',
        content: videoSource.url
      });
    } else if (imageUrl2) {
      setDisplayMedia({
        type: 'IMAGE',
        content: imageUrl2
      });
    }
  };


  const handleMouseLeave = () => {
    setDisplayMedia({
      type: 'IMAGE',
      content: imageUrl1
    });
  };

  return (
    <motion.div
      layout
      transition={{
        layout: { ease: cubicBezier(0.76, 0, 0.24, 1), duration: 1.1 },
      }}
      className={`group border-gray-800 border-b relative overflow-hidden ${
        index % 2 === 0 ? 'border-r' : ''
      } ${(index + 1) % 3 !== 0 ? 'md:border-r' : 'md:border-r-0'} ${
        (index + 1) % 4 !== 0 ? 'lg:border-r' : 'lg:border-r-0'
      } ${(index + 1) % 5 !== 0 ? 'xl:border-r' : 'xl:border-r-0'} ${
        (index + 1) % 6 !== 0 ? '2xl:border-r' : '2xl:border-r-0'
      }`}
      key={id}
    >
      <Link href={`/products/${handle}`} className="custom-cursor relative">
        <div
          className="group"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Mobile Product Card */}
          <div className='md:hidden overflow-hidden text-[12px] h-[40vh] text-center flex flex-col justify-end relative'>
            <Swiper
              className='w-full h-full object-cover object-center'
              modules={[Pagination]}
              pagination={{ clickable: true, el: '.swiper-pagination' }}
              style={{
                '--swiper-pagination-color': '#000',
                '--swiper-pagination-bullet-inactive-color': '#C8C8C8',
                '--swiper-pagination-bullet-inactive-opacity': '1',
                '--swiper-pagination-bullet-size': '4px',
                '--swiper-pagination-bullet-horizontal-gap': '3px',
              }}
            >
              {SwiperSlides()}
              <div className='swiper-pagination -mt- ml-6'></div>
            </Swiper>

            <div className='flex justify-between mt-4 absolute left-3 bottom-[3px]'>
              <div
                className='w-1/2 blur-2xl absolute left-0 bottom-0 h-6 z-[8]'
                style={{
                  backgroundColor: colorMappings[colorValue] || '#343dfb',
                }}
              ></div>
              <span className='z-[7] tracking-tighter text-left font-bold w-full leading-none'>
                {title}
                <br />
                <span className='font-normal mt-[4px] mb-[8px] inline-block'>
                  {compareAtPrice && price < compareAtPrice ? (
                    <>
                      <span className='text-gray-500 line-through pr-2'>
                        {formatter.format(compareAtPrice)}
                      </span>
                      {formatter.format(price)}
                    </>
                  ) : (
                    formatter.format(price)
                  )}
                </span>
              </span>
            </div>
          </div>

          {/* Desktop Product Card */}
          <div className="hidden md:block w-full overflow-hidden md:h-[24rem] bg-gray-100 relative text-sm">
            {displayMedia.type === 'VIDEO' ? (
              <video
                src={displayMedia.content}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover object-center"
              />
            ) : (
              <Image
                src={displayMedia.content}
                alt={"Product Image"}
                width={500}
                height={500}
                priority
                className="w-full h-full object-cover object-center max-w-full"
              />
            )}
            <div className="absolute left-3 font-semibold bottom-2 flex flex-col">
              <div
                className='w-1/2 blur-2xl absolute left-0 bottom-0 h-6 z-[8]'
                style={{
                  backgroundColor: colorMappings[colorValue] || '#343dfb',
                }}
              ></div>
              <span>{title}</span>
              <span className='font-light -mt-1'>
                {compareAtPrice && price < compareAtPrice ? (
                  <>
                    <span className='text-gray-500 line-through pr-2'>
                      {formatter.format(compareAtPrice)}
                    </span>
                    {formatter.format(price)}
                  </>
                ) : (
                  formatter.format(price)
                )}
              </span>
            </div>
          </div>
        </div>
      </Link>

      <MobileQuickBuy
        handleAddToCart={handleAddToCart}
        isAvailableForSale={isAvailableForSale}
      />

      <DesktopQuickBuy
        handleAddToCart={handleAddToCart}
        isAvailableForSale={isAvailableForSale}
      />
    </motion.div>
  )
}

export default ProductCard
