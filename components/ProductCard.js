import Image from 'next/image';
import Link from 'next/link';
import { formatter } from '@/utils/helpers';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
	const { handle, title, id } = product.node;
	const { altText, url } = product.node.images.edges[0].node;
	const price = product.node.priceRange.minVariantPrice.amount;
	const color = product.node.tags.find((tag) => tag.startsWith('color:'))?.split(':')[1] || '';

	return (
		<motion.div
			layout // This prop enables automatic animation on layout changes
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className='border border-black -m-[0.5px]'
		>
			<div key={id} className='group relative'>
				<div className='w-full overflow-hidden h-64 bg-gray-100 relative'>
					<Link href={`/products/${handle}`}>
						<Image src={url} alt={'Test'} width={500} height={500} loading='lazy' className='h-full w-full object-cover object-center' />
					</Link>
					{/* <div className='absolute bottom-0 left-0 p-2 text-black text-xs uppercase font-bold'>
						<p className='mt-1'>{title}</p>
						<p className='font-medium'>{formatter.format(price)}</p>
					</div> */}
					{/* <div className='absolute top-0 left-0 p-1 uppercase'>
						<span className='inline-flex items-center gap-x-1.5 rounded-md bg-white px-1.5 py-0.5 text-xs font-light text-blue-900'>
							<svg className='h-1.5 w-1.5 fill-blue-900' viewBox='0 0 6 6' aria-hidden='true'>
								<circle cx={3} cy={3} r={3} />
							</svg>
							{color}
						</span>
					</div> */}
				</div>
				{/* <h3 className='mt-4 text-sm text-gray-700'>
				<Link href={`/products/${handle}`}>
					<span className='absolute inset-0' />
					{title}
				</Link>
			</h3> */}
				{/* <p className='mt-1 text-sm text-gray-500'>{color}</p> */}
				{/* <p className='mt-1 text-sm font-medium text-gray-900'>{formatter.format(price)}</p> */}
			</div>
		</motion.div>
	);
};

export default ProductCard;
