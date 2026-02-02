import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { i18n } from '@/i18n-config';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { secret, path, slug, type } = body;

        // Verify secret token
        if (secret !== process.env.REVALIDATE_SECRET) {
            return NextResponse.json(
                { error: 'Invalid secret token' },
                { status: 401 }
            );
        }

        // If a specific path is provided, revalidate it
        if (path) {
            revalidatePath(path);
            return NextResponse.json({
                revalidated: true,
                path,
                timestamp: new Date().toISOString(),
            });
        }

        // If type and slug are provided, revalidate all language versions
        if (type && slug) {
            const revalidatedPaths: string[] = [];

            for (const locale of i18n.locales) {
                let pagePath: string;

                switch (type) {
                    case 'blog':
                        pagePath = `/${locale}/blog/${slug}`;
                        break;
                    case 'service':
                        pagePath = `/${locale}/services/${slug}`;
                        break;
                    default:
                        pagePath = `/${locale}/${slug}`;
                }

                revalidatePath(pagePath);
                revalidatedPaths.push(pagePath);
            }

            // Also revalidate the blog listing and sitemap
            if (type === 'blog') {
                for (const locale of i18n.locales) {
                    revalidatePath(`/${locale}/blog`);
                }
                revalidatePath('/sitemap.xml');
            }

            return NextResponse.json({
                revalidated: true,
                paths: revalidatedPaths,
                timestamp: new Date().toISOString(),
            });
        }

        // If tag is provided, revalidate by tag
        if (body.tag) {
            revalidateTag(body.tag);
            return NextResponse.json({
                revalidated: true,
                tag: body.tag,
                timestamp: new Date().toISOString(),
            });
        }

        return NextResponse.json(
            { error: 'Missing required parameters: path, or type+slug, or tag' },
            { status: 400 }
        );
    } catch (error) {
        console.error('Revalidation error:', error);
        return NextResponse.json(
            { error: 'Failed to revalidate' },
            { status: 500 }
        );
    }
}

// Also support GET for easy testing (with secret in query)
export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const secret = searchParams.get('secret');
    const path = searchParams.get('path');

    if (secret !== process.env.REVALIDATE_SECRET) {
        return NextResponse.json(
            { error: 'Invalid secret token' },
            { status: 401 }
        );
    }

    if (!path) {
        return NextResponse.json(
            { error: 'Missing path parameter' },
            { status: 400 }
        );
    }

    revalidatePath(path);

    return NextResponse.json({
        revalidated: true,
        path,
        timestamp: new Date().toISOString(),
    });
}
