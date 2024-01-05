export const formatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
});

export const getColorFromTag = (product) => {
  if (!product || !product.node || !product.node.tags) return null;

  const colorTag = product.node.tags.find((tag) => tag.startsWith("color:"));
  return colorTag ? colorTag.split(":")[1] : null;
};

export const colorMappings = {
  acid: "#AECCD7",
  blue: "#3549A6",
  green: "#7BB97A",
  roses: "#942B50",
};
