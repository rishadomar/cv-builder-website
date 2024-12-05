import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery, injectSub } from './customBaseQuery';

export const aiApiSlice = createApi({
    reducerPath: 'api',
    baseQuery: async (args, api, extraOptions) => injectSub(args, api, extraOptions, customBaseQuery),
    endpoints: (builder) => ({
        generatePersonalityText: builder.mutation<string, { traits: Array<string> }>({
            query: (traits) => ({
                url: '/personalityText',
                method: 'POST',
                body: traits
            })
        }),
        improvePersonalityText: builder.mutation<string, { traits: Array<string>; previousText: string }>({
            query: ({ traits, previousText }) => ({
                url: '/improvePersonalityText',
                method: 'POST',
                body: { traits, previousText }
            })
        }),
        generateHobbiesText: builder.mutation<string, { hobbies: Array<string> }>({
            query: (hobbies) => ({
                url: '/hobbiesText',
                method: 'POST',
                body: hobbies
            })
        }),
        improveHobbiesText: builder.mutation<string, { hobbies: Array<string>; previousText: string }>({
            query: ({ hobbies, previousText }) => ({
                url: '/improveHobbiesText',
                method: 'POST',
                body: { hobbies, previousText }
            })
        })
    })
});

export const {
    useGeneratePersonalityTextMutation,
    useImprovePersonalityTextMutation,
    useGenerateHobbiesTextMutation,
    useImproveHobbiesTextMutation
} = aiApiSlice;
