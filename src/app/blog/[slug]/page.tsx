import { getBlogPost, getBlogPostContent } from '@/lib/store/api/blogContentApiUtils';
import { formatDate } from '@/lib/utils';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { Metadata } from 'next';
import ReactMarkdown from 'react-markdown';

// Types
interface BlogPost {
    slug: string;
    content: string;
    metadata?: {
        title: string;
        description: string;
        date: string;
    };
}

// Utility function to fetch blog content
async function _getBlogPost(slug: string): Promise<BlogPost> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BLOG_URL}/${slug}/content.md`, {
            next: { revalidate: 3600 }, // Cache for 1 hour
            headers: {
                Accept: 'text/markdown'
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch blog post: ${response.statusText}`);
        }

        const content = await response.text();

        return {
            slug,
            content,
            metadata: {
                title: 'Blog Post Title', // You might want to extract this from frontmatter
                description: 'Blog Post Description',
                date: new Date().toISOString()
            }
        };
    } catch (error) {
        console.error(`Error fetching blog post ${slug}:`, error);
        throw error;
    }
}

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
        <article className='prose lg:prose-xl mx-auto py-8'>
            <div className='aspect-[2/1] relative overflow-hidden rounded-lg'>
                <img
                    src={`https://blog-dev.cvbuilder.co.za/${post.slug}/header.jpg`}
                    alt={post.title}
                    className='object-cover w-full h-full'
                />
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
    );
}
