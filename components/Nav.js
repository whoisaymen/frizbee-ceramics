'use client';
import Link from 'next/link';
import { useContext, useState, Fragment } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

import { CartContext } from '../context/shopContext';
import MiniCart from './MiniCart';
import Image from 'next/image';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function Nav() {
	const pathname = usePathname();

	const { cart, cartOpen, setCartOpen, sortOption, setSortOption } = useContext(CartContext);
	const [isProjectsVisible, setIsProjectsVisible] = useState(false);

	let cartQuantity = 0;

	cart.map((item) => {
		return (cartQuantity += item?.variantQuantity);
	});

	return (
		<div className='font-light tracking-tight uppercase sticky top-0 z-50 -ml-[1px] -mr-[1px]' id='header'>
			<div className='letstry relative lg:pt-10 -mb-2'>
				<header className=' relative'>
					<nav aria-label='Top' className='mx-auto max-w-7xl'>
						<div className='flex items-center justify-between'>
							<div className='hidden lg:block'>
								<span
									className={`cursor-pointer border border-black py-[2px] bg-white ${sortOption === 'color' ? 'bg-[#ddd] text-black' : ''}`}
								>
									<Link href='/' onClick={() => setSortOption('color')} className='px-4'>
										Color
									</Link>
								</span>
								<span
									className={`py-[2px] cursor-pointer border border-black -ml-[1px] bg-white ${
										sortOption === 'shape' ? 'bg-[#66D8B4] text-black' : ''
									}`}
								>
									<Link href='/' onClick={() => setSortOption('shape')} className='px-4'>
										Shape
									</Link>
								</span>
								<span
									className={`py-[2px] cursor-pointer border border-black -ml-[1px] bg-white ${
										sortOption === 'pattern' ? 'bg-[#B0AAEF] text-black' : ''
									}`}
								>
									<Link href='/' onClick={() => setSortOption('pattern')} className='px-4'>
										Pattern
									</Link>
								</span>
								<span
									className={`py-[2px] cursor-pointer border border-black -ml-[1px] bg-white ${
										sortOption === 'new' ? 'bg-[#F1EFF3] text-black' : ''
									}`}
								>
									<Link href='/' onClick={() => setSortOption('new')} className='px-4'>
										New
									</Link>
								</span>
								<span
									className={`py-[2px] cursor-pointer border border-black -ml-[1px] bg-white ${
										sortOption === 'set' ? 'bg-[#F1EFF3] text-black' : ''
									}`}
								>
									<Link href='/' onClick={() => setSortOption('set')} className='px-4'>
										Set
									</Link>
								</span>
							</div>

							{/* Mobile Menu */}
							<div className='text-sm lg:hidden flex flex-wrap w-full m-0 p-0 text-center justify-center'>
								<div className='flex justify-center'>
									<Link href='/' onClick={() => setSortOption('')} className=''>
										<span className='sr-only'>Frizbee Ceramics</span>
										<Image
											src='/images/logoBlack.png'
											height={1000}
											width={1000}
											className='w-auto mx-auto z-50'
											alt='Frizbee Ceramics logo'
											priority
										></Image>
									</Link>
								</div>

								<div className='w-full flex justify-center'>
									{['color', 'shape', 'pattern', 'new', 'set'].map((option) => (
										<span
											key={option}
											className={`cursor-pointer flex-grow border border-black py-[4px] bg-white -ml-[1px] ${
												sortOption === option ? 'bg-[#000] text-white' : 'text-black'
											}`}
											style={sortOption === option ? { backgroundColor: 'black' } : {}}
										>
											<Link href='/' onClick={() => setSortOption(option)} className='px-3 flex justify-center items-center'>
												{sortOption === option ? (
													// <svg className='h-1.5 w-1.5 fill-gray-800 mr-1' viewBox='0 0 6 6' aria-hidden='true'>
													// 	<circle cx={3} cy={3} r={3} />
													// </svg>
													<svg className='h-2.5 w-2.5 fill-gray-50 mr-1' viewBox='0 0 10 15'>
														<path d='M10 6L5 0L0 6H10ZM10 9L5 15L0 9H10Z' />
													</svg>
												) : (
													<span className='h-1.5 w-1.5 opacity-0'> </span> // The mirror element
												)}
												{option.charAt(0).toUpperCase() + option.slice(1)}
											</Link>
										</span>
									))}
								</div>

								<div className='w-full flex justify-center -mt-[1px]'>
									<span
										onClick={() => setIsProjectsVisible(!isProjectsVisible)}
										className={`cursor-pointer border border-black px-4 py-[4px] font-light tracking-tight uppercase flex-grow bg-white -ml-[1px] ${
											isProjectsVisible ? 'bg-[#FFE9B2]' : 'bg-white'
										}`}
									>
										Projects
									</span>
									<Link
										href='/about'
										className={`border border-black px-4 py-[4px] flex-grow ${
											pathname === '/about' ? 'bg-[#F3FFE0]' : 'bg-white'
										} -ml-[1px]`}
										onClick={() => {
											// console.log('Current sortOption value:', sortOption);
											setSortOption('');
										}}
									>
										<span>About</span>
									</Link>
									<span
										className='cursor-pointer border border-black px-4 py-[4px] flex-grow bg-white -ml-[1px]'
										onClick={() => setCartOpen(!cartOpen)}
									>
										Cart ({cartQuantity})
									</span>
								</div>
							</div>

							<Link href='/' onClick={() => setSortOption('')} className='hidden lg:flex -rotate-6 '>
								<span className='sr-only'>Frizbee Ceramics</span>
								<Image
									src='/images/logo.png'
									height={1000}
									width={1000}
									className='h-24 w-auto z-50 px-4'
									alt='Frizbee Ceramics logo'
									priority
								></Image>
							</Link>
							<div className='flex items-center justify-end z-10'>
								<div className='hidden lg:block'>
									<span
										onClick={() => setIsProjectsVisible(!isProjectsVisible)}
										className='cursor-pointer border border-black px-4 py-[2px] font-light tracking-tight uppercase'
									>
										{isProjectsVisible ? 'Projects X' : 'Projects'}
									</span>
									<Link
										href='/about'
										className={`border border-black px-4 py-[2px] -ml-[1px] ${pathname === '/about' ? 'bg-[#F3FFE0]' : 'bg-white'} `}
									>
										<span>About</span>
									</Link>
									<span className='cursor-pointer border border-black px-4 -ml-[1px] py-[2px]' onClick={() => setCartOpen(!cartOpen)}>
										Cart ({cartQuantity})
									</span>
									<span className='sr-only'>items in cart, view bag</span>
								</div>
								<MiniCart cart={cart} />
							</div>
						</div>
					</nav>
				</header>

				{isProjectsVisible && (
					<div className='w-full bg-white z-20'>
						<div className='mx-auto max-w-7xl  border-b border-black p-4 text-sm'>
							<ul role='list' className='space-y-0'>
								<li>A Box Is A Box</li>
								<li>Carne</li>
								<li>Chez Manger</li>
								<li>Lina Lapelyte</li>
								<li>MAD</li>
								<li>Now Belgium Now</li>
								<li>Phyps</li>
								<li>Pon Ding</li>
							</ul>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
