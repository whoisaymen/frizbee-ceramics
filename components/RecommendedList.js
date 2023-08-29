'use client';

import Link from 'next/link';
import ProductCard from './ProductCard';

const RecommendedList = ({ products, current }) => {
	return (
		<div className='bg-white'>
			<div className='mx-auto max-w-2xl lg:max-w-7xl'>
				<div className='md:flex md:items-center md:justify-between border-b border-t border-black'>
					<h2 className='font-light tracking-tight text-black uppercase'>Recommended products</h2>
					<Link href='#' className='hidden text-sm font-medium text-indigo-600 hover:text-indigo-500 md:block'>
						Shop the collection
						<span aria-hidden='true'> &rarr;</span>
					</Link>
				</div>

				{/* <div className='grid grid-cols-2  md:grid-cols-4'>
					{products
						.slice(0, 4)
						.map((product) => (product.node.id === current ? null : <ProductCard key={product.node.id} product={product} />))}
				</div> */}

				<div className='grid grid-cols-2 md:grid-cols-4'>
					{products.slice(0, 4).map((product, index, self) =>
						product.node.id === current ? null : (
							<div key={product.node.id} className={index < self.length - 1 ? 'border-r border-black' : ''}>
								<ProductCard product={product} />
							</div>
						)
					)}
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

export default RecommendedList;
