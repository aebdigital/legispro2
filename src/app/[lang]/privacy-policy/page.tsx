import { Locale, i18n } from '@/i18n-config';
import { getDictionary } from '@/get-dictionary';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { BASE_URL } from '@/pathnames';

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
    const { lang } = await params;
    const dictionary = await getDictionary(lang);

    const title = dictionary.meta.privacyTitle || `${dictionary.privacy.title} | LegisPro`;
    const description = dictionary.meta.privacyDescription || dictionary.privacy.subtitle;
    const url = `${BASE_URL}/${lang}/privacy-policy`;

    const alternateLanguages: Record<string, string> = {};
    for (const locale of i18n.locales) {
        alternateLanguages[locale] = `${BASE_URL}/${locale}/privacy-policy`;
    }

    return {
        title,
        description,
        robots: { index: true, follow: true },
        alternates: {
            canonical: url,
            languages: alternateLanguages,
        },
    };
}

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
