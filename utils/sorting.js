export function sortProducts(products, option) {
  if (option === "color") {
    return [...products].sort((a, b) => {
      const colorA =
        a.node.tags.find((tag) => tag.startsWith("color:"))?.split(":")[1] ||
        "";
      const colorB =
        b.node.tags.find((tag) => tag.startsWith("color:"))?.split(":")[1] ||
        "";
      return colorA.localeCompare(colorB);
    });
  }
  if (option === "shape") {
    return [...products].sort((a, b) => {
      const shapeA =
        a.node.tags.find((tag) => tag.startsWith("shape:"))?.split(":")[1] ||
        "";
      const shapeB =
        b.node.tags.find((tag) => tag.startsWith("shape:"))?.split(":")[1] ||
        "";
      return shapeA.localeCompare(shapeB);
    });
  }
  if (option === "pattern") {
    return [...products].sort((a, b) => {
      const patternA =
        a.node.tags.find((tag) => tag.startsWith("pattern:"))?.split(":")[1] ||
        "";
      const patternB =
        b.node.tags.find((tag) => tag.startsWith("pattern:"))?.split(":")[1] ||
        "";
      return patternA.localeCompare(patternB);
    });
  }

  if (option === "set") {
    const filteredProducts = [...products].filter((product) => {
      return product.node.tags.includes("set");
    });
    return filteredProducts;
  }
  if (option === "new") {
    // Filter products with the 'new' tag
    return products.filter((product) => product.node.tags.includes("new"));
  }

  if (option === "date") {
    // Sort products by date added, from newest to oldest
    return [...products].sort((a, b) => {
      const dateA = new Date(a.node.createdAt);
      const dateB = new Date(b.node.createdAt);
      return dateB - dateA; // Sorting in descending order
    });
  }

  return products; // return products as-is if there's no sorting
}
