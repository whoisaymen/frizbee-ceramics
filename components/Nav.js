'use client';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { CartContext } from '../context/shopContext';
import MiniCart from './MiniCart';
import Image from 'next/image';

export default function Nav() {
	const [isSubmenuVisible, setIsSubmenuVisible] = useState(false);
	const { cart, cartOpen, setCartOpen } = useContext(CartContext);

	let cartQuantity = 0;

	cart.map((item) => {
		return (cartQuantity += item?.variantQuantity);
	});

	return (
		<header className='sticky top-0 z-20 bg-white uppercase pt-10 font-light tracking-tight '>
			<div className='flex items-center max-w-6xl mx-auto lg:max-w-screen-xl border-b border-black outline-offset-1	pb-0 border-t '>
				{/* Left side - Links */}
				<div className='hidden space-x-6 flex-1 md:flex justify-start'>
					<Link href='/'>
						<span>Color</span>
					</Link>
					<Link href='/'>
						<span>Shape</span>
					</Link>
					<Link href='/'>
						<span>Pattern</span>
					</Link>
					<Link href='/'>
						<span>New</span>
					</Link>
					<Link href='/'>
						<span>Sets</span>
					</Link>
				</div>

				{/* Center - Logo */}
				<div className='-rotate-6 max-w-[200px] -my-10'>
					<Link href='/'>
						<Image src='/images/logo.png' height={1000} width={1000} className='object-contain'></Image>
					</Link>
				</div>

				{/* Right side - Cart */}
				<div className='space-x-6 flex-1 flex justify-end'>
					<Link href='/about'>
						<span>About</span>
					</Link>
					{/* Container for both "Projects" link and the submenu */}
					<div className='relative' onMouseEnter={() => setIsSubmenuVisible(true)} onMouseLeave={() => setIsSubmenuVisible(false)}>
						<Link href='/'>
							<span>Projects</span>
						</Link>

						{/* Submenu */}
						{isSubmenuVisible && (
							<div className='absolute left-0 mt-2 w-full'>
								<div className='flex justify-between max-w-lg mx-auto'>
									<Image src='/images/img1.jpg' width={100} height={100} />
									<Image src='/images/img1.jpg' width={100} height={100} />
									<Image src='/images/img1.jpg' width={100} height={100} />
								</div>
							</div>
						)}
					</div>

					<span className='cursor-pointer' onClick={() => setCartOpen(!cartOpen)}>
						Cart ({cartQuantity})
					</span>

					<MiniCart cart={cart} />
				</div>
			</div>
		</header>
	);
}
