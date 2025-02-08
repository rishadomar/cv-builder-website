'use client';

import MarkdownRenderer from '@/components/MarkdownRenderer';
import { BackButton } from '@/components/BackButton';
import { useGetRecentPostsQuery } from '@/lib/store/api/blogApiSlice';

export default function BlogPage() {
    const { data: posts, isError, isLoading } = useGetRecentPostsQuery({ limit: 3 });

    if (isError) {
        return <div>Error loading posts.</div>;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    console.log('>>>> POSTS: ', posts);

    return (
        <div className='container mx-auto px-4 py-8 mt-20'>
            <h1 className='text-4xl font-bold'>Blog</h1>
            {posts &&
                posts.items &&
                posts.items.map((post: any) => (
                    <div key={post.id} className='mt-8'>
                        <h2 className='text-2xl font-bold'>{post.title}</h2>
                    </div>
                ))}
            <BackButton />
        </div>
    );
}
