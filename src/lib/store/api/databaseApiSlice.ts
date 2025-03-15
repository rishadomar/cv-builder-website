import { createApi } from '@reduxjs/toolkit/query/react';
import type { CvData, KeyValuePairArray, FieldValuesState, PaymentDetails, FieldValue } from '@/lib/type';
import { compareEducationEntries, compareWorkExperienceEntries } from '@/lib/utils';
import { customBaseQuery, injectSub } from './customBaseQuery';
import { setFieldValues } from '../fieldValues/fieldValuesSlice';

export const databaseApiSlice = createApi({
    reducerPath: 'databaseApi',
    baseQuery: async (args, api, extraOptions) => injectSub(args, api, extraOptions, customBaseQuery),
    tagTypes: ['FieldValues'],
    endpoints: (builder) => ({
        createRecord: builder.mutation<void, CvData>({
            query: (details) => ({
                url: '/createRecord',
                method: 'POST',
                body: details
            }),
            invalidatesTags: ['FieldValues']
        }),

        readRecord: builder.query<FieldValue[], { sub: string; email: string }>({
            query: ({ sub, email }) => ({
                url: '/readRecord',
                params: { sub, email }
            }),
            providesTags: ['FieldValues'],
            transformResponse: (response: { details: Record<string, unknown> }) => {
                // Transform directly to FieldValue array format
                return Object.entries(response.details)
                    .map(([field, value]) => {
                        switch (field) {
                            case 'payment':
                                const paymentValue = value as PaymentDetails;
                                let dateValue: Date | undefined = new Date(paymentValue.date);
                                if (isNaN(dateValue.getTime())) {
                                    dateValue = undefined;
                                }
                                return {
                                    field: field as keyof FieldValuesState,
                                    value: {
                                        currency: paymentValue.currency,
                                        amount: paymentValue.amount,
                                        date: dateValue ? dateValue.toISOString() : undefined,
                                        promoCode: paymentValue.promoCode
                                    }
                                };
                            case 'workExperiences':
                                return {
                                    field: field as keyof FieldValuesState,
                                    value: Array.isArray(value) ? [...value].sort(compareWorkExperienceEntries) : []
                                };
                            case 'educationEntries':
                                return {
                                    field: field as keyof FieldValuesState,
                                    value: Array.isArray(value) ? [...value].sort(compareEducationEntries) : []
                                };
                            default:
                                return {
                                    field: field as keyof FieldValuesState,
                                    value
                                };
                        }
                    })
                    .filter((item) => isValidFieldValue(item.field, item.value));
            },
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setFieldValues(data));
                } catch (error) {
                    console.error('Error saving data to Redux:', error);
                }
            }
        }),

        saveData: builder.mutation<void, { data: KeyValuePairArray }>({
            query: ({ data }) => ({
                url: '/saveData',
                method: 'POST',
                body: { data }
            }),
            invalidatesTags: ['FieldValues'],
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    const mappedArray = Object.entries(arg.data).map(([field, value]) => ({
                        field: field as keyof FieldValuesState,
                        value
                    }));
                    dispatch(setFieldValues(mappedArray));
                } catch (error) {
                    console.error('Error saving data to Redux:', error);
                }
            }
        })
    })
});

function isValidFieldValue(field: keyof FieldValuesState, value: unknown): value is FieldValuesState[typeof field] {
    switch (field) {
        case 'payment':
            return typeof value === 'object' && value !== null && 'currency' in value && 'amount' in value;
        case 'workExperiences':
            return Array.isArray(value);
        case 'educationEntries':
            return Array.isArray(value);
        default:
            return true; // For other fields, we'll trust the type assertion
    }
}

// Export hooks for usage in components
export const { useCreateRecordMutation, useReadRecordQuery, useSaveDataMutation } = databaseApiSlice;

// Export the reducer and middleware for store setup
// export const { reducer: databaseApiReducer, middleware: databaseApiMiddleware } = databaseApiSlice;
