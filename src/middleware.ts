// middleware.ts

import { NextResponse } from "next/server";
import NextAuth from "next-auth";
import {
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
  authRoutes,
  apiAuthPrefix,
  staffRestrictedRoutes,
  adminRestrictedRoutes,
} from "./routes";
import { authConfig } from "./server/auth/config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const userSession = req.auth;
  const isLoggedIn = !!userSession;

  const path = nextUrl.pathname;

  const isApiAuthRoute = apiAuthPrefix.some((prefix) =>
    path.startsWith(prefix),
  );

  const isPublicRoute = publicRoutes.some((route) => {
    if (path === route) return true;

    // Handle dynamic routes
    const routeSegments = route.split("/").filter(Boolean);
    const pathSegments = path.split("/").filter(Boolean);

    if (routeSegments.length > pathSegments.length) return false;

    return routeSegments.every(
      (segment, index) => segment === pathSegments[index],
    );
  });

  const isAuthRoute = authRoutes.includes(path);

  // **1. API Authentication Routes**
  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  // **2. Authentication Routes (e.g., Sign In, Sign Up)**
  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return NextResponse.next();
  }

  // **3. Redirect to Sign In if Not Logged In and Not a Public Route**
  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/sign-in", nextUrl));
  }

  // **4. Redirect to Email Verification if Logged In but Email Not Verified**
  if (
    isLoggedIn &&
    userSession.user?.emailVerified !== true &&
    !isAuthRoute &&
    path !== "/verifikasi-akun"
  ) {
    return NextResponse.redirect(new URL("/verifikasi-akun", nextUrl));
  }

  // **5. Rewrites for Root and Landing Pages**
  if (path === "/") {
    return NextResponse.rewrite(new URL("/landing", req.url));
  } else if (path === "/landing") {
    return NextResponse.rewrite(new URL("/", req.url));
  }

  // **6. Staff Restricted Routes**
  const isStaffRestrictedRoute = staffRestrictedRoutes.some((route) => {
    if (path === route) return true;
    return path.startsWith(route);
  });

  if (isStaffRestrictedRoute && userSession?.user?.role === "USER") {
    return NextResponse.redirect(
      new URL("/dashboard/user/pemesanan-saya", nextUrl),
    );
  }

  // **7. Admin Restricted Routes**
  const isAdminRestrictedRoute = adminRestrictedRoutes.some((route) => {
    if (path === route) return true;
    return path.startsWith(route);
  });

  if (isAdminRestrictedRoute && userSession?.user?.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/dashboard", nextUrl));
  }

  // **8. Allow Next.js to handle the request**
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
