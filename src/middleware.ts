import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { generateCSRFToken } from "./lib/csrf";
import { NextRequest, NextResponse } from "next/server";
import { allowedOrigins } from "./lib/cors";

const intlMiddleware = createMiddleware(routing);

export function middleware(req: NextRequest) {
  const res = intlMiddleware(req);

  const pathname = req.nextUrl.pathname;
  const method = req.method;

  const isApi = pathname.startsWith("/api");
  const isStatic = pathname.match(/(\.\w+$)/);

  const origin = req.headers.get("origin") ?? "";

  if (isApi && allowedOrigins.includes(origin)) {
    res.headers.set("Access-Control-Allow-Origin", origin);
    res.headers.set("Access-Control-Allow-Credentials", "true");
  }

  const locales = routing.locales;

  const isDashboardRoute = locales.some((locale) =>
    pathname.startsWith(`/${locale}/dashboard`)
  );

  if (isDashboardRoute) {
    const session = req.cookies.get("session")?.value;

    if (!session) {
      const locale = pathname.split("/")[1] || "id";
      const signInUrl = `/${locale}/auth/sign-in`;
      return NextResponse.redirect(new URL(signInUrl, req.url));
    }
  }

  if (!isApi && !isStatic && method === "GET") {
    const token = req.cookies.get("csrf_token")?.value;
    if (!token) {
      const csrf = generateCSRFToken();
      res.cookies.set("csrf_token", csrf, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        path: "/",
      });
    }
  }

  return res;
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
