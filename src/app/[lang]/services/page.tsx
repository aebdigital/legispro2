import { Locale } from '@/i18n-config';
import { getDictionary } from '@/get-dictionary';
import Link from 'next/link';

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
