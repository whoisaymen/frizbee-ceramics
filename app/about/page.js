import Image from 'next/image';

export default function AboutPage() {
	return (
		<div className='bg-white font-extralight tracking-tight'>
			<div className='mx-auto max-w-7xl border-t border-l border-r border-black'>
				<div className='flex flex-col md:flex-row'>
					<div className='order-2 lg:order-1 border-b border-black md:border-r md:border-black md:border-b-0 w-full md:w-1/2'>
						<div className='p-6 md:py-28 text-sm lg:text-base'>
							{/* <h2 className='uppercase mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>About</h2> */}
							{/* <Image src='/images/sun.png' height={1000} width={1000} className='w-auto mx-auto z-50' alt='Frizbee Ceramics logo'></Image> */}
							<p className=''>
								<strong>Launched in 2017, Brussels-based FRIZBEE CERAMICS offers an edgy handcrafted tableware collection.</strong>
							</p>
							<p className='mt-4'>
								Designed and produced by a pair of skilled Belgian artists, the brand’s porcelain bowls, plates, and planters often include
								nostalgic visuals like aliens and distorted smileys, evoking ‘90s street art and rave culture. Raised-edge plates with a
								faded graffiti effect and smiley motif bowls are hand-cast and glazed in small batches using premium-quality materials.
								FRIZBEE CERAMICS adds a youthful charm and zest to modern kitchen and homeware with its evocative and offbeat designs.
							</p>
							<p className='mt-6'>
								Frizbee Ceramics’ line ranges from tiny shot glasses to large serving dishes and is 100% dishwasher safe!
							</p>
							<p className='mt-6'>Please reach out for special requests, studio visits and custom orders.</p>
						</div>
					</div>
					{/* Assuming that you want the image to take full width on mobile */}
					<div className='order-1 lg:order-2 w-full md:w-1/2 '>
						<Image
							src='/images/about.jpg'
							alt='Product screenshot'
							className='border-b border-black md:border-none object-cover h-[30vh] lg:h-auto'
							width={1000}
							height={1000}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
