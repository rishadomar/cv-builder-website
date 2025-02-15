import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const blogApiSlice = createApi({
    reducerPath: 'blogApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_GATEWAY_URL }),
    endpoints: (builder) => ({
        getRecentPosts: builder.query<any, { limit: number }>({
            query: ({ limit = 10 }) => `getRecentPosts?limit=${limit}`
        }),
        getBlogPost: builder.query<any, { id: string; slug: string }>({
            query: ({ id, slug }) => `getBlogPost?id=${id}&slug=${slug}`
        })
    })
});

export const { useGetRecentPostsQuery, useLazyGetBlogPostQuery } = blogApiSlice;
