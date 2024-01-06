import "./globals.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { inter } from "@/components/ui/fonts";
import GoogleAnalytics from "@/GoogleAnalytics";
import ShopProvider from "@/context/shopContext";

import Footer from "@/components/Footer";

export const metadata = {
  metadataBase: new URL("https://frizbeeceramics.com"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
      "de-DE": "/de-DE",
    },
  },
  keywords: [
    "Frizbee Ceramics",
    "handmade pottery",
    "ceramic art",
    "artisan ceramics",
    "Brussels ceramics studio",
    "custom ceramics",
    "ceramic mugs",
    "ceramic plates",
    "home decor",
  ].join(", "),
  openGraph: {
    images: "/images/og-image.png",
  },
  title: "Frizbee Ceramics",
  description: "Frizbee Ceramics is an artist-run brand based in Brussels.",
  openGraph: {
    title: "Frizbee Ceramics",
    description: "Frizbee Ceramics is an artist-run brand based in Brussels.",
    url: "https://frizbeeceramics.com",
    siteName: "Frizbee Ceramics",
    images: [
      {
        url: "/images/logoSpirale.png",
        width: 800,
        height: 800,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} custom-cursor`}>
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
          <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        ) : null}
        <ShopProvider>
          {children}
          <Footer />
        </ShopProvider>
      </body>
    </html>
  );
}
