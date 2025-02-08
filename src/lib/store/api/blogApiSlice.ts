import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { customBaseQuery, injectSub } from './customBaseQuery';

export const blogApiSlice = createApi({
    reducerPath: 'blogApi',
    baseQuery: async (args, api, extraOptions) => injectSub(args, api, extraOptions, customBaseQuery),
    endpoints: (builder) => ({
        getRecentPosts: builder.query<any, { limit: number }>({
            query: ({ limit = 10 }) => `getRecentPosts?limit=${limit}`
        })
    })
});

export const { useGetRecentPostsQuery } = blogApiSlice;
