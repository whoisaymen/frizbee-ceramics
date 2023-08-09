'use client';
import ProductList from '@/components/ProductList';
import Nav from '@/components/Nav';
import { getProductsInCollection } from '@/lib/shopify';
import Image from 'next/image';
import Hero from '@/components/Hero';

export default async function Home() {
	const products = await getProductsInCollection();

	return (
		<div className='text-xl'>
			<Hero />
			<ProductList products={products} />
		</div>
	);
}
