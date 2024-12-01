import React from 'react';

const Links = [
    {
        title: 'FAQs',
        link: '/faqs'
    },
    {
        title: 'Billing',
        link: '/billing'
    },
    {
        title: 'Terms and Conditions',
        link: '/terms'
    },
    {
        title: 'Privacy policy',
        link: '/privacy'
    }
];

type QuickLinksProps = {};

export const QuickLinks: React.FC<QuickLinksProps> = () => {
    return (
        <div className='space-y-2'>
            {Links.map((link, index) => (
                <a key={index} href={link.link} className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                    {link.title}
                </a>
            ))}
        </div>
    );
};
