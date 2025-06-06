// import { cookies } from "next/headers";
import { headers } from "next/headers";

import "./globals.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import GoogleAnalytics from "@/GoogleAnalytics";
import { GoogleTagManager } from "@next/third-parties/google";
import ShopProvider from "@/context/shopContext";

import Footer from "@/components/Footer";
import { inter } from "@/components/ui/Fonts";
import Nav from "@/components/nav/Nav";
import NavLinks from "@/components/nav/NavLinks";
import Logo from "@/components/nav/Logo";
import SortFilterMenu from "@/components/nav/SortFilterMenu";
import Cart from "@/components/Cart";
import Newsletter from "@/components/ui/Newsletter";
import FacebookPixel from "@/components/FacebookPixel";

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

export const viewport = {
  themeColor: "black",
};

export default function RootLayout({ children }) {

  // const cookieStore = cookies();
  // const pathname = cookieStore.get("x-pathname")?.value;

  const pathnameHeader = headers().get("x-pathname");

  // console.log("🔥 Pathname from headers:", pathnameHeader);
  const isDealsPage = pathnameHeader === "/deals";

  return (
    <html lang="en">
      <GoogleTagManager gtmId="GTM-KZ296SD6" />
      <body className={`${inter.className} custom-cursor ${isDealsPage ? "bg-black" : ""}`}>
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
          <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        ) : null}

        <ShopProvider>
          {isDealsPage ? (
            <Nav>
              <Logo />
            </Nav>
          ) : (
            <>
              <Nav>
                <SortFilterMenu />
                <Logo />
                <NavLinks />
              </Nav>
              <Cart />
              <Newsletter />
            </>
          )}

          {children}

          {!isDealsPage && <Footer />}
        </ShopProvider>

        <FacebookPixel />
      </body>
    </html>
  );
}
