import './globals.css';
import { Inter } from 'next/font/google';
import Layout from '@/components/Layout';
import ShopProvider from '@/context/shopContext';
import Nav from '@/components/Nav';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Frizbee Ceramics',
	description: 'Frizbee Ceramics is an artist-run brand based in Brussels.',
	openGraph: {
		title: 'Frizbee Ceramics',
		description: 'Frizbee Ceramics is an artist-run brand based in Brussels.',
		url: 'https://frizbeeceramics.com',
		siteName: 'Frizbee Ceramics',
		images: [
			{
				url: 'https://frizbeeceramics.com/imaeges/inserthere.png',
				width: 800,
				height: 600,
			},
		],
		locale: 'en_US',
		type: 'website',
	},
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<ShopProvider>
					<Nav />
					<Layout>{children}</Layout>
				</ShopProvider>
			</body>
		</html>
	);
}
