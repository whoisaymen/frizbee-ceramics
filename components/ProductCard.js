import Image from 'next/image';
import Link from 'next/link';
import { formatter } from '@/utils/helpers';

const ProductCard = ({ product }) => {
	const { handle, title, id } = product.node;
	const { altText, url } = product.node.images.edges[0].node;
	const price = product.node.priceRange.minVariantPrice.amount;

	return (
		<div key={id} className='group relative'>
			<div className='h-56 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-72 xl:h-80'>
				<Image src={url} alt={altText} width={500} height={500} priority className='h-full w-full object-cover object-center' />
			</div>
			<h3 className='mt-4 text-sm text-gray-700'>
				<Link href={`/products/${handle}`}>
					<span className='absolute inset-0' />
					{title}
				</Link>
			</h3>
			{/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
			<p className='mt-1 text-sm font-medium text-gray-900'>{formatter.format(price)}</p>
		</div>
	);
};

export default ProductCard;
