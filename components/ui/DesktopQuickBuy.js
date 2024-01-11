const DesktopQuickBuy = ({ handleAddToCart, isAvailableForSale }) => {
  return (
    <button
      className={`hidden md:block md:absolute right-8 -bottom-1 translate-y-full text-sm tracking-tighter font-light group-hover:translate-y-0 bg-white p-2 pt-1 border-black rounded-t-md border-[1px] transition-transform duration-500 ease-in-out transform uppercase cursor- ${
        !isAvailableForSale ? "bg-red-400 cursor-not-allowed" : ""
      }`}
      onClick={handleAddToCart}
      disabled={!isAvailableForSale}
    >
      {isAvailableForSale ? "Add to Cart" : "Sold Out"}
    </button>
  );
};

export default DesktopQuickBuy;
