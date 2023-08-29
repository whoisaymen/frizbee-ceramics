'use client';
import { useState, useEffect, useContext } from 'react';
import { formatter } from '../utils/helpers';
import ProductOptions from './ProductOptions';
import { CartContext } from '../context/shopContext';
import axios from 'axios';
import useSWR from 'swr';

// setup inventory fetcher
const fetchInventory = (url, id) =>
	axios
		.get(url, {
			params: {
				id: id,
			},
		})
		.then((res) => res.data);

export default function ProductForm({ product }) {
	const { data: productInventory } = useSWR(`/api/available/${product.handle}`, (url, id) => fetchInventory(url, id), {
		errorRetryCount: 3,
	});

	const [available, setAvailable] = useState(true);

	const { addToCart } = useContext(CartContext);

	const allVariantOptions = product.variants.edges?.map((variant) => {
		const allOptions = {};

		variant.node.selectedOptions.map((item) => {
			allOptions[item.name] = item.value;
		});

		return {
			id: variant.node.id,
			title: product.title,
			handle: product.handle,
			image: variant.node.image?.url,
			options: allOptions,
			variantTitle: variant.node.title,
			variantPrice: variant.node.priceV2.amount,
			variantQuantity: 1,
		};
	});

	const defaultValues = {};
	product.options.map((item) => {
		defaultValues[item.name] = item.values[0];
	});

	const [selectedVariant, setSelectedVariant] = useState(allVariantOptions[0]);
	const [selectedOptions, setSelectedOptions] = useState(defaultValues);

	function setOptions(name, value) {
		setSelectedOptions((prevState) => {
			return { ...prevState, [name]: value };
		});

		const selection = {
			...selectedOptions,
			[name]: value,
		};

		allVariantOptions.map((item) => {
			if (JSON.stringify(item.options) === JSON.stringify(selection)) {
				setSelectedVariant(item);
			}
		});
	}

	useEffect(() => {
		if (productInventory) {
			const checkAvailable = productInventory?.variants.edges.filter((item) => item.node.id === selectedVariant.id);

			if (checkAvailable[0]?.node.availableForSale) {
				setAvailable(true);
			} else {
				setAvailable(false);
			}
		}
	}, [productInventory, selectedVariant]);

	return (
		<div>
			<div className='bg-gradient-to-b from-[#B0AAEF]/30 mb-4 px-4 py-2 border-t border-black lg:border-none'>
				<h2 className='text-lg lg:text-2xl font-bold lg:mt-10'>{product.title}</h2>
				<span className='pb-3'>{formatter.format(product.variants.edges[0].node.priceV2.amount)}</span>
			</div>
			<div className='flex flex-col w-full p-4 md:w-1/2 self-end'>
				<p className='text-sm font-extralight lg:text-md tracking-tight mb-4'>{product.description}</p>
				{available ? (
					<button
						onClick={() => {
							addToCart(selectedVariant);
						}}
						className='px-2 py-3 mt-3 text-black border-[1px] border-black uppercase font-light tracking-tight mb-4'
					>
						Add To Card
					</button>
				) : (
					<button className='px-2 py-3 mt-3 text-white bg-gray-800 rounded-lg cursor-not-allowed mb-4'>Sold out!</button>
				)}
			</div>
		</div>
	);
}
