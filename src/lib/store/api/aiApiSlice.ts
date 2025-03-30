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
        improvePersonalityText: builder.mutation<
            string,
            { traits: Array<string>; previousText: string; userInput: string }
        >({
            query: ({ traits, previousText, userInput }) => ({
                url: '/improvePersonalityText',
                method: 'POST',
                body: { traits, previousText, userInput }
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
        }),
        improveWorkDescriptionText: builder.mutation<
            string,
            { workDetails: { company: string }; previousText: string }
        >({
            query: ({ workDetails, previousText }) => ({
                url: '/improveWorkDescriptionText',
                method: 'POST',
                body: { workDetails, previousText }
            })
        }),
        improveEducationComment: builder.mutation<
            string,
            { educationDetails: { description: string; institution: string }; previousText: string }
        >({
            query: ({ educationDetails, previousText }) => ({
                url: '/improveEducationComment',
                method: 'POST',
                body: { educationDetails, previousText }
            })
        }),
        extractTopSkills: builder.mutation<string, { previousText: string }>({
            query: (previousText) => ({
                url: '/extractTopSkills',
                method: 'POST',
                body: { previousText }
            })
        })
    })
});

export const {
    useGeneratePersonalityTextMutation,
    useImprovePersonalityTextMutation,
    useGenerateHobbiesTextMutation,
    useImproveHobbiesTextMutation,
    useImproveWorkDescriptionTextMutation,
    useImproveEducationCommentMutation,
    useExtractTopSkillsMutation
} = aiApiSlice;
