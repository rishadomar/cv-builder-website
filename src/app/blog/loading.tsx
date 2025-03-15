import { Skeleton } from '@/components/ui/skeleton';
import { BookOpen } from 'lucide-react';

export default function BlogLoading() {
    return (
        <div className='min-h-screen bg-background'>
            <header className='border-b'>
                <div className='container mx-auto px-4 py-8 mt-20'>
                    <div className='flex items-center space-x-2'>
                        <BookOpen className='h-6 w-6' />
                        <h1 className='text-2xl font-bold'>Blog</h1>
                    </div>
                </div>
            </header>

            <main className='container mx-auto px-4 py-12'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className='rounded-lg border bg-card overflow-hidden'>
                            {/* Image skeleton */}
                            <Skeleton className='aspect-[2/1] w-full' />

                            <div className='p-4 space-y-4'>
                                {/* Title skeleton */}
                                <Skeleton className='h-6 w-3/4' />

                                {/* Description skeleton */}
                                <div className='space-y-2'>
                                    <Skeleton className='h-4 w-full' />
                                    <Skeleton className='h-4 w-5/6' />
                                </div>

                                {/* Author and date skeleton */}
                                <div className='flex justify-between items-center'>
                                    <Skeleton className='h-4 w-24' />
                                    <Skeleton className='h-4 w-20' />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
