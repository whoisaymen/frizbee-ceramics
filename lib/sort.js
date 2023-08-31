export default async function Home() {
	const products = await getProductsInCollection();
	// console.log('get products in collection:', products);

	const [sortOption, setSortOption] = useState(null);
	const sortedProducts = sortProducts(products, sortOption);

	return (
		<div className='text-xl'>
			{/* <Hero /> */}
			<ProductList products={products} />
		</div>
	);
}
