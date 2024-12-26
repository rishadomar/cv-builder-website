import { GetServerSideProps } from 'next';

const EXTERNAL_DATA_URL = 'https://cvbuilder.co.za';

function generateSiteMap(pages: string[]) {
    return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>${EXTERNAL_DATA_URL}</loc>
     </url>
     ${pages
         .map((page) => {
             return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}${page}`}</loc>
       </url>
     `;
         })
         .join('')}
   </urlset>
 `;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    const pages = [
        '/faqs',
        '/privacy',
        '/terms'
        // Add all your important pages
    ];

    const sitemap = generateSiteMap(pages);

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();

    return {
        props: {}
    };
};

export default function Sitemap() {
    return null;
}
