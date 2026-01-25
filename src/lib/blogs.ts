import { supabase } from './supabase'

const SITE_ID = 'ee5a487d-0eb2-4a1c-8099-eb6b156d4b55'

export async function getDynamicBlogs(lang: string) {
    const { data, error } = await supabase
        .from('legis_blogs')
        .select(`
      *,
      translations:legis_blog_translations(*)
    `)
        .eq('site_id', SITE_ID)
        .eq('is_published', true)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching dynamic blogs:', error)
        return {}
    }

    // Format into the same structure as the dictionary
    const formattedBlogs: any = {}

    data.forEach((blog: any) => {
        const translation = blog.translations.find((t: any) => t.lang === lang) || blog.translations.find((t: any) => t.lang === 'sk')

        if (translation) {
            formattedBlogs[blog.slug] = {
                title: translation.title,
                description: translation.description,
                excerpt: translation.excerpt,
                category: translation.category,
                date: new Date(blog.created_at).toLocaleDateString(lang === 'sk' ? 'sk-SK' : 'en-US', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                }),
                readingTime: translation.reading_time,
                image: blog.image_url || '/sources/images/blog-1.jpg',
                content: translation.content,
                tags: translation.tags || [],
                isDynamic: true
            }
        }
    })

    return formattedBlogs
}

export async function getDynamicBlogBySlug(slug: string, lang: string) {
    const { data, error } = await supabase
        .from('legis_blogs')
        .select(`
        *,
        translations:legis_blog_translations(*)
      `)
        .eq('site_id', SITE_ID)
        .eq('slug', slug)
        .eq('is_published', true)
        .single()

    if (error || !data) {
        return null
    }

    const translation = data.translations.find((t: any) => t.lang === lang) || data.translations.find((t: any) => t.lang === 'sk')

    if (!translation) return null

    return {
        title: translation.title,
        description: translation.description,
        excerpt: translation.excerpt,
        category: translation.category,
        date: new Date(data.created_at).toLocaleDateString(lang === 'sk' ? 'sk-SK' : 'en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }),
        readingTime: translation.reading_time,
        image: data.image_url || '/sources/images/blog-1.jpg',
        content: translation.content,
        tags: translation.tags || [],
        isDynamic: true
    }
}
