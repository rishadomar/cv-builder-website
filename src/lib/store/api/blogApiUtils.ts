import { BlogPost } from '@/lib/type';

export async function getBlogPostContent(slug: string): Promise<string> {
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

        return await response.text();
    } catch (error) {
        console.error(`Error fetching blog post ${slug}:`, error);
        throw error;
    }
}

export async function getBlogPosts(limit: number): Promise<BlogPost[]> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/getRecentPosts?limit=${limit}`, {
            next: { revalidate: 3600 }, // Cache for 1 hour
            headers: {
                Accept: 'text/markdown'
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch blog posts: ${response.statusText}`);
        }

        const data = await response.json();
        return data.items;
    } catch (error) {
        console.error(`Error fetching blog posts:`, error);
        throw error;
    }
}

export async function getBlogPost(slug: string): Promise<BlogPost> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/getBlogPost/${slug}`, {
            next: { revalidate: 3600 }, // Cache for 1 hour
            headers: {
                Accept: 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch blog post: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Error fetching blog post ${slug}:`, error);
        throw error;
    }
}

// export async function getBlogPostKeywords(slug: string): Promise<string[]> {
//     try {
//         const response = await fetch(`${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/getBlogPostKeywords/${slug}`, {
//             next: { revalidate: 3600 }, // Cache for 1 hour
//             headers: {
//                 Accept: 'application/json'
//             }
//         });

//         if (!response.ok) {
//             throw new Error(`Failed to fetch blog post keywords: ${response.statusText}`);
//         }

//         return await response.json();
//     } catch (error) {
//         console.error(`Error fetching blog post keywords ${slug}:`, error);
//         throw error;
//     }
// }
