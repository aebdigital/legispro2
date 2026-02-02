import { Locale, i18n } from '@/i18n-config';
import { getDictionary } from '@/get-dictionary';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';

import { getDynamicBlogBySlug } from '@/lib/blogs';
import { BASE_URL } from '@/pathnames';

// Revalidate every hour to pick up new/updated blogs
export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale, slug: string }> }): Promise<Metadata> {
    const { lang, slug } = await params;
    const dictionary = await getDictionary(lang);

    // Try to get from dictionary first
    let post = (dictionary.blog.posts as Record<string, any>)[slug];

    // If not in dictionary, try to get from Supabase
    if (!post) {
        post = await getDynamicBlogBySlug(slug, lang);
    }

    if (!post) {
        return {
            title: 'Blog Post Not Found',
            description: 'The requested blog post could not be found.',
        };
    }

    const title = `${post.title} | LegisPro`;
    const description = post.excerpt || post.description;
    const image = post.image?.startsWith('http') ? post.image : `${BASE_URL}${post.image || '/sources/images/blog-1.jpg'}`;
    const url = `${BASE_URL}/${lang}/blog/${slug}`;

    // Generate alternates for all languages
    const alternateLanguages: Record<string, string> = {};
    for (const locale of i18n.locales) {
        alternateLanguages[locale] = `${BASE_URL}/${locale}/blog/${slug}`;
    }

    return {
        title,
        description,
        keywords: post.tags?.join(', '),
        authors: [{ name: 'LegisPro' }],
        openGraph: {
            title: post.title,
            description,
            type: 'article',
            publishedTime: post.date,
            url,
            siteName: 'LegisPro',
            locale: lang === 'sk' ? 'sk_SK' : lang === 'de' ? 'de_DE' : lang === 'fr' ? 'fr_FR' : 'en_US',
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description,
            images: [image],
        },
        alternates: {
            canonical: url,
            languages: alternateLanguages,
        },
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ lang: Locale, slug: string }> }) {
    const { lang, slug } = await params;
    const dictionary = await getDictionary(lang);

    // Try to get from dictionary first
    let post = (dictionary.blog.posts as Record<string, any>)[slug];

    // If not in dictionary, try to get from Supabase
    if (!post) {
        post = await getDynamicBlogBySlug(slug, lang);
    }

    if (!post) {
        notFound();
    }

    return (
        <main className="blog-post-detail">
            <section className="service-hero fade-in-up">
                <div className="service-hero-background">
                    <img src={post.image || '/sources/images/blog-1.jpg'} alt={post.title} />
                </div>
                <div className="service-hero-overlay"></div>
            </section>

            <section className="post-content section-padding">
                <div className="container">
                    <div className="post-header-clean" style={{ marginBottom: '3rem' }}>
                        <nav className="breadcrumb" style={{ marginBottom: '1.5rem', fontSize: '0.9rem', color: 'var(--gray)' }}>
                            <Link href={`/${lang}`} style={{ color: 'var(--primary-color)' }}>{dictionary.nav.home}</Link>
                            <span style={{ margin: '0 0.5rem' }}>›</span>
                            <Link href={`/${lang}/blog`} style={{ color: 'var(--primary-color)' }}>{dictionary.blog.title}</Link>
                            <span style={{ margin: '0 0.5rem' }}>›</span>
                            <span>{post.title}</span>
                        </nav>

                        <div className="post-meta" style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem' }}>
                            <span className="post-category" style={{ background: 'var(--primary-color)', color: 'white', padding: '2px 10px', borderRadius: '20px', fontSize: '0.8rem' }}>{post.category}</span>
                            <span className="post-date" style={{ color: 'var(--gray)', fontSize: '0.9rem' }}>{post.date}</span>
                            <span className="post-reading-time" style={{ color: 'var(--gray)', fontSize: '0.9rem' }}>{post.readingTime}</span>
                        </div>

                        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'var(--primary-color)', marginBottom: '1.5rem', lineHeight: '1.2' }}>{post.title}</h1>
                        <p className="post-excerpt" style={{ fontSize: '1.2rem', color: 'var(--gray)', fontStyle: 'italic', marginBottom: '2.5rem', maxWidth: '800px' }}>{post.description}</p>
                    </div>

                    <div className="post-layout">
                        <div className="post-main">
                            <div
                                className="content-rich-text"
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />
                        </div>
                        <aside className="post-sidebar">
                            <div className="sidebar-card">
                                <h3>{dictionary.blog.recentPosts}</h3>
                                {Object.entries(dictionary.blog.posts)
                                    .filter(([s]) => s !== slug)
                                    .slice(0, 3)
                                    .map(([s, p]: [string, any]) => (
                                        <Link key={s} href={`/${lang}/blog/${s}`} className="related-post-item" style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', textDecoration: 'none' }}>
                                            <img src={p.image} alt={p.title} style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }} />
                                            <div className="related-content">
                                                <h5 style={{ color: 'var(--primary-color)', fontSize: '0.95rem', marginBottom: '0.25rem', lineHeight: '1.4' }}>{p.title}</h5>
                                                <span style={{ fontSize: '0.8rem', color: 'var(--gray)' }}>{p.date}</span>
                                            </div>
                                        </Link>
                                    ))}
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </main>
    );
}
