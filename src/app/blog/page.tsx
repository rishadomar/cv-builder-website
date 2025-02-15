'use client';

import { useGetRecentPostsQuery } from '@/lib/store/api/blogApiSlice';
import { PostCard } from './PostCard';
import { BookOpen } from 'lucide-react';
import { BlogPost } from '@/lib/type';
import { useRouter } from 'next/navigation';
import { OverlaySpinner } from '@/components/OverlaySpinner';

export default function BlogPage() {
    const router = useRouter();
    const { data: posts, isError, isLoading } = useGetRecentPostsQuery({ limit: 3 });

    if (isError) {
        return <div>Error loading posts.</div>;
    }

    if (isLoading || !posts) {
        return <OverlaySpinner />;
    }

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
                    {posts.items.map((post: BlogPost) => (
                        <PostCard
                            key={post.slug}
                            post={post}
                            onClick={() => {
                                router.push(`/blog/${post.slug}`);
                            }}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}
