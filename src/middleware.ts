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

  // Check if the current path matches any public route or is a child of a public route
  const isPublicRoute = publicRoutes.some((route) => {
    // Exact match
    if (nextUrl.pathname === route) return true;

    // Check if it's a dynamic route (e.g., /laboratorium/[slug])
    // Split both paths into segments
    const routeSegments = route.split("/").filter(Boolean);
    const pathSegments = nextUrl.pathname.split("/").filter(Boolean);

    // If the current path has fewer segments than the route, it can't be a match
    if (routeSegments.length > pathSegments.length) return false;

    // Check if all segments of the route match the beginning of the path
    return routeSegments.every(
      (segment, index) => segment === pathSegments[index],
    );
  });

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

  const isStaffRestrictedRoute = staffRestrictedRoutes.some((route) => {
    // Exact match
    if (nextUrl.pathname === route) return true;
    // Check if the current path starts with a restricted route path
    // This handles cases like "/dashboard/edit-lab/123"
    return nextUrl.pathname.startsWith(route);
  });

  if (isStaffRestrictedRoute && userSession?.user?.role === "USER") {
    return Response.redirect(
      new URL("/dashboard/user/pemesanan-saya", nextUrl),
    );
  }

  const isAdminRestrictedRoute = adminRestrictedRoutes.some((route) => {
    // Exact match
    if (nextUrl.pathname === route) return true;
    // Check if the current path starts with a restricted route path
    return nextUrl.pathname.startsWith(route);
  });

  if (isAdminRestrictedRoute && userSession?.user?.role !== "ADMIN") {
    return Response.redirect(new URL("/dashboard", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
