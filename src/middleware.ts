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
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = apiAuthPrefix.some((prefix) =>
    nextUrl.pathname.startsWith(prefix),
  );
  // const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isPublicRoute = publicRoutes.some((publicRoute) =>
    nextUrl.pathname.endsWith(publicRoute),
  );
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return NextResponse.next();
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/sign-in", nextUrl));
  }

  if (nextUrl.pathname === "/") {
    return NextResponse.rewrite(new URL("/landing", req.url));
  } else if (nextUrl.pathname === "/landing") {
    return NextResponse.rewrite(new URL("/", req.url));
  }

  const isStaffRestrictedRoute = staffRestrictedRoutes.includes(
    nextUrl.pathname,
  );
  if (isStaffRestrictedRoute && userSession?.user?.role === "USER") {
    return Response.redirect(
      new URL("/dashboard/user/pemesanan-saya", nextUrl),
    );
  }

  const isAdminRestrictedRoute = adminRestrictedRoutes.includes(
    nextUrl.pathname,
  );
  if (isAdminRestrictedRoute && userSession?.user?.role !== "ADMIN") {
    return Response.redirect(new URL("/dashboard", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",

    // "/((?!.+\\.[\\w]+$|_next).*)",
    // "/",
    // "/(api|trpc)(.*)",
  ],
};
