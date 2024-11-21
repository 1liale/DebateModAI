import type { AppProps } from "next/app";
import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import BackgroundIllustration from "@/components/misc/BackgroundIllustration";
import { Sidebar } from "@/components/layout/SideBar";
import { useRouter } from "next/router";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const nacelle = localFont({
  src: [
    {
      path: "../public/fonts/nacelle-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/nacelle-italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/nacelle-semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/nacelle-semibolditalic.woff2",
      weight: "600",
      style: "italic",
    },
  ],
  variable: "--font-nacelle",
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isAuthRoute = router.pathname.startsWith("/app");

  return (
    <ClerkProvider afterSignOutUrl="/">
      <div className={`${inter.variable} ${nacelle.variable} font-inter min-h-screen`}>
        {!isAuthRoute ? (
          <>
            <BackgroundIllustration multiple />
            <Header />
            <Component {...pageProps} />
            <Footer />
          </>
        ) : (
          <div className="flex h-screen">
            <Sidebar key={router.asPath} />
            <div className="flex-1 overflow-auto">
              <Component {...pageProps} />
            </div>
          </div>
        )}
      </div>
    </ClerkProvider>
  );
}
