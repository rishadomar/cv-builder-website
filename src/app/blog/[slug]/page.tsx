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
        // Add other metadata as needed
    };
}

// Utility function to fetch blog content
async function getBlogPost(slug: string): Promise<BlogPost> {
    try {
        const response = await fetch(
            `https://blog-dev.cvbuilder.co.za/${slug}/content.md`,
            { next: { revalidate: 3600 } } // Cache for 1 hour
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch blog post: ${response.statusText}`);
        }

        const content = await response.text();

        // You might want to parse frontmatter here if you add it
        // const { data: metadata, content: markdownContent } = matter(content)

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
        title: post.metadata?.title,
        description: post.metadata?.description
        // Add other metadata as needed
    };
}

// Blog Post Page Component
export default async function BlogPost({ params }: { params: { slug: string } }) {
    const post = await getBlogPost(params.slug);

    return (
        <article className='prose lg:prose-xl mx-auto py-8'>
            <h1>{post.metadata?.title}</h1>
            <time dateTime={post.metadata?.date}>{new Date(post.metadata?.date || '').toLocaleDateString()}</time>
            <ReactMarkdown>{post.content}</ReactMarkdown>
        </article>
    );
}
