'use client';
import Image from 'next/image';
import ProductForm from './ProductForm';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import RecommendedList from './RecommendedList';

export default function ProductPageContent({ product }) {
	const images = [];

	product.images.edges.map((image, i) => {
		images.push(
			<SwiperSlide key={`slide-${i}`}>
				<Image
					src={image.node.url}
					alt={image.node.altText}
					width={500}
					height={500}
					priority
					className='h-full w-full object-cover object-center'
				/>
			</SwiperSlide>
		);
	});

	return (
		<div className='max-w-7xl mx-auto border border-black'>
			<div className='flex flex-col items-center justify-center mx-auto md:flex-row md:items-stretch'>
				<div className='w-full overflow-hidden bg-white md:w-1/2 md:border-black md:border-r '>
					<div className='relative w-full h-[50vh]'>
						<Swiper
							style={{ '--swiper-navigation-color': '#000', '--swiper-pagination-color': '#000' }}
							navigation
							pagination={{ clickable: true }}
							className='h-full'
							loop='true'
							modules={[Navigation, Pagination]}
						>
							{images}
						</Swiper>
					</div>
				</div>
				<div className='flex flex-1'>
					<ProductForm product={product} />
				</div>
			</div>

			{/* <p className='w-11/12 max-w-3xl pt-16 mx-auto space-y-8 md:space-x-4 lg:space-x-8'>{product.description}</p> */}
			{/*
			<RecommendedList current={product.id} products={product.collections.edges[0].node.products.edges} /> */}
		</div>
	);
}
