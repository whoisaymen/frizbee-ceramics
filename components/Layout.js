'use client';
import Footer from './Footer';

export default function Layout({ children }) {
	return (
		<div className='flex flex-col justify-between min-h-screen'>
			<main>{children}</main>
			<Footer />
		</div>
	);
}
