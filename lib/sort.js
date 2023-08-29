function sortProducts(products, option) {
	if (option === 'color') {
		return [...products].sort((a, b) => {
			const colorA = a.node.tags.find((tag) => tag.startsWith('color:'))?.split(':')[1] || '';
			const colorB = b.node.tags.find((tag) => tag.startsWith('color:'))?.split(':')[1] || '';
			return colorA.localeCompare(colorB);
		});
	}
	return products; // return products as-is if there's no sorting
}
