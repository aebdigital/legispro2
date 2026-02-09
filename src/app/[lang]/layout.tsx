import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import { i18n, type Locale } from '../../i18n-config';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Location from '../../components/Location';
import CookieConsent from '../../components/CookieConsent';
import { getDictionary } from '../../get-dictionary';
import { getAllLocalizedUrls } from '../../pathnames';

const inter = Inter({ subsets: ['latin'] });

// Generate metadata dynamically based on language
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const locale = lang as Locale;
    const dictionary = await getDictionary(locale);

    // Get all language URLs for the homepage
    const languageUrls = getAllLocalizedUrls('/');

    return {
        title: dictionary.meta?.title || 'LegisPro, s.r.o.',
        description: dictionary.meta?.description || dictionary.hero?.description || 'Professional Legal Services',
        icons: {
            icon: '/favicon.png',
            shortcut: '/favicon.png',
        },
        alternates: {
            canonical: languageUrls[locale],
            languages: languageUrls,
        },
        openGraph: {
            title: dictionary.meta?.title || 'LegisPro, s.r.o.',
            description: dictionary.meta?.description || dictionary.hero?.description,
            url: languageUrls[locale],
            siteName: 'LegisPro',
            locale: locale === 'sk' ? 'sk_SK' : locale === 'de' ? 'de_DE' : locale === 'fr' ? 'fr_FR' : 'en_US',
            type: 'website',
        },
    };
}

export async function generateStaticParams() {
    return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const locale = lang as Locale;
    const dictionary = await getDictionary(locale);

    // Get all language URLs for hreflang tags
    const languageUrls = getAllLocalizedUrls('/');

    return (
        <html lang={locale}>
            <head>
                {/* Google Fonts */}
                <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Crimson+Text:wght@400;600;700&display=swap" rel="stylesheet" />

                {/* Hreflang tags for SEO */}
                {i18n.locales.map((loc) => (
                    <link
                        key={loc}
                        rel="alternate"
                        hrefLang={loc}
                        href={languageUrls[loc]}
                    />
                ))}
                <link
                    rel="alternate"
                    hrefLang="x-default"
                    href={languageUrls[i18n.defaultLocale]}
                />
            </head>
            <body className={`${inter.className} legacy-styles`}>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'LegalService',
                            name: 'LegisPro, s.r.o.',
                            description: dictionary.meta?.description,
                            url: 'https://legispro.sk',
                            telephone: '+421948528265',
                            email: 'office@legispro.sk',
                            address: {
                                '@type': 'PostalAddress',
                                streetAddress: 'Sládkovičova 1',
                                addressLocality: 'Nitra',
                                postalCode: '949 01',
                                addressCountry: 'SK',
                            },
                            geo: {
                                '@type': 'GeoCoordinates',
                                latitude: 48.3146597792368,
                                longitude: 18.084437315673,
                            },
                            openingHoursSpecification: {
                                '@type': 'OpeningHoursSpecification',
                                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                                opens: '08:00',
                                closes: '17:00',
                            },
                            areaServed: {
                                '@type': 'Country',
                                name: 'Slovakia',
                            },
                            priceRange: '$$',
                            image: 'https://legispro.sk/sources/images/legal-office-1.jpg',
                            sameAs: [],
                        }),
                    }}
                />
                <Header lang={locale} dictionary={dictionary} />
                {children}
                <Location dictionary={dictionary} />
                <Footer lang={locale} dictionary={dictionary} />
                <CookieConsent lang={locale} />
            </body>
        </html>
    );
}
