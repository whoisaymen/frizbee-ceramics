import Image from "next/image";
import { formatter, colorMappings } from "@/utils/helpers";

const MobileProductCard = ({ title, price, imageUrl, colorValue }) => {
  return (
    <div className="w-full overflow-hidden text-[12px] md:text-sm h-[18rem] md:h-[24rem] bg-gray-100 relative text-sm">
      <Image
        src={imageUrl}
        alt={"Product image"}
        width={500}
        height={500}
        loading="lazy"
        className="w-full h-full object-cover object-center max-w-full"
      />

      <div className="absolute left-3 font-semibold bottom-2 flex flex-col z-10 text-left">
        <div
          className="md:hidden w-1/2 blur-2xl absolute left-0 bottom-0 h-6 z-[8]"
          style={{
            backgroundColor: colorMappings[colorValue] || "#343dfb",
          }}
        ></div>
        <span>{title}</span>
        <span className="font-light -mt-1">{formatter.format(price)}</span>
      </div>
    </div>
  );
};

export default MobileProductCard;
