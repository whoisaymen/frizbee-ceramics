'use client';
import Image from 'next/image';
import ProductForm from './ProductForm';

export default function ProductPageContent({ product }) {
	return (
		<div className='flex flex-col items-center justify-center w-11/12 max-w-6xl mx-auto space-y-8 md:flex-row md:items-start md:space-y-0 md:space-x-4 lg:space-x-8'>
			<div className='w-full max-w-md overflow-hidden bg-white border shadow-lg rounded-2xl md:w-1/2'>
				<div className='relative w-full h-96'>
					<Image
						src={product.images.edges[0].node.url}
						alt={product.images.edges[0].node.altText}
						fill
						style
						className='w-full h-auto'
						priority
					/>
				</div>
			</div>
			<ProductForm product={product} />
		</div>
	);
}
