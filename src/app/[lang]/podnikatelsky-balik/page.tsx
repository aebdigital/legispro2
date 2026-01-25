import { Locale } from '@/i18n-config';
import { getDictionary } from '@/get-dictionary';
import Link from 'next/link';

export default async function PodnikatelskyBalikPage({ params }: { params: Promise<{ lang: Locale }> }) {
    const { lang } = await params;
    const dictionary = await getDictionary(lang);
    const service = (dictionary.services.items as Record<string, any>)['business-package'];

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
                                <h4>Máte otázky?</h4>
                                <p>Neváhajte nás kontaktovať</p>
                                <Link href={`/${lang}/contact`} className="btn btn-primary btn-sm">
                                    {lang === 'sk' ? 'Kontaktovať nás' : lang === 'en' ? 'Contact Us' : lang === 'de' ? 'Kontaktieren Sie uns' : 'Contactez-nous'}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
