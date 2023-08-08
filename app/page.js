'use client';
import ProductList from '@/components/ProductList';
import Nav from '@/components/Nav';
import { getProductsInCollection } from '@/lib/shopify';
import Image from 'next/image';

export default async function Home() {
	const products = await getProductsInCollection();

	return (
		<div className='text-xl'>
			<ProductList products={products} />
		</div>
	);
}
