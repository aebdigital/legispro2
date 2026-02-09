import { Locale } from '@/i18n-config';
import { getDictionary } from '@/get-dictionary';
import { notFound } from 'next/navigation';

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ lang: Locale }> }) {
    const { lang } = await params;
    const dictionary = await getDictionary(lang);

    if (!dictionary.privacy) {
        return notFound();
    }

    return (
        <main className="privacy-page">
            {/* Hero Section */}
            <section className="service-hero fade-in-up">
                <div className="service-hero-background">
                    <img src="/sources/images/privacy-gdpr-1.jpg" alt={dictionary.privacy.title} />
                </div>
                <div className="service-hero-overlay"></div>
                <div className="container">
                    <div className="service-hero-content">
                        <h1>{dictionary.privacy.title}</h1>
                        <p>{dictionary.privacy.subtitle}</p>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="service-content fade-in-up">
                <div className="container">
                    <div className="gdpr-content">
                        <div
                            className="privacy-rich-text"
                            dangerouslySetInnerHTML={{ __html: dictionary.privacy.content }}
                        />
                    </div>
                </div>
            </section>
        </main>
    );
}
