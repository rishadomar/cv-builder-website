import Welcome from '@/app/Welcome';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'CV Builder using AI!',
    description: 'Create your professional CV easily with our AI-powered CV builder.',
    robots: 'noindex, nofollow',
    icons: {
        icon: '/images/favicon.ico'
    }
};

export default function Home() {
    return (
        <>
            <Welcome />
        </>
    );
}
