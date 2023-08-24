'use client';

import Link from 'next/link';
import ProductCard from './ProductCard';

const ProductList = ({ products }) => {
	return (
		<div className='bg-white'>
			<div className='mx-auto max-w-7xl'>
				<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-[1px] bg-black'>
					{products.map((product) => (
						<ProductCard key={product.node.id} product={product} />
					))}
				</div>
			</div>
		</div>
	);
};

export default ProductList;
