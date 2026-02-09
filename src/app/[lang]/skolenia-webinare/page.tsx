import { Locale, i18n } from '@/i18n-config';
import { getDictionary } from '@/get-dictionary';
import Link from 'next/link';
import { Metadata } from 'next';
import { BASE_URL, getLocalizedPath } from '@/pathnames';

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
    const { lang } = await params;
    const dictionary = await getDictionary(lang);

    const title = dictionary.meta.trainingTitle || `${(dictionary.services.items as Record<string, any>)['training-webinars']?.title} | LegisPro`;
    const description = dictionary.meta.trainingDescription || (dictionary.services.items as Record<string, any>)['training-webinars']?.description;
    const localizedPath = getLocalizedPath('/skolenia-webinare', lang);
    const url = `${BASE_URL}${localizedPath}`;

    const alternateLanguages: Record<string, string> = {};
    for (const locale of i18n.locales) {
        alternateLanguages[locale] = `${BASE_URL}${getLocalizedPath('/skolenia-webinare', locale)}`;
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

export default async function SkoleniaWebinarePage({ params }: { params: Promise<{ lang: Locale }> }) {
    const { lang } = await params;
    const dictionary = await getDictionary(lang);
    const service = (dictionary.services.items as Record<string, any>)['training-webinars'];

    return (
        <main className="service-detail">
            {/* Service Hero */}
            <section className="service-hero fade-in-up">
                <div className="service-hero-background">
                    <img src={service.image} alt={service.title} />
                </div>
                <div className="service-hero-overlay"></div>
                <div className="container">
                    <div className="service-hero-content">
                        <h1>{service.title}</h1>
                        <p>{service.description}</p>
                        <div className="service-hero-buttons">
                            <Link href={`/${lang}/contact`} className="btn btn-primary">
                                <span>{dictionary.hero.bookBtn}</span>
                            </Link>
                            <a href="#obsah" className="btn btn-secondary">
                                <span>{dictionary.services.moreInfoBtn}</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Service Content */}
            <section id="obsah" className="service-content fade-in-up">
                <div className="container">
                    <div className="content-with-image">
                        <div className="content-text">
                            {service.mainContent && (
                                <div
                                    className="main-content-rich"
                                    dangerouslySetInnerHTML={{ __html: service.mainContent }}
                                />
                            )}

                            {service.features && service.features.map((feature: any, index: number) => (
                                <div key={index} className="service-feature">
                                    <h3>{feature.title}</h3>
                                    <p>{feature.description}</p>
                                </div>
                            ))}
                        </div>

                        <div className="content-image">
                            <div className="sidebar-widget">
                                <h4>{dictionary.common.sidebar.title}</h4>
                                <p>{dictionary.common.sidebar.description}</p>
                                <Link href={`/${lang}/contact`} className="btn btn-primary btn-sm">
                                    {dictionary.common.sidebar.button}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
