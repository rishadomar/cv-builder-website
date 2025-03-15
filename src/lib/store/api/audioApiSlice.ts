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
        startTopSkillsConversation: builder.mutation<{ jobId: string }, void>({
            query: () => ({
                url: '/startTopSkillsConversation',
                method: 'POST'
            })
        }),
        getJobStatus: builder.query<
            {
                jobId: string;
                status: string;
                createdAt: string;
                progress: number;
                updatedAt: string;
                result: string;
                error: string;
            },
            { jobId: string }
        >({
            query: ({ jobId }) => ({
                url: `/getJobStatus/${jobId}`,
                method: 'GET'
            })
        })
    })
});

// Export hooks for usage in components
export const { useGetUserAudioUrlQuery, useStartTopSkillsConversationMutation, useGetJobStatusQuery } = audioApiSlice;
