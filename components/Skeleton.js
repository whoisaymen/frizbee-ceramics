import Skeleton from "@mui/material/Skeleton";

const colors = [
  "#D6FD53",
  "#AAAAEF",
  "#76BC91",
  "#EFAACD",
  "#F7D949",
  "#6072D3",
  "#B8D0F3",
  "#F0ED9F",
  "#C4576C",
  "#4656C3",
  "#DDEEC0",
  "#9AB8E5",
  "#F0ED9F",
  "#F1CA78",
  "#E9EDF4",
  "#9FC2C9",
  "#D1EDF1",
  "#76BC91",
];

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

export function ProductCardSkeleton({ index }) {
  // const randomColor = getRandomColor();
  const colorIndex = index % colors.length; // Calculate the color index
  const bgColor = colors[colorIndex];
  return (
    <>
      <div
        className={`w-full overflow-hidden h-[18rem] md:h-[24rem] bg-gray-100 relative text-sm border-b border-gray-800 ${
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
          sx={{ bgcolor: bgColor }}
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
