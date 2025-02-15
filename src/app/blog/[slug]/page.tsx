import { getBlogPost, getBlogPostContent } from '@/lib/store/api/blogContentApiUtils';
import { formatDate } from '@/lib/utils';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { Metadata } from 'next';
import ReactMarkdown from 'react-markdown';
import { BlogPostImage } from '../BlogPostImage';
import { BackButton } from '@/components/BackButton';

// Generate metadata for the page
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const post = await getBlogPost(params.slug);

    return {
        title: post.title,
        description: post.description,
        keywords: post.keywords,
        openGraph: {
            title: post.title,
            description: post.description,
            type: 'article',
            publishedTime: post.timestamp
        }
    };
}

// Blog Post Page Component
export default async function BlogPost({ params }: { params: { slug: string } }) {
    const post = await getBlogPost(params.slug);
    const content = await getBlogPostContent(params.slug);

    return (
        <>
            <article className='prose lg:prose-xl mx-auto py-8'>
                <div className='aspect-[2/1] relative overflow-hidden rounded-lg'>
                    <BlogPostImage post={post} />
                </div>

                <ScrollArea className='h-full px-4'>
                    <div className='space-y-4'>
                        <div className='flex items-center space-x-4'>
                            <div className='space-y-1'>
                                <h4 className='text-sm font-semibold'>{post.author}</h4>
                                <p className='text-sm text-muted-foreground'>{formatDate(new Date(post.timestamp))}</p>
                            </div>
                        </div>

                        <h1 className='text-3xl font-bold leading-tight'>{post.title}</h1>

                        <div className='prose prose-neutral dark:prose-invert max-w-none'>
                            <ReactMarkdown>{content}</ReactMarkdown>
                        </div>
                    </div>
                </ScrollArea>
            </article>
            <BackButton />
        </>
    );
}
