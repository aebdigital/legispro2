import { i18n, Locale } from '@/i18n-config';
import { getAllLocalizedUrls, getInternalPath, BASE_URL } from '@/pathnames';

interface HreflangTagsProps {
    currentPath: string; // The path after locale, e.g., '/services' or '/services/gdpr'
    currentLocale: Locale;
}

/**
 * Generates hreflang link tags for SEO
 * These tell search engines about language/region alternatives for a page
 */
export default function HreflangTags({ currentPath, currentLocale }: HreflangTagsProps) {
    // Get the internal path from the current localized path
    const internalPath = getInternalPath(currentPath, currentLocale);

    // Get all localized URLs for this internal path
    const localizedUrls = getAllLocalizedUrls(internalPath);

    return (
        <>
            {/* Hreflang tags for each language */}
            {i18n.locales.map((locale) => (
                <link
                    key={locale}
                    rel="alternate"
                    hrefLang={locale}
                    href={localizedUrls[locale]}
                />
            ))}

            {/* x-default points to the default language (Slovak) */}
            <link
                rel="alternate"
                hrefLang="x-default"
                href={localizedUrls[i18n.defaultLocale]}
            />

            {/* Canonical URL for current page */}
            <link
                rel="canonical"
                href={localizedUrls[currentLocale]}
            />
        </>
    );
}

/**
 * Get hreflang metadata for Next.js generateMetadata
 * Use this in page-level metadata generation
 */
export function getHreflangMetadata(currentPath: string, currentLocale: Locale) {
    const internalPath = getInternalPath(currentPath, currentLocale);
    const localizedUrls = getAllLocalizedUrls(internalPath);

    return {
        canonical: localizedUrls[currentLocale],
        languages: localizedUrls,
    };
}
