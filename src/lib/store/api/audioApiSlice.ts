import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery, injectSub } from './customBaseQuery';

export const audioApiSlice = createApi({
    reducerPath: 'audioApi',
    baseQuery: async (args, api, extraOptions) => injectSub(args, api, extraOptions, customBaseQuery),
    endpoints: (builder) => ({
        getUserAudioUrl: builder.query<{ url: string; key: string }, {}>({
            query: ({}) => ({
                url: '/getUserAudioUrl',
                method: 'POST'
            })
        })
    })
});

// Export hooks for usage in components
export const { useGetUserAudioUrlQuery } = audioApiSlice;
