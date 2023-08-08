import ProductPageContent from '@/components/ProductPageContent';
import { getProduct } from '@/lib/shopify';

export default async function ProductPage({ params }) {
	const product = await getProduct(params.product);

	return (
		<div className='min-h-screen py-12 sm:pt-20'>
			<ProductPageContent product={product} />
		</div>
	);
}
