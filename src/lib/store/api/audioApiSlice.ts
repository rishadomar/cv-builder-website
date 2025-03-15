import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery, injectSub } from './customBaseQuery';

export const audioApiSlice = createApi({
    reducerPath: 'audioApi',
    baseQuery: async (args, api, extraOptions) => injectSub(args, api, extraOptions, customBaseQuery),
    endpoints: (builder) => ({
        getUserAudioUrl: builder.query<{ url: string; key: string }, void>({
            query: () => ({
                url: '/getUserAudioUrl',
                method: 'POST'
            })
        }),
        startTopSkillsConversation: builder.mutation<{ url: string; key: string }, { text: string }>({
            query: ({ text }) => ({
                url: '/startTopSkillsConversation',
                method: 'POST',
                body: { text }
            })
        })
    })
});

// Export hooks for usage in components
export const { useGetUserAudioUrlQuery } = audioApiSlice;
