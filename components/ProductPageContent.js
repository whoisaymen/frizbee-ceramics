'use client';
import Image from 'next/image';
import ProductForm from './ProductForm';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

export default function ProductPageContent({ product }) {
	const images = [];
	console.log(product.images.edges);

	product.images.edges.map((image, i) => {
		images.push(
			<SwiperSlide key={`slide-${i}`}>
				<Image
					src={image.node.url}
					alt={image.node.altText}
					height={1000}
					width={1000}
					className='h-full w-full object-cover object-center'
					priority
				/>
			</SwiperSlide>
		);
	});

	return (
		<div className='flex flex-col items-center justify-center w-11/12 max-w-6xl mx-auto space-y-8 md:flex-row md:items-start md:space-y-0 md:space-x-4 lg:space-x-8'>
			<div className='w-full max-w-md overflow-hidden bg-white border shadow-lg rounded-2xl md:w-1/2'>
				<div className='relative w-full h-96'>
					<Swiper
						style={{ '--swiper-navigation-color': '#000', '--swiper-pagination-color': '#000' }}
						navigation
						pagination={{ clickable: true }}
						className='h-96 rounded-2xl'
						loop='true'
						modules={[Navigation, Pagination]}
					>
						{images}
					</Swiper>
				</div>
			</div>
			<ProductForm product={product} />
		</div>
	);
}
