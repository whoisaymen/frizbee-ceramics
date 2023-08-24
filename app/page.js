// 'use client';
import ProductList from '@/components/ProductList';
import { getProductsInCollection, getAllProducts } from '@/lib/shopify';
import Hero from '@/components/Hero';

export default async function Home() {
	const products = await getProductsInCollection();
	const allProducts = await getAllProducts();
	console.log('get products in collection:', products);

	return (
		<div className='text-xl'>
			{/* <Hero /> */}
			<ProductList products={products} />
		</div>
	);
}
