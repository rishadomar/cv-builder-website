'use client';

import MarkdownRenderer from '@/components/MarkdownRenderer';
import { BackButton } from '@/components/BackButton';
import { useGetRecentPostsQuery, useLazyGetBlogPostQuery } from '@/lib/store/api/blogApiSlice';
import { PostCard } from './PostCard';
import { PostDetail } from './PostDetail';
import { BookOpen } from 'lucide-react';
import { useState } from 'react';
import { BlogPost } from '@/lib/type';

export default function BlogPage() {
    const [getBlogPost, { data: post, isError: isErrorGettingPost, isLoading: isLoadingPost }] =
        useLazyGetBlogPostQuery();
    const { data: posts, isError, isLoading } = useGetRecentPostsQuery({ limit: 3 });
    const [selectedPost, setSelectedPost] = useState<BlogPost>();
    const [isPostOpen, setIsPostOpen] = useState(false);

    if (isError) {
        return <div>Error loading posts.</div>;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isErrorGettingPost) {
        return <div>Error loading the welcome post.</div>;
    }

    if (isLoadingPost) {
        return <div>Loading welcome post...</div>;
    }

    console.log('>>>> POSTS: ', posts.items);
    console.log('>>>> WELCOME POST: ', post);

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
                            key={post.id}
                            post={post}
                            onClick={() => {
                                setSelectedPost(post);
                                setIsPostOpen(true);
                            }}
                        />
                    ))}
                </div>
            </main>

            {selectedPost && <PostDetail post={selectedPost} open={isPostOpen} onOpenChange={setIsPostOpen} />}
        </div>
    );
}
