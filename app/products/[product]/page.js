import { getAllProducts, getProduct } from '@/lib/shopify';

export default async function ProductPage({ params }) {
	const product = await getProduct(params.product);

	return <div>{product.title}</div>;
}
