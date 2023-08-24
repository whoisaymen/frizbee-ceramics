'use client';

import ShopProvider from '@/context/shopContext';

export default function Providers({ children }) {
	return <ShopProvider>{children}</ShopProvider>;
}
