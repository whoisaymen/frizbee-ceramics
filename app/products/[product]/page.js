import ProductPageContent from '@/components/ProductPageContent';
import { getProduct } from '@/lib/shopify';

export async function generateMetadata({ params, searchParams }, parent) {
	// fetch data
	const product = await getProduct(params.product);

	return {
		title: 'Frizbee Ceramics | ' + product.title,
	};
}

export default async function ProductPage({ params }) {
	const product = await getProduct(params.product);

	return (
		<div className=''>
			<ProductPageContent product={product} />
		</div>
	);
}
