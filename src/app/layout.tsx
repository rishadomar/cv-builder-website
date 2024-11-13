import localFont from 'next/font/local';
import StoreProvider from '@/lib/store/StoreProvider';
import './globals.css';
import CookieLoader from '@/components/CookieLoader';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900'
});
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900'
});

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
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <StoreProvider>
                    <CookieLoader />
                    <Navbar />
                    {children}
                </StoreProvider>
            </body>
        </html>
    );
}
