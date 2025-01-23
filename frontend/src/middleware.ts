import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const isProtectedRoute = createRouteMatcher(["/app(.*)", "/api(.*)", "/onboarding(.*)"]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  if (isProtectedRoute(req)) {
    const { userId } = await auth();
    
    if (!userId) {
      const notFoundUrl = new URL('/404', req.url);
      return NextResponse.rewrite(notFoundUrl);
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
