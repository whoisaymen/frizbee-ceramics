import Image from 'next/image';

export default function AboutPage() {
	return (
		<div className='bg-white font-extralight tracking-tight'>
			<div className='mx-auto max-w-7xl'>
				<div className='mx-auto grid max-w-2xl grid-cols-1 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2'>
					<div className='border-r border-black'>
						<div className='lg:max-w-lg py-28'>
							<h2 className='uppercase mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>About</h2>
							<p className='mt-6'>
								Launched in 2017, Brussels-based FRIZBEE CERAMICS offers an edgy handcrafted tableware collection. Designed and produced by
								a pair of skilled Belgian artists, the brand’s porcelain bowls, plates, and planters often include nostalgic visuals like
								aliens and distorted smileys, evoking ‘90s street art and rave culture. Raised-edge plates with a faded graffiti effect and
								smiley motif bowls are hand-cast and glazed in small batches using premium-quality materials. FRIZBEE CERAMICS adds a
								youthful charm and zest to modern kitchen and homeware with its evocative and offbeat designs.
							</p>
							<p className='mt-6'>
								Frizbee Ceramics’ line ranges from tiny shot glasses to large serving dishes and is 100% dishwasher safe!
							</p>
							<p className='mt-6'>Please reach out for special requests, studio visits and custom orders.</p>
						</div>
					</div>
					<div className='max-w-1/2 relative'>
						<Image src='/images/img2.JPG' alt='Product screenshot' className='object-cover' fill />
					</div>
				</div>
			</div>
		</div>
	);
}
