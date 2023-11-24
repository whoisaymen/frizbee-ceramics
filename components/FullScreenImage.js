import Image from "next/image";

function FullScreenImage() {
  return (
    <div className="fixed top-0 left-0 w-full h-screen z-10 overflow-hidden">
      <Image
        src="/images/about.jpg"
        alt="Product screenshot"
        className="border-b border-black md:border-none object-cover h-[30vh] lg:h-auto"
        width={1000}
        height={1000}
        priority
      />
    </div>
  );
}

export default FullScreenImage;
