'use client';

import MarkdownRenderer from '@/components/MarkdownRenderer';
import { BackButton } from '@/components/BackButton';
import { useGetRecentPostsQuery, useLazyGetBlogPostQuery } from '@/lib/store/api/blogApiSlice';
import { Button } from '@/components/ui/button';

export default function BlogPage() {
    const [getBlogPost, { data: post, isError: isErrorGettingPost, isLoading: isLoadingPost }] =
        useLazyGetBlogPostQuery();
    const { data: posts, isError, isLoading } = useGetRecentPostsQuery({ limit: 3 });

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

    console.log('>>>> POSTS: ', posts);
    console.log('>>>> WELCOME POST: ', post);

    return (
        <div className='container mx-auto px-4 py-8 mt-20'>
            <h1 className='text-4xl font-bold'>Blog</h1>
            {posts &&
                posts.items &&
                posts.items.map((post: any) => (
                    <div key={post.id} className='mt-8'>
                        <h2 className='text-2xl font-bold'>{post.title}</h2>
                        <Button
                            onClick={async () => {
                                await getBlogPost({ id: post.id, slug: post.slug }).unwrap();
                            }}
                            className='mt-4 px-4 py-2 bg-blue-500 text-white rounded'
                        >
                            Fetch content
                        </Button>
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
        </div>
    );
}
