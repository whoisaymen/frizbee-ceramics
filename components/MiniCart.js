'use client';
import { Fragment, useContext, useRef, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { formatter } from '../utils/helpers';
import { CartContext } from '@/context/shopContext';
import useHeaderHeight from '@/hooks/useHeaderHeight';
useHeaderHeight;

export default function MiniCart({ cart }) {
	const cancelButtonRef = useRef();
	const { cartOpen, setCartOpen, checkoutUrl, removeCartItem, clearCart, cartLoading, incrementCartItem, decrementCartItem } =
		useContext(CartContext);

	let cartTotal = 0;
	cart.map((item) => {
		cartTotal += item?.variantPrice * item?.variantQuantity;
	});

	const headerHeight = useHeaderHeight();

	return (
		<Transition.Root show={cartOpen} as={Fragment}>
			<Dialog
				initialFocus={cancelButtonRef}
				as='div'
				className='fixed inset-0 z-50 overflow-hidden'
				onClose={() => {
					setCartOpen(!cartOpen);
				}}
			>
				<div className='absolute inset-0 overflow-hidden'>
					<Transition.Child
						as={Fragment}
						enter='ease-in-out duration-500'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='ease-in-out duration-500'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<Dialog.Overlay className='absolute inset-0 transition-opacity lg:bg-gray-500/75' />
					</Transition.Child>

					<div className={`fixed inset-y-0 right-0 md:top-0 flex w-full lg:max-w-full`} style={{ top: `${headerHeight}px` }}>
						<Transition.Child
							as={Fragment}
							enter='transform transition ease-in-out duration-500 sm:duration-700'
							enterFrom='translate-x-full'
							enterTo='translate-x-0'
							leave='transform transition ease-in-out duration-500 sm:duration-700'
							leaveFrom='translate-x-0'
							leaveTo='translate-x-full'
						>
							<div className='w-full'>
								<div className='flex flex-col h-full overflow-y-scroll bg-white shadow-xl'>
									<div className='flex items-start justify-between bg-[#AAEFB1] px-4 py-2 overflow-y-auto sm:px-6'>
										<Dialog.Title className='font-medium text-gray-900 text-base tracking-tighter'>Shopping cart</Dialog.Title>
										<div className='flex items-center ml-3 h-7'>
											<button
												ref={cancelButtonRef}
												type='button'
												className='p-1 -m-2 text-gray-800 hover:text-gray-500 outline-none'
												onClick={() => setCartOpen(false)}
											>
												<span className='sr-only'>Close panel</span>
												<XMarkIcon className='w-6 h-6' aria-hidden='true' />
											</button>
										</div>
									</div>
									<div className='flex-1 px-4 py-2 overflow-y-auto sm:px-6'>
										<div className='mt-2'>
											<div className='flow-root'>
												{cart.length > 0 ? (
													<ul role='list' className='-my-6 divide-y divide-gray-900'>
														{cart.map((product) => (
															<li key={product.id + Math.random()} className='relative flex py-6'>
																<div
																	className={`top-0 left-0 right-0 z-50 w-full h-full absolute ${
																		cartLoading ? 'bg-white opacity-60' : 'hidden'
																	}`}
																></div>
																<div className='relative flex-shrink-0 w-24 h-24 overflow-hidden border border-gray-900'>
																	<Image
																		src={product.image}
																		alt={product.title}
																		width={500}
																		height={500}
																		priority
																		className='h-full w-full object-cover object-center'
																	/>
																</div>

																<div className='flex flex-col flex-1 ml-4'>
																	<div>
																		<div className='flex justify-between text-sm font-medium text-gray-900 tracking-tighter leading-[18px] '>
																			<h3>
																				<Link href={`/products/${product.handle}`} passHref>
																					<span onClick={() => setCartOpen(false)}>{product.title}</span>
																				</Link>
																			</h3>
																			<p className='ml-4'>{formatter.format(product.variantPrice)}</p>
																		</div>
																	</div>
																	<div className='flex items-end justify-between flex-1 text-sm'>
																		{/* <p className="text-gray-500">Qty {product.variantQuantity}</p> */}
																		<div className={`border`}>
																			<button className='px-2' onClick={() => decrementCartItem(product)} disabled={cartLoading}>
																				-
																			</button>
																			<span className='px-2 border-l border-r'>{product.variantQuantity}</span>
																			<button className='px-2' onClick={() => incrementCartItem(product)} disabled={cartLoading}>
																				+
																			</button>
																		</div>
																		<div className='flex'>
																			<button
																				onClick={() => removeCartItem(product.id)}
																				type='button'
																				className='font-medium text-gray-500 hover:text-gray-600'
																				disabled={cartLoading}
																			>
																				Remove
																			</button>
																		</div>
																	</div>
																</div>
															</li>
														))}
													</ul>
												) : (
													<div>
														<p className='text-sm tracking-tight'>There's nothing in your cart.</p>
													</div>
												)}
											</div>
										</div>
									</div>
									{cart.length > 0 ? (
										<div className='px-4 py-4 border-t border-black sm:px-6'>
											<div className='flex justify-between uppercase font-medium text-black text-sm tracking-tighter'>
												<p>Subtotal</p>
												<p>{formatter.format(cartTotal)}</p>
											</div>
											<p className='mt-0.5 text-sm text-gray-500 tracking-tight'>Shipping and taxes calculated at checkout.</p>

											{/* <div className='flex justify-center mt-4 text-sm text-center text-gray-500'>
												<p>
													<button onClick={() => clearCart()} className='font-medium hover:text-gray-800'>
														Clear Cart
													</button>{' '}
													or{' '}
													<button type='button' className='font-medium hover:text-gray-800' onClick={() => setCartOpen(false)}>
														Continue Shopping<span aria-hidden='true'> &rarr;</span>
													</button>
												</p>
											</div> */}
										</div>
									) : null}
									<div className='mt-0'>
										<a
											href={checkoutUrl}
											className={`uppercase tracking-tight flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-black border border-transparent shadow-sm hover:bg-gray-800 ${
												cartLoading ? 'cursor-not-allowed' : 'cursor-pointer'
											}`}
										>
											Checkout
										</a>
									</div>
								</div>
							</div>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
}
