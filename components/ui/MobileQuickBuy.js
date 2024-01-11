import Image from "next/image";

const MobileQuickBuy = ({ handleAddToCart, isAvailableForSale }) => {
  return (
    <div className="relative">
      {isAvailableForSale ? (
        <button
          className="md:hidden absolute right-0 bottom-0 text-sm tracking-tighter font-light h-10 w-10 border-black uppercase flex items-center justify-center z-[8]"
          onClick={handleAddToCart}
          disabled={!isAvailableForSale}
        >
          <Image
            src="/images/cartIcon.svg"
            alt="Add to Cart"
            className="object-cover"
            priority
            width={16}
            height={16}
          />
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default MobileQuickBuy;
