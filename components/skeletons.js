import Skeleton from "@mui/material/Skeleton";

Skeleton;
// Loading animation
const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export function CardsSkeleton() {
  const cardCount = 50; // Number of card components to render

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 -mt-3">
      {Array.from({ length: cardCount }).map((_, index) => (
        <ProductCardSkeleton index={index} key={index} />
      ))}
    </div>
  );
}

export function CardSkeleton() {
  return <div>Loading...</div>;
}

function ProductCardSkeleton(index) {
  const randomColor = getRandomColor();
  return (
    <>
      <div className="md:hidden overflow-hidden text-[12px] h-[18rem] text-center">
        <Skeleton variant="rectangular" width={"50%"} height={200} />
      </div>
      <div
        className={`hidden md:block w-full overflow-hidden md:h-[24rem] bg-gray-100 relative text-sm border-b border-gray-800 ${
          index % 2 === 0 ? "border-r" : ""
        } ${(index + 1) % 3 !== 0 ? "md:border-r" : "md:border-r-0"} ${
          (index + 1) % 4 !== 0 ? "lg:border-r" : "lg:border-r-0"
        } ${(index + 1) % 5 !== 0 ? "xl:border-r" : "xl:border-r-0"} ${
          (index + 1) % 6 !== 0 ? "2xl:border-r" : "2xl:border-r-0"
        }`}
      >
        <Skeleton
          variant="rectangular"
          width={"100%"}
          height={"100%"}
          sx={{ bgcolor: randomColor }}
        />
      </div>
    </>
  );
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
