import ProductPageContent from "@/components/ProductPageContent";
import { getProduct } from "@/lib/shopify";
import { getPlaiceholder } from "plaiceholder";

export async function generateMetadata({ params, searchParams }, parent) {
  const product = await getProduct(params.product);

  return {
    title: "Frizbee Ceramics | " + product.title,
    description: product.description,
  };
}

export default async function ProductPage({ params }) {
  const product = await getProduct(params.product);
  const src = product.images.edges[0].node.url;

  let base64;

  /*
    data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==
    ...is a real image, but it’s just a 1×1 transparent pixel GIF. It's commonly used as a placeholder or fallback image.

    ? What It Is
    - Format: GIF
    - Size: 1x1 pixel
    - Appearance: Completely transparent
    - Purpose: Prevent broken images or flicker without loading a full image.
    - Used by default in many libraries, including next/image, when no real blurDataURL is available.
    - Transparent Pixel (Fastest placeholder, but not visually helpful)
  */
  // if (process.env.NODE_ENV === "development") {
    // Use a tiny transparent image as dummy placeholder during dev
    base64 =
      "data:image/webp;base64,UklGRlABAABXRUJQVlA4WAoAAAAQAAAAMQAAMQAAQUxQSJ4AAAABgKpt//nn+7f9T0Z0+keb56Dk/7z1HYCNZhtpbde6mncCtj4zPnHXQkRMAPmvlBW3Y5O23O4YcSknAGBGiEm9CADwVIVItQQfHlnRyKbg0wEGEnYHfH7iQJK9+wLU4DDswhePnTg0618470+6RRiIrvvio9vVxrqSDQVhxNceAOBhc7ip2s/HQYg4s3F7sznYEFRQCV5ZLGGS08kfZ1ZQOCCMAAAAMAYAnQEqMgAyAD6RQqBKpaOjoagYCKiwEglpAAPkanE/gNlzZiGA4eOv4sxOpvS2w6A9FWlVCSSQAAD+/ZmAv/+Dd3/hhCXBtyRZm2XiccvowB4+TXQsrm1eh/+fHWr5vx5UhRs7xs6IkyWQgMWnkzghIZsV4IFRAGlZiJr3ozPkv8QqVPkqRgAAAAA=";
  // } 
  // else {
  //   const buffer = await fetch(src).then(async (res) =>
  //     Buffer.from(await res.arrayBuffer())
  //   );

  //   /*
  //     - real blurred thumbnail of the product
  //     - generate it using the plaiceholder library
  //     ? In production, we already getting a real blurred version of the product image
  //     - plaiceholder blurData (Real blurred thumbnail (base64) of the real image)
  //   */
  //   const result = await getPlaiceholder(buffer);
  //   base64 = result.base64;
  // }

  return (
    <>
      <ProductPageContent product={product} blurDataURL={base64} />
    </>
  );
}
