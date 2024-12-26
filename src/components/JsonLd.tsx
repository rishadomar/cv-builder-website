// components/JsonLd.tsx
export default function JsonLd() {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'CV Builder',
        applicationCategory: 'BusinessApplication',
        description: 'AI-powered CV builder for creating professional resumes',
        operatingSystem: 'Web',
        url: 'https://cvbuilder.co.za',
        offers: {
            '@type': 'Offer',
            price: '59.00',
            priceCurrency: 'ZAR'
        }
    };

    return <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
