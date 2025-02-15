import { BlogPostsResponse } from '@/lib/type';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const blogApiSlice = createApi({
    reducerPath: 'blogApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_GATEWAY_URL }),
    endpoints: (builder) => ({
        getRecentPosts: builder.query<BlogPostsResponse, { limit: number }>({
            query: ({ limit = 10 }) => `getRecentPosts?limit=${limit}`
        })
    })
});

export const { useGetRecentPostsQuery } = blogApiSlice;
