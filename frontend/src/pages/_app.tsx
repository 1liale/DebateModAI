import type { AppProps } from "next/app";
import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { Footer } from "@/components/layout/Footer";
import BackgroundIllustration from "@/components/misc/BackgroundIllustration";
import { SideBar } from "@/components/layout/SideBar";
import { useRouter } from "next/router";
import { ThemeProvider } from "@/config/theme-provider";
import { AuthHeader, UnauthHeader } from "@/components/layout/Header";
import { RoomProvider } from "@/components/providers/RoomProvider";
import { FirebaseAuthProvider } from "@/components/providers/FirebaseAuthProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const nacelle = localFont({
  src: [
    {
      path: "../../public/fonts/nacelle-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/nacelle-italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/nacelle-semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/nacelle-semibolditalic.woff2",
      weight: "600",
      style: "italic",
    },
  ],
  variable: "--font-nacelle",
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isAppRoute = router.pathname.startsWith("/app");
  const isAuthRoute = isAppRoute || router.pathname.startsWith("/onboarding");
  

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <ClerkProvider afterSignOutUrl="/">
        <FirebaseAuthProvider>
        <div
          className={`${inter.variable} ${nacelle.variable} font-inter min-h-screen`}
        >
          {!isAuthRoute ? (
            <>
              <BackgroundIllustration multiple />
              <UnauthHeader />
              <main className="flex-1 flex flex-col">
                <Component {...pageProps} />
              </main>
              <Footer />
            </>
          ) : isAppRoute ? (
            <RoomProvider>
              <div className="h-screen w-screen flex flex-col md:flex-row">
                <SideBar />
                <div className="flex-1 flex flex-col">
                  <AuthHeader />
                  <main className="flex-1 flex overflow-auto">
                    <Component {...pageProps} />
                  </main>
                </div>
              </div>
            </RoomProvider>
          ) : (
            <>
              <BackgroundIllustration multiple />
              <main className="flex-1 flex flex-col">
              <Component {...pageProps} />
              </main>
            </>
          )}
        </div>
        </FirebaseAuthProvider>
      </ClerkProvider>
    </ThemeProvider>
  );
}
