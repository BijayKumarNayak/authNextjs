import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Getting the path of the user
  const path = request.nextUrl.pathname;
  // public path
  const isPublicPath =
    path === "/login" || path === "/signup" || path === "/verifyemail";
  // getting token  from cookies of the user for chexking user is logged in or not
  const token = request.cookies.get("token")?.value;
  // If it is a public path and the user is logged in then redirect to a specific  page
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher:[
    
    '/login',
    '/signup',
    '/profile',
    '/verifyemail'
  ]
};
