import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/server/resolver/user";

export const isProtectedRoute = createRouteMatcher(["/app(.*)", "/api(.*)", "/onboarding(.*)"]);
export const isAppRoute = createRouteMatcher(["/app"]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  if (isProtectedRoute(req)) {
    const { userId } = await auth();
    
    if (!userId) {
      const notFoundUrl = new URL('/404', req.url);
      return NextResponse.rewrite(notFoundUrl);
    }

    // Check if trying to access /app routes
    if (isAppRoute(req)) {
      try {
        const userData = await getUser(userId);

        if (!userData?.onboardingComplete) {
          const onboardingUrl = new URL('/onboarding', req.url);
          return NextResponse.redirect(onboardingUrl);
        }
      } catch (error) {
        console.error('Error checking onboarding status:', error);
        // If there's an error checking the status, redirect to onboarding to be safe
        const onboardingUrl = new URL('/onboarding', req.url);
        return NextResponse.redirect(onboardingUrl);
      }
    }
  }
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
