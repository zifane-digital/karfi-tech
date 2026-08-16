import {
  NextRequest,
  NextResponse,
} from "next/server";

const SESSION_COOKIE = "siikh_session";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (
    pathname.startsWith("/images") || pathname.match(/\.(jpg|png|svg|webp|jpeg|ico|css|js|mp4)$/)
  ){
    return NextResponse.next();
  }

  // ================================================
  // ROUTES PUBLIQUES
  // ================================================

  const publicRoutes = [
    "/",
    "/login",
    "/a-propos",
    "/actualites",
    "/video",
    "/poles",
    "/auth/login",
    "/auth/logout",
    "/images",
  ];

  const isPublicRoute = publicRoutes.some(
    (route) =>
      pathname === route ||
      (route !== "/" && pathname.startsWith(`${route}/`))
  );

  // ================================================
  // API PUBLIQUES
  // ================================================

  if (
    pathname === "/api/auth/login" ||
    pathname === "/api/auth/logout"
  ) {
    return NextResponse.next();
  }

  // ================================================
  // COOKIE SESSION
  // ================================================

  const sessionToken =
    request.cookies.get(SESSION_COOKIE)?.value;

  // ================================================
  // UTILISATEUR NON CONNECTÉ
  // ================================================

  if (!sessionToken && !isPublicRoute) {
    const loginUrl = new URL(
      "/login",
      request.url
    );

    loginUrl.searchParams.set(
      "redirect",
      pathname
    );

    return NextResponse.redirect(loginUrl);
  }

  // ================================================
  // UTILISATEUR CONNECTÉ
  // ================================================

  if (
    sessionToken &&
    pathname === "/login"
  ) {
    return NextResponse.redirect(
      new URL("/dashboard", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
