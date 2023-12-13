import "./globals.css";
import { Inter } from "next/font/google";
import ShopProvider from "@/context/shopContext";
import { VideoProvider } from "@/context/VideoContext";
import Footer from "@/components/Footer";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Nav from "@/components/Nav";
// import Newsletter from "@/components/Newsletter";

const inter = Inter({ subsets: ["latin"] });

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
        <VideoProvider>
          <ShopProvider>
            <Nav />
            {/* <Newsletter /> */}
            {children}
          </ShopProvider>
          {/* <Footer /> */}
        </VideoProvider>
      </body>
    </html>
  );
}
