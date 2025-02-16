import { Skeleton } from '@/components/ui/skeleton';

export default function BlogPostLoading() {
    return (
        <article className='prose lg:prose-xl mx-auto py-8'>
            {/* Image skeleton */}
            <div className='aspect-[2/1] relative overflow-hidden rounded-lg'>
                <Skeleton className='w-full h-full' />
            </div>

            <div className='px-4 space-y-4'>
                {/* Author and date skeleton */}
                <div className='flex items-center space-x-4'>
                    <div className='space-y-2'>
                        <Skeleton className='h-4 w-[100px]' />
                        <Skeleton className='h-4 w-[80px]' />
                    </div>
                </div>

                {/* Title skeleton */}
                <Skeleton className='h-8 w-[300px]' />

                {/* Content skeleton */}
                <div className='space-y-4'>
                    <Skeleton className='h-4 w-full' />
                    <Skeleton className='h-4 w-[90%]' />
                    <Skeleton className='h-4 w-[85%]' />
                    <Skeleton className='h-4 w-full' />
                    <Skeleton className='h-4 w-[95%]' />
                </div>
            </div>
        </article>
    );
}
