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
  const cardCount = 24; // Number of card components to render

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 -mt-3">
      {Array.from({ length: cardCount }).map((_, index) => (
        <ProductCardSkeleton index={index} key={index} />
      ))}
    </div>
  );
}

export function ProductCardSkeleton({ index }) {
  // const colorIndex = index % colors.length;
  // const bgColor = colors[colorIndex];
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
          sx={{ bgcolor: "#e8ecf4" }}
        />
        <Skeleton
          variant="text"
          sx={{ fontSize: "12px" }}
          className="w-1/2 absolute left-3 bottom-6"
        />
        <Skeleton
          variant="text"
          sx={{ fontSize: "12px" }}
          className="w-1/4 absolute left-3 bottom-2"
        />
      </div>
    </>
  );
}

export function ProductPageSkeleton() {
  return (
    <>
      <div className="mx-auto">
        <div className="flex flex-row items-stretch w-full">
          <div className={`w-full h-[calc(100svh-24px)]`}>
            <Skeleton
              variant="rectangular"
              width={"100%"}
              height={"100%"}
              sx={{ bgcolor: "#EFAACD" }}
            />
          </div>

          {/* Product Form */}
          <div className="z-[7]">
            <div className="from-[#B0AAEF]/30 bg-[#fff]/80 w-[69vw] left-14 lg:left-auto bottom-[70px] lg:min-w-[450px]  lg:w-1/4  fixed md:bottom-[29px] md:right-1/4 border border-gray-800">
              <div className="relative">
                <button className="swiper-button-prev"></button>
                <button className="swiper-button-next"></button>
                <div className="lg:border-none flex justify-between items-stretch">
                  <div className="text-black flex-grow flex justify-start items-center">
                    <h2 className="p-1 md:p-2 px-4 leading-tight text-md md:text-lg lg:text-2xl tracking-tighter font-bold w-full">
                      <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                    </h2>
                  </div>
                  <div className="bg-white/90 flex justify-center items-center border-l border-gray-800 border-b text-sm lg:text-base">
                    <span className="tracking-tight px-4 py-1 md:py-2">
                      <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                    </span>
                  </div>
                </div>
                <div className="pt-3 pb-4 md:pb-8 px-4 lg:h-auto text-xs md:text-base">
                  <div className="mb-2">
                    <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                  </div>
                  <div className="flex items-center border border-gray-800">
                    <button className="px-2 py-1 md:px-4 md:py-0 bg-white/90">
                      {/* <Skeleton variant="text" sx={{ fontSize: "1rem" }} /> */}
                      <Skeleton
                        variant="rectangular"
                        width={"100%"}
                        height={"100%"}
                        sx={{ bgcolor: "#EFAACD" }}
                      />
                    </button>
                    <span className="px-2 py-1 md:px-4 md:py-2 border-gray-800 border-l border-r bg-white/90">
                      <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                    </span>
                    <button className="px-2 py-1  md:px-4 md:py-2 bg-white/90">
                      <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                    </button>
                    <button className="flex-grow px-2 py-1 md:py-2 text-black uppercase font-light tracking-tight bg-white/90 border-l border-gray-800 text-xs md:text-base">
                      <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function ProductPageImageSkeleton() {
  const color = colors[Math.floor(Math.random() * colors.length)];

  return (
    <>
      <div className="mx-auto">
        <div className="flex flex-row items-stretch w-full">
          <div className={`w-full h-[calc(100svh-24px)]`}>
            <Skeleton
              variant="rectangular"
              width={"100%"}
              height={"100%"}
              sx={{ bgcolor: color }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
