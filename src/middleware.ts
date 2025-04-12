import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { locales, defaultLocale } from "@/lib/i18n/settings";

// Fonction non utilisée actuellement mais conservée pour une utilisation future
function _getLocale(request: NextRequest): string {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // Utilisation de type assertion pour éviter l'erreur de types
  const languages = new Negotiator({ headers: negotiatorHeaders as any }).languages();
  const localeList = [...locales];

  try {
    return matchLocale(languages, localeList, defaultLocale);
  } catch (_e) {
    return defaultLocale;
  }
}

export function middleware(request: NextRequest) {
  // Si c'est la racine ou une route sans locale, rediriger vers la locale par défaut
  const pathname = request.nextUrl.pathname;

  if (pathname === "/") {
    return NextResponse.redirect(new URL(`/fr`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
