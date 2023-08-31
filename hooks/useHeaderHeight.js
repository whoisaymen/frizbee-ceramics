'use client';
import { useState, useEffect } from 'react';

const useHeaderHeight = () => {
	const [headerHeight, setHeaderHeight] = useState(0);

	const updateHeaderHeight = () => {
		const headerElement = document.getElementById('header');
		if (headerElement) {
			setHeaderHeight(headerElement.offsetHeight);
		}
	};

	useEffect(() => {
		updateHeaderHeight();
		window.addEventListener('resize', updateHeaderHeight);

		return () => {
			window.removeEventListener('resize', updateHeaderHeight);
		};
	}, []);
	// console.log(headerHeight);
	return headerHeight;
};

export default useHeaderHeight;
