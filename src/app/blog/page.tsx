'use client';

import MarkdownRenderer from '@/components/MarkdownRenderer';
import { BackButton } from '@/components/BackButton';
import { useGetRecentPostsQuery } from '@/lib/store/api/blogApiSlice';
import { Button } from '@/components/ui/button';

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
            <Button
                onClick={() => {
                    window.location.href = 'blog/welcome';
                }}
            >
                Goto welcome content
            </Button>
            <Button
                onClick={async () => {
                    const response = await fetch('https://blog-dev.cvbuilder.co.za/welcome/content.md');
                    //const response = await fetch('https://d30b3w73zi1e3t.cloudfront.net/welcome');
                    console.log('>>>> RESPONSE: ', response);
                }}
                className='mt-4 px-4 py-2 bg-blue-500 text-white rounded'
            >
                Fetch content
            </Button>
        </div>
    );
}
