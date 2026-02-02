import { MetadataRoute } from 'next'
import { i18n, Locale } from '@/i18n-config'
import { pathnames, BASE_URL, getLocalizedPath } from '@/pathnames'
import { supabase } from '@/lib/supabase'

const SITE_ID = 'ee5a487d-0eb2-4a1c-8099-eb6b156d4b55'

// Service slugs from dictionary (these are static)
const SERVICE_SLUGS = [
    'commercial-law',
    'financial-law',
    'criminal-law',
    'start-ups-greenfield-projects',
    'real-estate',
    'due-diligence',
    'gdpr',
    'labour-law',
]

// Static blog slugs from dictionaries
const STATIC_BLOG_SLUGS = [
    'danove-kontroly-transfer-pricing',
    'judikatura-transfer-pricing',
    'zapocitanie-pohladavok',
]

async function getDynamicBlogSlugs(): Promise<string[]> {
    try {
        const { data, error } = await supabase
            .from('legis_blogs')
            .select('slug')
            .eq('site_id', SITE_ID)
            .eq('is_published', true)

        if (error || !data) {
            console.error('Error fetching blog slugs for sitemap:', error)
            return []
        }

        return data.map((blog: { slug: string }) => blog.slug)
    } catch (error) {
        console.error('Error in getDynamicBlogSlugs:', error)
        return []
    }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const locales = i18n.locales
    const now = new Date().toISOString()

    // Fetch dynamic blog slugs
    const dynamicBlogSlugs = await getDynamicBlogSlugs()
    const allBlogSlugs = [...new Set([...STATIC_BLOG_SLUGS, ...dynamicBlogSlugs])]

    const sitemapEntries: MetadataRoute.Sitemap = []

    // 1. Homepage for all locales
    for (const locale of locales) {
        sitemapEntries.push({
            url: `${BASE_URL}/${locale}`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 1.0,
            alternates: {
                languages: Object.fromEntries(
                    locales.map(l => [l, `${BASE_URL}/${l}`])
                ),
            },
        })
    }

    // 2. Static pages from pathnames (services, contact, blog list, etc.)
    const staticPages = Object.keys(pathnames).filter(path => path !== '/')

    for (const internalPath of staticPages) {
        for (const locale of locales) {
            const localizedPath = getLocalizedPath(internalPath, locale)
            sitemapEntries.push({
                url: `${BASE_URL}${localizedPath}`,
                lastModified: now,
                changeFrequency: 'monthly',
                priority: 0.8,
                alternates: {
                    languages: Object.fromEntries(
                        locales.map(l => [l, `${BASE_URL}${getLocalizedPath(internalPath, l)}`])
                    ),
                },
            })
        }
    }

    // 3. Service detail pages
    for (const serviceSlug of SERVICE_SLUGS) {
        for (const locale of locales) {
            const servicesPath = getLocalizedPath('/services', locale)
            sitemapEntries.push({
                url: `${BASE_URL}${servicesPath}/${serviceSlug}`,
                lastModified: now,
                changeFrequency: 'monthly',
                priority: 0.7,
                alternates: {
                    languages: Object.fromEntries(
                        locales.map(l => [l, `${BASE_URL}${getLocalizedPath('/services', l)}/${serviceSlug}`])
                    ),
                },
            })
        }
    }

    // 4. Blog post pages (static + dynamic)
    for (const blogSlug of allBlogSlugs) {
        for (const locale of locales) {
            sitemapEntries.push({
                url: `${BASE_URL}/${locale}/blog/${blogSlug}`,
                lastModified: now,
                changeFrequency: 'weekly',
                priority: 0.6,
                alternates: {
                    languages: Object.fromEntries(
                        locales.map(l => [l, `${BASE_URL}/${l}/blog/${blogSlug}`])
                    ),
                },
            })
        }
    }

    // 5. Privacy policy for all locales
    for (const locale of locales) {
        sitemapEntries.push({
            url: `${BASE_URL}/${locale}/privacy-policy`,
            lastModified: now,
            changeFrequency: 'yearly',
            priority: 0.3,
            alternates: {
                languages: Object.fromEntries(
                    locales.map(l => [l, `${BASE_URL}/${l}/privacy-policy`])
                ),
            },
        })
    }

    return sitemapEntries
}

// Revalidate sitemap every hour to pick up new blogs
export const revalidate = 3600
