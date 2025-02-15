import { blogApiSlice } from '@/lib/store/api/blogApiSlice';
import { getStore } from '@/lib/store/store';

const fetchBlogPosts = async () => {
    // Cannot use hooks in a non-React function, so we need to get the store and dispatch the action manually
    const store = getStore();
    return await store.dispatch(blogApiSlice.endpoints.getRecentPosts.initiate({ limit: 100 })).unwrap();
};

const EXTERNAL_DATA_URL = 'https://cvbuilder.co.za';

function generateSiteMap(pages: string[]) {
    return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>${EXTERNAL_DATA_URL}</loc>
     </url>
     ${pages
         .map(
             (page) => `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}${page}`}</loc>
           <changefreq>weekly</changefreq>
           <priority>${page.startsWith('/blog/') ? '0.8' : '0.5'}</priority>
       </url>
     `
         )
         .join('')}
   </urlset>`;
}

export async function GET() {
    const pages = [
        '/about-us',
        '/blog',
        '/careers',
        '/contact-us',
        '/cookie-policy',
        '/faqs',
        '/privacy',
        '/support',
        '/terms'
    ];

    try {
        const blogPosts = await fetchBlogPosts();

        let blogPostUrls: string[] = [];

        if ('items' in blogPosts) {
            // Generate blog post URLs from the fetched data
            blogPostUrls = blogPosts.items.map((post) => `/blog/${post.slug}`);
        }

        // Combine static pages and blog post URLs
        const allPages = [...pages, ...blogPostUrls];

        const sitemap = generateSiteMap(allPages);

        return new Response(sitemap, {
            headers: {
                'Content-Type': 'text/xml',
                'Cache-Control': 'public, max-age=86400, stale-while-revalidate'
            }
        });
    } catch (error) {
        console.error('Error generating sitemap:', error);

        // If blog posts can't be fetched, generate sitemap with just static pages
        const sitemap = generateSiteMap(pages);
        return new Response(sitemap, {
            headers: {
                'Content-Type': 'text/xml'
            }
        });
    }
}
