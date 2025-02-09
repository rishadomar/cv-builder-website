import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { customBaseQuery, injectSub } from './customBaseQuery';

export const blogContentApiSlice = createApi({
    reducerPath: 'blogContentApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BLOG_URL
    }),
    endpoints: (builder) => ({
        getContent: builder.query<any, { slug: string }>({
            query: ({ slug }) => `${slug}/content.md`
        })
    })
});

export const { useGetContentQuery } = blogContentApiSlice;
