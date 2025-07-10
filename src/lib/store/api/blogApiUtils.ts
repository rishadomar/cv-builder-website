import { BlogPost } from '@/lib/type';
import { getStore } from '../store';
import { blogApiSlice } from './blogApiSlice';

export async function getBlogPostContent(slug: string): Promise<string> {
    const store = getStore();
    return await store.dispatch(blogApiSlice.endpoints.getBlogPostContent.initiate(slug)).unwrap();
}

export async function getBlogPosts(limit: number): Promise<BlogPost[]> {
    const store = getStore();
    const result = await store.dispatch(blogApiSlice.endpoints.getRecentPosts.initiate({ limit })).unwrap();
    return result.items;
}

export async function getBlogPost(slug: string): Promise<BlogPost> {
    const store = getStore();
    return await store.dispatch(blogApiSlice.endpoints.getBlogPost.initiate(slug)).unwrap();
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
