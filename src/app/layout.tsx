import { inter } from './fonts';
import StoreProvider from '@/lib/store/StoreProvider';
import './globals.css';
import CookieLoader from '@/components/CookieLoader';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
    title: 'CV Builder using AI!',
    description: 'Create your professional CV easily with our AI-powered CV builder.',
    robots: 'noindex, nofollow',
    icons: {
        icon: [
            {
                url: '/favicon.ico',
                sizes: 'any'
            },
            {
                url: '/favicon-16x16.png',
                sizes: '16x16',
                type: 'image/png'
            },
            {
                url: '/favicon-32x32.png',
                sizes: '32x32',
                type: 'image/png'
            }
        ],
        apple: {
            url: '/apple-touch-icon.png',
            sizes: '180x180',
            type: 'image/png'
        },
        other: [
            {
                rel: 'android-chrome',
                url: '/android-chrome-192x192.png',
                sizes: '192x192'
            },
            {
                rel: 'android-chrome',
                url: '/android-chrome-512x512.png',
                sizes: '512x512'
            }
        ]
    }
};

{
    /* <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="manifest" href="/site.webmanifest"></link> 
https://favicon.io/logo-generator/

*/
}

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className={inter.className}>
                <StoreProvider>
                    <CookieLoader />
                    <div className='min-h-screen flex flex-col'>
                        <Navbar />
                        <main className='flex-1 relative'>
                            <div className='max-w-3xl mx-auto'>{children}</div>
                            <Toaster />
                        </main>
                    </div>
                </StoreProvider>
            </body>
        </html>
    );
}
