import Image from "next/image";

const MobileQuickBuy = ({ handleAddToCart, isAvailableForSale, isPreOrder, isSoldOut }) => {
  return (
    <div className="relative">
      {/* {isPreOrder ? (
        <button
          className="absolute right-4 -bottom-1 md:hidden text-xs
            tracking-tighter font-light bg-white p-2 py-1 pb-[6px] border-black
            rounded-t-md border-[1px] uppercase cursor-pointer z-[8]"
            onClick={handleAddToCart}
        >
          PRE-ORDER
        </button>
      ) : (
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
      )} */}

      {isSoldOut ? (
        <button
          className={`absolute right-4 -bottom-1 md:hidden text-xs tracking-tighter font-light 
            bg-white p-2 py-1 pb-[6px] border-black rounded-t-md border-[1px] uppercase 
            cursor-not-allowed z-[8]`}
          disabled
        >
          Sold Out
        </button>
      ) : null}

      {!isSoldOut && isPreOrder ? (
        <button
          className="absolute right-4 -bottom-1 md:hidden text-xs tracking-tighter font-light 
            bg-white p-2 py-1 pb-[6px] border-black rounded-t-md border-[1px] uppercase 
            cursor-pointer z-[8]"
          onClick={handleAddToCart}
        >
          PRE-ORDER
        </button>
      ) : null}

       {!isSoldOut && !isPreOrder ? (
        <button
          className="md:hidden absolute right-0 bottom-0 text-sm tracking-tighter font-light 
            h-10 w-10 border-black uppercase flex items-center justify-center z-[8]"
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
      ) : null}
      
    </div>
  );
};

export default MobileQuickBuy;
