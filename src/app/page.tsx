import Head from 'next/head';
import Welcome from '@/app/Welcome';

export default function Home() {
    return (
        <>
            <Head>
                <title>CV Builder</title>
                <meta name='description' content='Create your professional CV easily with our AI-powered CV builder.' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <meta name='robots' content='noindex, nofollow' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Welcome />
        </>
    );
}
