// middleware.ts
import { NextResponse } from "next/server";

// Configure which paths to match [temp for early deals]
// comment when deals time is over
export const config = {
    matcher: [
        /*
        * Match all paths except for:
        * 1. /deals (your early access page)
        * 2. /api (API routes)
        * 3. /_next (Next.js internals)
        * 4. /static (static files)
        * 5. All files in the public folder
        */
        "/((?!deals|api|_next|static|.*\\..*).*)",
    ],
};

export function middleware(request) {
    // Get the pathname of the request
    const { pathname } = request.nextUrl;

    // If the pathname is '/' or any other path except /deals,
    // redirect to the deals page
    if (pathname !== "/deals") {
        return NextResponse.redirect(new URL("/deals", request.url));
    }

    // Otherwise, continue with the response
    return NextResponse.next();
}
