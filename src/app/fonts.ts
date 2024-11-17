import { Inter } from 'next/font/google';

export const inter = Inter({
    subsets: ['latin'],
    // Include medium weight (500) to match Untitled Sans Medium
    weight: ['400', '500', '600', '700'],
    variable: '--font-inter',
    display: 'swap'
});
