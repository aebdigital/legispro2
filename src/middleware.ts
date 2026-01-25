import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18n, Locale } from './i18n-config';
import { findInternalPathFromSegment, pathnames } from './pathnames';

import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

function getLocale(request: NextRequest): string | undefined {
    // Negotiator expects plain object so we need to transform headers
    const negotiatorHeaders: Record<string, string> = {};
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

    // @ts-ignore locales are readonly
    const locales: string[] = i18n.locales;

    // Use negotiator and intl-localematcher to get best locale
    let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
        locales
    );

    const locale = matchLocale(languages, locales, i18n.defaultLocale);

    return locale;
}

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Check if there is any supported locale in the pathname
    const pathnameIsMissingLocale = i18n.locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
        const locale = getLocale(request);

        // e.g. incoming request is /products
        // The new URL is now /sk/products
        return NextResponse.redirect(
            new URL(
                `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
                request.url
            )
        );
    }

    // Extract locale and path from URL
    const segments = pathname.split('/').filter(Boolean);
    const locale = segments[0] as Locale;

    if (!i18n.locales.includes(locale)) {
        return NextResponse.next();
    }

    // Get the path after the locale
    const pathAfterLocale = '/' + segments.slice(1).join('/');
    const firstPathSegment = segments[1];

    // Check if the first path segment is a translated route
    if (firstPathSegment) {
        const internalPath = findInternalPathFromSegment(firstPathSegment, locale);

        if (internalPath && internalPath !== '/' + firstPathSegment) {
            // This is a translated path, rewrite to internal path
            // e.g., /sk/sluzby -> /sk/services (internally)
            const restOfPath = segments.slice(2).join('/');
            const rewritePath = `/${locale}${internalPath}${restOfPath ? '/' + restOfPath : ''}`;

            return NextResponse.rewrite(new URL(rewritePath, request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    // Matcher ignoring `/_next/` and `/api/`
    matcher: ['/((?!api|_next/static|_next/image|sources|favicon.ico).*)'],
};
