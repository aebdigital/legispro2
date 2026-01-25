import { Locale } from '@/i18n-config';
import { getDictionary } from '@/get-dictionary';
import Link from 'next/link';
import { getDynamicBlogs } from '@/lib/blogs';

export default async function BlogPage({ params }: { params: Promise<{ lang: Locale }> }) {
    const { lang } = await params;
    const dictionary = await getDictionary(lang);

    // Fetch dynamic blogs from Supabase
    const dynamicPosts = await getDynamicBlogs(lang);

    // Merge static and dynamic posts
    const allPosts = {
        ...dictionary.blog.posts,
        ...dynamicPosts
    };

    const posts = Object.entries(allPosts);

    return (
        <main className="blog-page">
            <section className="service-hero blog-hero">
                <div className="service-hero-background">
                    <img src="/sources/images/blog-1.jpg" alt="Blog" />
                </div>
                <div className="service-hero-overlay"></div>
                <div className="container">
                    <div className="service-hero-content">
                        <h1>{dictionary.blog.title}</h1>
                        <p>{dictionary.blog.description}</p>
                    </div>
                </div>
            </section>

            <section className="blog-articles">
                <div className="container">
                    {/* Featured Article */}
                    {posts.length > 0 && (
                        <article className="featured-article">
                            <div className="featured-content">
                                <div className="featured-image">
                                    <img src={(posts[0][1] as any).image} alt={(posts[0][1] as any).title} />
                                    <div className="article-category featured">{dictionary.blog.featuredLabel}</div>
                                </div>
                                <div className="featured-text">
                                    <Link href={`/${lang}/blog/${posts[0][0]}`} className="featured-title-link">
                                        <h2>{(posts[0][1] as any).title}</h2>
                                    </Link>
                                    <p className="article-excerpt">{(posts[0][1] as any).description}</p>
                                    <div className="article-meta">
                                        <span className="article-date">{(posts[0][1] as any).date}</span>
                                        <span className="article-reading-time">{(posts[0][1] as any).readingTime}</span>
                                    </div>
                                    <Link href={`/${lang}/blog/${posts[0][0]}`} className="btn btn-primary">
                                        {dictionary.blog.readMore}
                                    </Link>
                                </div>
                            </div>
                        </article>
                    )}

                    <div className="articles-grid">
                        {posts.slice(1).map(([slug, post]: [string, any]) => (
                            <article key={slug} className="article-card">
                                <Link href={`/${lang}/blog/${slug}`}>
                                    <div className="article-image">
                                        <img src={post.image} alt={post.title} />
                                        <div className="article-category">{post.category}</div>
                                    </div>
                                    <div className="article-content">
                                        <h3>{post.title}</h3>
                                        <p>{post.description}</p>
                                        <div className="article-meta">
                                            <span className="article-date">{post.date}</span>
                                            <span className="article-reading-time">{post.readingTime}</span>
                                        </div>
                                        <span className="article-link">{dictionary.blog.readMore}</span>
                                    </div>
                                </Link>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
