import Image from 'next/image';
import Head from 'next/head';

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
            <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
                <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
                    <Image
                        //className='dark:invert'
                        src='https://app.cvbuilder.co.za/logo-pencil.jpeg'
                        alt='CV Builder logo'
                        width={180}
                        height={38}
                        priority
                    />
                    <ol className='list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]'>
                        <li className='mb-2'>
                            Get started by signing up using an email address or via Google{' '}
                            <a
                                href='https://app.cvbuilder.co.za'
                                target='_blank'
                                className='flex items-center gap-2 underline underline-offset-4'
                            >
                                Signup
                            </a>
                        </li>
                        <li>Fill in the easy to answer questionnaire. No large text required - just the facts</li>
                        <li>Pay</li>
                        <li>AI will generate text customised for you</li>
                        <li>Review and edit the text</li>
                        <li>Generate and download your PDF</li>
                    </ol>
                </main>
                <footer className='row-start-3 flex gap-6 flex-wrap items-center justify-center'>
                    <a
                        className='flex items-center gap-2 hover:underline hover:underline-offset-4'
                        href='https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        <Image
                            aria-hidden
                            src='https://nextjs.org/icons/file.svg'
                            alt='File icon'
                            width={16}
                            height={16}
                        />
                        Learn
                    </a>
                    <a
                        className='flex items-center gap-2 hover:underline hover:underline-offset-4'
                        href='https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        <Image
                            aria-hidden
                            src='https://nextjs.org/icons/window.svg'
                            alt='Window icon'
                            width={16}
                            height={16}
                        />
                        Examples
                    </a>
                    <a
                        className='flex items-center gap-2 hover:underline hover:underline-offset-4'
                        href='https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        <Image
                            aria-hidden
                            src='https://nextjs.org/icons/globe.svg'
                            alt='Globe icon'
                            width={16}
                            height={16}
                        />
                        Go to nextjs.org →
                    </a>
                </footer>
            </div>
        </>
    );
}
