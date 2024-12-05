import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery, injectSub } from './customBaseQuery';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: async (args, api, extraOptions) => injectSub(args, api, extraOptions, customBaseQuery),
    endpoints: (builder) => ({
        generatePersonalityText: builder.mutation<string, { traits: Array<string> }>({
            query: (traits) => ({
                url: '/personalityText',
                method: 'POST',
                body: traits
            })
        })
    })
});

export const { useGeneratePersonalityTextMutation } = apiSlice;
