import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery, injectSub } from './customBaseQuery';
import { EducationEntry } from '@/lib/type';
import { setEducationEntries } from '../fieldValues/fieldValuesSlice';

export const educationApiSlice = createApi({
    reducerPath: 'educationApi',
    baseQuery: async (args, api, extraOptions) => injectSub(args, api, extraOptions, customBaseQuery),
    endpoints: (builder) => ({
        addEducation: builder.mutation<{ educationEntries: EducationEntry[] }, { educationEntry: EducationEntry }>({
            query: ({ educationEntry }) => ({
                url: '/education',
                method: 'POST',
                body: { data: educationEntry }
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setEducationEntries(data.educationEntries));
                } catch (error) {
                    console.error('Error saving data to Redux:', error);
                }
            }
        }),

        updateEducation: builder.mutation<{ educationEntries: EducationEntry[] }, { educationEntry: EducationEntry }>({
            query: ({ educationEntry }) => ({
                url: '/education',
                method: 'PUT',
                body: { data: educationEntry }
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setEducationEntries(data.educationEntries));
                } catch (error) {
                    console.error('Error saving data to Redux:', error);
                }
            }
        }),

        deleteEducation: builder.mutation<{ educationEntries: EducationEntry[] }, { educationEntry: EducationEntry }>({
            query: ({ educationEntry }) => ({
                url: `/education?educationId=${educationEntry.id}`,
                method: 'DELETE'
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                const { data } = await queryFulfilled;
                dispatch(setEducationEntries(data.educationEntries));
            }
        })
    })
});

export const { useUpdateEducationMutation, useAddEducationMutation, useDeleteEducationMutation } = educationApiSlice;
