import { Locale, i18n } from '@/i18n-config';
import { getDictionary } from '@/get-dictionary';
import Link from 'next/link';
import { Metadata } from 'next';
import { BASE_URL, getLocalizedPath } from '@/pathnames';

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
    const { lang } = await params;
    const dictionary = await getDictionary(lang);

    const title = dictionary.meta.servicesTitle || `${dictionary.services.title} | LegisPro`;
    const description = dictionary.meta.servicesDescription || dictionary.services.subtitle;
    const localizedPath = getLocalizedPath('/services', lang);
    const url = `${BASE_URL}${localizedPath}`;

    const alternateLanguages: Record<string, string> = {};
    for (const locale of i18n.locales) {
        alternateLanguages[locale] = `${BASE_URL}${getLocalizedPath('/services', locale)}`;
    }

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: 'website',
            url,
            siteName: 'LegisPro',
            locale: lang === 'sk' ? 'sk_SK' : lang === 'de' ? 'de_DE' : lang === 'fr' ? 'fr_FR' : 'en_US',
        },
        alternates: {
            canonical: url,
            languages: alternateLanguages,
        },
    };
}

export default async function ServicesPage({ params }: { params: Promise<{ lang: Locale }> }) {
    const { lang } = await params;
    const dictionary = await getDictionary(lang);

    return (
        <main>
            {/* Hero Section */}
            <section className="service-hero fade-in-up">
                <div className="service-hero-background">
                    <img src="/sources/images/legal-office-1.jpg" alt="Services - LegisPro" />
                </div>
                <div className="service-hero-overlay"></div>
                <div className="container">
                    <div className="service-hero-content">
                        <h1>{dictionary.services.title}</h1>
                        <p>{dictionary.services.subtitle}</p>
                    </div>
                </div>
            </section>

            {/* Services Grid Section */}
            <section className="services-list fade-in-up">
                <div className="container">
                    <div className="services-grid">
                        {Object.entries(dictionary.services.items).map(([slug, service]: [string, any]) => (
                            <Link key={slug} href={`/${lang}/services/${slug}`} className="service-card">
                                <div className="service-image">
                                    <img src={service.image} alt={service.title} />
                                </div>
                                <div className="service-content">
                                    <h6>{service.title}</h6>
                                    <p>{service.description}</p>
                                </div>
                                <div className="service-category">{service.category}</div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
