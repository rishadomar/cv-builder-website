// app/sitemap.xml/route.ts
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
       </url>
     `
         )
         .join('')}
   </urlSet>`;
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

    const sitemap = generateSiteMap(pages);

    return new Response(sitemap, {
        headers: {
            'Content-Type': 'text/xml'
        }
    });
}
