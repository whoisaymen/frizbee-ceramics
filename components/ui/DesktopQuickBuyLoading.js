import Skeleton from "@mui/material/Skeleton";

const DesktopQuickBuyLoading = ({ handleAddToCart, isAvailableForSale }) => {
  return (
    <button
      className={`hidden md:block md:absolute right-8 -bottom-1 translate-y-full text-sm tracking-tighter font-light group-hover:translate-y-0 bg-white p-2 pt-1 border-black rounded-t-md border-[1px] transition-transform duration-500 ease-in-out transform uppercase`}
    >
      <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
    </button>
  );
};

export default DesktopQuickBuyLoading;
