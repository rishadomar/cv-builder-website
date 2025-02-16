import { BlogCard } from './BlogCard';
import { BookOpen } from 'lucide-react';
import { BlogPost } from '@/lib/type';
import { getBlogPosts } from '@/lib/store/api/blogApiUtils';

export default async function BlogPage() {
    const posts = await getBlogPosts(10);

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
                    {posts.map((post: BlogPost) => (
                        <BlogCard key={post.slug} post={post} />
                    ))}
                </div>
            </main>
        </div>
    );
}
