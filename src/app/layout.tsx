import { inter } from './fonts';
import StoreProvider from '@/lib/store/StoreProvider';
import './globals.css';
import CookieLoader from '@/components/CookieLoader';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
    title: 'CV Builder using AI!',
    description: 'Create your professional CV easily with our AI-powered CV builder.',
    robots: 'noindex, nofollow',
    icons: {
        icon: '/images/favicon.ico'
    }
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className={`${inter.variable} font-sans antialiased`}>
                <StoreProvider>
                    <CookieLoader />
                    <div className='min-h-screen flex flex-col'>
                        <Navbar />
                        <main className='flex-1 pt-16 relative'>
                            <div className='max-w-3xl mx-auto'>{children}</div>
                        </main>
                    </div>
                </StoreProvider>
            </body>
        </html>
    );
}
