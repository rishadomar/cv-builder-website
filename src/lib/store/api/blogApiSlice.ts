import { BlogPost, BlogPostsResponse } from '@/lib/type';
import { createApi } from '@reduxjs/toolkit/query/react';
import { retryOnServerError } from './customBaseQuery';

// Create separate base queries for different endpoints
const blogBaseQuery = async (args: any, api: any, extraOptions: any) => {
    const { fetchBaseQuery } = await import('@reduxjs/toolkit/query/react');
    const baseQuery = fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_GATEWAY_URL });
    return retryOnServerError(args, api, extraOptions, baseQuery);
};

const blogContentBaseQuery = async (args: any, api: any, extraOptions: any) => {
    const { fetchBaseQuery } = await import('@reduxjs/toolkit/query/react');
    const baseQuery = fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BLOG_URL,
        responseHandler: 'text'
    });
    return retryOnServerError(args, api, extraOptions, baseQuery);
};

export const blogApiSlice = createApi({
    reducerPath: 'blogApi',
    baseQuery: blogBaseQuery,
    endpoints: (builder) => ({
        getRecentPosts: builder.query<BlogPostsResponse, { limit: number }>({
            query: ({ limit = 10 }) => `getRecentPosts?limit=${limit}`
        }),
        getBlogPost: builder.query<BlogPost, string>({
            query: (slug) => `getBlogPost/${slug}`
        }),
        getBlogPostContent: builder.query<string, string>({
            queryFn: async (slug, api, extraOptions) => {
                return blogContentBaseQuery(`${slug}/content.md`, api, extraOptions);
            }
        })
    })
});

export const { useGetRecentPostsQuery, useGetBlogPostQuery, useGetBlogPostContentQuery } = blogApiSlice;
