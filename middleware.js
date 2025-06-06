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
        // "/((?!deals|api|_next|static|.*\\..*).*)",
        "/((?!api|_next|static|.*\\..*).*)",
      ],
};

export function middleware(request) {
    // Get the pathname of the request
    // const { pathname } = request.nextUrl;

    // If the pathname is '/' or any other path except /deals,
    // redirect to the deals page
    // if (pathname !== "/deals") {
    //     return NextResponse.redirect(new URL("/deals", request.url));
    // }

    // Otherwise, continue with the response
    // return NextResponse.next();

    // const dropTime = new Date(process.env.NEXT_PUBLIC_SCH_TIME || "2024-05-12T09:32:00").getTime();
    // const now = Date.now();
    // const pathname = request.nextUrl.pathname;

    // if (now < dropTime) {
    //     // Drop hasn't happened yet; redirect to /deals
    //     if (request.nextUrl.pathname !== "/deals") {
    //       return NextResponse.redirect(new URL("/deals", request.url));
    //     }
    //   }
    
      // After drop, allow normal navigation
      // return NextResponse.next();

      // const response =
      // now < dropTime && pathname !== "/deals"
      //   ? NextResponse.redirect(new URL("/deals", request.url))
      //   : NextResponse.next();
  
    // Set pathname as a cookie instead
    // response.cookies.set("x-pathname", pathname);
    // response.headers.set("x-pathname", pathname);

      // Only set pathname header before drop
  // if (now < dropTime) {
  //   response.headers.set("x-pathname", pathname);
  // }

  //   return response;

  const dropTime = new Date(process.env.NEXT_PUBLIC_SCH_TIME || "2024-05-12T09:32:00").getTime();
  const now = Date.now();
  const pathname = request.nextUrl.pathname;

  let response;
  if (now < dropTime) {
    // BEFORE drop: allow only /deals
    if (pathname !== "/deals") {
      response = NextResponse.redirect(new URL("/deals", request.url));
    } else {
      response = NextResponse.next();
    }

    // Set path header before drop
    response.headers.set("x-pathname", pathname);
  } else {
    // AFTER drop: block /deals and redirect to home
    if (pathname === "/deals") {
      response = NextResponse.redirect(new URL("/", request.url));
    } else {
      response = NextResponse.next();
    }

    // Don't set pathname header after drop
  }

  return response;

}
