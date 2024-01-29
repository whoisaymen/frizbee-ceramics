import Image from "next/image";

const MobileQuickBuy = ({ handleAddToCart, isAvailableForSale }) => {
  return (
    <div className="relative">
      {isAvailableForSale ? (
        <button
          className="md:hidden absolute right-0 bottom-0 text-sm tracking-tighter font-light h-10 w-10 border-black uppercase flex items-center justify-center z-[8] "
          onClick={handleAddToCart}
          disabled={!isAvailableForSale}
        >
          <Image
            src="/images/cartIcon.svg"
            alt="Add to Cart"
            className="object-cover hover:scale-125 transition-all duration-500 ease-in-out"
            priority
            width={16}
            height={16}
          />
        </button>
      ) : (
        <button
          className={`absolute right-4 -bottom-1 md:hidden text-xs tracking-tighter font-light bg-white p-2 py-1 pb-[6px] border-black rounded-t-md border-[1px] uppercase cursor- z-[8] ${
            !isAvailableForSale ? "bg-red-400 cursor-not-allowed" : ""
          }`}
          onClick={handleAddToCart}
          disabled={!isAvailableForSale}
        >
          Sold Out
        </button>
      )}
    </div>
  );
};

export default MobileQuickBuy;
