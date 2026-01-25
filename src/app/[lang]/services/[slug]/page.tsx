import { Locale } from '@/i18n-config';
import { getDictionary } from '@/get-dictionary';
import { notFound } from 'next/navigation';
import Link from 'next/link';

import ServiceSidebar from '@/components/ServiceSidebar';

import SmoothScrollLink from '@/components/SmoothScrollLink';

export default async function ServiceDetailPage({ params }: { params: Promise<{ lang: Locale, slug: string }> }) {
    const { lang, slug } = await params;
    const dictionary = await getDictionary(lang);
    const service = (dictionary.services.items as Record<string, any>)[slug];

    if (!service) {
        notFound();
    }

    // Pages that use the simple sticky widget layout (only business-package and training-webinars)
    const useSimpleLayout = ['business-package', 'training-webinars'].includes(slug);

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
                            <SmoothScrollLink href="#obsah" className="btn btn-secondary">
                                <span>{dictionary.services.moreInfoBtn}</span>
                            </SmoothScrollLink>
                        </div>
                    </div>
                </div>
            </section>

            {/* Service Content */}
            {useSimpleLayout ? (
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
                                    <h4>
                                        {lang === 'sk' ? 'Máte otázky?' :
                                            lang === 'en' ? 'Do you have questions?' :
                                                lang === 'de' ? 'Haben Sie Fragen?' :
                                                    'Avez-vous des questions ?'}
                                    </h4>
                                    <p>
                                        {lang === 'sk' ? 'Neváhajte nás kontaktovať' :
                                            lang === 'en' ? 'Do not hesitate to contact us' :
                                                lang === 'de' ? 'Zögern Sie nicht, uns zu kontaktieren' :
                                                    'N\'hésitez pas à nous contacter'}
                                    </p>
                                    <Link href={`/${lang}/contact`} className="btn btn-primary btn-sm">
                                        {lang === 'sk' ? 'Kontaktovať nás' : lang === 'en' ? 'Contact Us' : lang === 'de' ? 'Kontaktieren Sie uns' : 'Contactez-nous'}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                <section id="obsah" className="service-content fade-in-up">
                    <div className="container">
                        <div className="service-content-grid">
                            <div className="service-main">
                                <h2>{service.mainContentTitle || service.title}</h2>
                                {service.mainContentIntro && (
                                    <p className="main-content-intro">{service.mainContentIntro}</p>
                                )}
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

                            <ServiceSidebar dictionary={dictionary} lang={lang} currentSlug={slug} />
                        </div>
                    </div>
                </section>
            )}
        </main>
    );
}
