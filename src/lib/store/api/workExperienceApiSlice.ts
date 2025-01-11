import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery, injectSub } from './customBaseQuery';
import { WorkExperienceEntry } from '@/lib/type';
import { setWorkExperiences } from '../fieldValues/fieldValuesSlice';

export const workExperienceApiSlice = createApi({
    reducerPath: 'workExperienceApi',
    baseQuery: async (args, api, extraOptions) => injectSub(args, api, extraOptions, customBaseQuery),
    endpoints: (builder) => ({
        addWorkExperience: builder.mutation<
            { workExperiences: WorkExperienceEntry[] },
            { workExperienceEntry: WorkExperienceEntry }
        >({
            query: ({ workExperienceEntry }) => ({
                url: '/workExperience',
                method: 'POST',
                body: { data: workExperienceEntry }
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setWorkExperiences(data.workExperiences));
                } catch (error) {
                    console.error('Error saving data to Redux:', error);
                }
            }
        }),

        updateWorkExperience: builder.mutation<
            { workExperiences: WorkExperienceEntry[] },
            { workExperienceEntry: WorkExperienceEntry }
        >({
            query: ({ workExperienceEntry }) => ({
                url: '/workExperience',
                method: 'PUT',
                body: { data: workExperienceEntry }
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    console.log('Data om WorkExperienceApiSlice', data);
                    dispatch(setWorkExperiences(data.workExperiences));
                } catch (error) {
                    console.error('Error saving data to Redux:', error);
                }
            }
        }),

        deleteWorkExperience: builder.mutation<
            { workExperiences: WorkExperienceEntry[] },
            { workExperienceEntry: WorkExperienceEntry }
        >({
            query: ({ workExperienceEntry }) => ({
                url: `/workExperience?workExperienceId=${workExperienceEntry.id}`,
                method: 'DELETE'
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                const { data } = await queryFulfilled;
                dispatch(setWorkExperiences(data.workExperiences));
            }
        })
    })
});

export const { useUpdateWorkExperienceMutation, useAddWorkExperienceMutation, useDeleteWorkExperienceMutation } =
    workExperienceApiSlice;
