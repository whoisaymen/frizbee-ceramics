import Skeleton from "@mui/material/Skeleton";

const MobileQuickBuyLoading = ({ handleAddToCart, isAvailableForSale }) => {
  return (
    <div className="relative">
      <div className="md:hidden absolute right-0 bottom-0 text-sm tracking-tighter font-light h-10 w-10 border-black uppercase flex items-center justify-center z-[8]">
        <Skeleton
          variant="rectangular"
          width={"100%"}
          height={"100%"}
          sx={{ bgcolor: "#f9d" }}
        />
      </div>
    </div>
  );
};

export default MobileQuickBuyLoading;
