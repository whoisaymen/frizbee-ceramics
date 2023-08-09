'use client';

import Link from 'next/link';
import ProductCard from './ProductCard';

const ProductList = ({ products }) => {
	return (
		<div className='bg-white'>
			<div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
				<div className='md:flex md:items-center md:justify-between'>
					<h2 className='text-2xl font-bold tracking-tight text-gray-900'>Trending products</h2>
					<Link href='#' className='hidden text-sm font-medium text-indigo-600 hover:text-indigo-500 md:block'>
						Shop the collection
						<span aria-hidden='true'> &rarr;</span>
					</Link>
				</div>

				<div className='mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8'>
					{products.slice(0, 4).map((product) => (
						<ProductCard key={product.node.id} product={product} />
					))}
				</div>

				<div className='mt-8 text-sm md:hidden'>
					<Link href='#' className='font-medium text-indigo-600 hover:text-indigo-500'>
						Shop the collection
						<span aria-hidden='true'> &rarr;</span>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ProductList;
