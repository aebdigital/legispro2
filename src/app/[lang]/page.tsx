import { Locale, i18n } from '@/i18n-config';
import { getDictionary } from '@/get-dictionary';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

import HeroSlider from '@/components/home/HeroSlider';
import { BASE_URL } from '@/pathnames';

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
    const { lang } = await params;
    const dictionary = await getDictionary(lang);

    const title = dictionary.meta.title;
    const description = dictionary.meta.description;
    const url = `${BASE_URL}/${lang}`;

    const alternateLanguages: Record<string, string> = {};
    for (const locale of i18n.locales) {
        alternateLanguages[locale] = `${BASE_URL}/${locale}`;
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
            images: [
                {
                    url: `${BASE_URL}/sources/images/legal-office-1.jpg`,
                    width: 1200,
                    height: 630,
                    alt: 'LegisPro - Law Firm',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [`${BASE_URL}/sources/images/legal-office-1.jpg`],
        },
        alternates: {
            canonical: url,
            languages: alternateLanguages,
        },
    };
}

export default async function Home({ params }: { params: Promise<{ lang: Locale }> }) {
    const { lang } = await params;
    const dictionary = await getDictionary(lang);

    return (
        <main>
            <HeroSlider dictionary={dictionary} lang={lang} />


            {/* Services Section */}
            <section className="services fade-in-up" id="services">
                <div className="container">
                    <div className="services-header">
                        <div className="services-text">
                            <h2>{dictionary.services.title}</h2>
                            <p>{dictionary.services.subtitle}</p>
                        </div>
                        <Link href={`/${lang}/services`} className="btn btn-dark">
                            {dictionary.services.exploreBtn}
                        </Link>
                    </div>
                    <div className="services-grid">
                        {Object.entries(dictionary.services.items).slice(0, 3).map(([key, service]: [string, any]) => (
                            <Link key={key} href={`/${lang}/services/${key}`} className="service-card">
                                <div className="service-image">
                                    <img
                                        src={service.image || '/sources/images/legal-office-1.jpg'}
                                        alt={service.title}
                                    />
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

            {/* Process Section */}
            <section className="process fade-in-up">
                <div className="container">
                    <div className="process-content">
                        <div className="process-steps">
                            {dictionary.process.steps.map((step: any, index: number) => (
                                <div key={step.id} className={`step-item ${index === 1 ? 'dark' : 'light'}`}>
                                    <div className="step-header">
                                        <h5>{step.title}</h5>
                                        <span className="step-number">{step.id}</span>
                                    </div>
                                    <p>{step.description}</p>
                                </div>
                            ))}
                        </div>
                        <div className="process-text">
                            <h2>{dictionary.process.title}</h2>
                            <p>{dictionary.process.description}</p>
                            <Link href={`/${lang}/contact`} className="btn btn-dark">
                                {dictionary.process.ctaBtn}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision Section */}
            <section className="video-section fade-in-up">
                <div className="video-background">
                    <img src="/sources/images/criminal-law-1.jpg" alt="Justice and Legal Services" />
                </div>
                <div className="video-overlay"></div>
                <div className="video-content">
                    <div className="video-text">
                        <h2>{dictionary.vision.title}</h2>
                        <p>{dictionary.vision.description}</p>
                    </div>
                    <div className="vision-values">
                        {dictionary.vision.values.map((value: string, index: number) => (
                            <div key={index} className="value-item">
                                <svg className="check-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>{value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Blog Section */}
            <section className="blog fade-in-up" id="blog">
                <div className="container">
                    <div className="blog-header">
                        <div className="blog-text">
                            <h2>{dictionary.blog.title}</h2>
                            <p>{dictionary.blog.description}</p>
                        </div>
                        <Link href={`/${lang}/blog`} className="btn btn-dark">
                            {dictionary.blog.exploreBtn}
                        </Link>
                    </div>
                    <div className="blog-grid">
                        {Object.entries(dictionary.blog.posts).slice(0, 3).map(([slug, post]: [string, any]) => (
                            <article key={slug} className="blog-card">
                                <Link href={`/${lang}/blog/${slug}`}>
                                    <div className="blog-image">
                                        <img src={post.image} alt={post.title} />
                                    </div>
                                    <div className="blog-content">
                                        <h6>{post.title}</h6>
                                        <p>{post.excerpt}</p>
                                        <span className="blog-link">
                                            {dictionary.blog.readMore}
                                        </span>
                                    </div>
                                    <div className="blog-category">{post.category}</div>
                                </Link>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="about fade-in-up" id="about">
                <div className="container">
                    <div className="about-content">
                        <div className="about-text">
                            <h2>{dictionary.about.title}</h2>
                            <p>{dictionary.about.description}</p>

                            <div className="about-founder">
                                <h3>{dictionary.about.founder.name}</h3>
                                <p>{dictionary.about.founder.description}</p>
                            </div>
                            <div className="about-buttons">
                                <Link href="#services" className="btn btn-dark">
                                    {dictionary.hero.learnMoreBtn}
                                </Link>
                                <Link href={`/${lang}/contact`} className="btn btn-outline">
                                    {dictionary.nav.contact}
                                </Link>
                            </div>
                        </div>
                        <div className="about-image">
                            <img src="/sources/images/legal-office-1.jpg" alt="Scales of Justice and Legal Books" />
                        </div>
                    </div>
                </div>
            </section>

        </main>
    );
}
