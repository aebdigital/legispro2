import { Locale, i18n } from './i18n-config';

// Route translations: internal path -> localized paths per language
export const pathnames: Record<string, Record<Locale, string>> = {
    '/': {
        en: '/',
        sk: '/',
        de: '/',
        fr: '/'
    },
    '/services': {
        en: '/services',
        sk: '/sluzby',
        de: '/dienstleistungen',
        fr: '/services'
    },
    '/contact': {
        en: '/contact',
        sk: '/kontakt',
        de: '/kontakt',
        fr: '/contact'
    },
    '/blog': {
        en: '/blog',
        sk: '/blog',
        de: '/blog',
        fr: '/blog'
    },
    '/podnikatelsky-balik': {
        en: '/business-package',
        sk: '/podnikatelsky-balik',
        de: '/unternehmenspaket',
        fr: '/forfait-entreprise'
    },
    '/skolenia-webinare': {
        en: '/training-webinars',
        sk: '/skolenia-webinare',
        de: '/schulungen-webinare',
        fr: '/formations-webinaires'
    }
};

// Base URL for the website
export const BASE_URL = 'https://legispro.sk';

/**
 * Get the localized path for a given internal path and locale
 * Example: getLocalizedPath('/services', 'sk') => '/sk/sluzby'
 */
export function getLocalizedPath(internalPath: string, locale: Locale): string {
    // Handle paths with dynamic segments (e.g., /services/commercial-law)
    const segments = internalPath.split('/').filter(Boolean);

    if (segments.length === 0) {
        return `/${locale}`;
    }

    // Check if first segment is a known route
    const firstSegment = '/' + segments[0];
    const translation = pathnames[firstSegment];

    if (translation) {
        const translatedFirst = translation[locale];
        const rest = segments.slice(1).join('/');
        return `/${locale}${translatedFirst}${rest ? '/' + rest : ''}`;
    }

    // No translation found, return with locale prefix
    return `/${locale}${internalPath}`;
}

/**
 * Get the internal path from a localized path
 * Example: getInternalPath('/sluzby', 'sk') => '/services'
 */
export function getInternalPath(localizedPath: string, locale: Locale): string {
    // Remove leading slash for easier processing
    const pathWithoutSlash = localizedPath.startsWith('/') ? localizedPath.slice(1) : localizedPath;
    const segments = pathWithoutSlash.split('/').filter(Boolean);

    if (segments.length === 0) {
        return '/';
    }

    // Check first segment against all translations for this locale
    const firstSegment = '/' + segments[0];

    for (const [internal, translations] of Object.entries(pathnames)) {
        if (translations[locale] === firstSegment) {
            const rest = segments.slice(1).join('/');
            return `${internal}${rest ? '/' + rest : ''}`;
        }
    }

    // No translation found, return as-is
    return localizedPath.startsWith('/') ? localizedPath : '/' + localizedPath;
}

/**
 * Get all localized versions of a path
 * Example: getAllLocalizedPaths('/services') => { en: '/en/services', sk: '/sk/sluzby', ... }
 */
export function getAllLocalizedPaths(internalPath: string): Record<Locale, string> {
    const result: Record<Locale, string> = {} as Record<Locale, string>;

    for (const locale of i18n.locales) {
        result[locale] = getLocalizedPath(internalPath, locale);
    }

    return result;
}

/**
 * Get full URLs for all language versions (for hreflang tags)
 * Example: getAllLocalizedUrls('/services') => { en: 'https://legispro.sk/en/services', ... }
 */
export function getAllLocalizedUrls(internalPath: string): Record<Locale, string> {
    const result: Record<Locale, string> = {} as Record<Locale, string>;

    for (const locale of i18n.locales) {
        result[locale] = `${BASE_URL}${getLocalizedPath(internalPath, locale)}`;
    }

    return result;
}

/**
 * Check if a path segment is a translated route for any locale
 * Returns the internal path if found, null otherwise
 */
export function findInternalPathFromSegment(segment: string, locale: Locale): string | null {
    const pathToCheck = '/' + segment;

    for (const [internal, translations] of Object.entries(pathnames)) {
        if (translations[locale] === pathToCheck) {
            return internal;
        }
    }

    return null;
}
