import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery, injectSub } from './customBaseQuery';
import { setFieldValues } from '@/lib/store/fieldValues/fieldValuesSlice';
import { setLoading } from '@/lib/store/loading/loadingSlice';
import { AvailablePDFTemplates } from '@/lib/type';

export const pdfApiSlice = createApi({
    reducerPath: 'pdfApi',
    baseQuery: async (args, api, extraOptions) => injectSub(args, api, extraOptions, customBaseQuery),
    endpoints: (builder) => ({
        generatePDF: builder.mutation<{ pdf_id: string }, { selectedTemplate: AvailablePDFTemplates }>({
            query: ({ selectedTemplate }) => ({
                url: '/generatePDF',
                method: 'POST',
                body: { template: selectedTemplate }
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setLoading(true));
                    const { data } = await queryFulfilled;
                    dispatch(
                        setFieldValues([
                            { field: 'pdf_id', value: data.pdf_id },
                            { field: 'pdf_generated_date', value: new Date().toISOString() }
                        ])
                    );
                } finally {
                    dispatch(setLoading(false));
                }
            }
        }),

        downloadPDF: builder.mutation<{ url: string }, void>({
            query: () => ({
                url: '/downloadPDF',
                method: 'POST',
                body: {}
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setLoading(true));
                    await queryFulfilled;
                } finally {
                    dispatch(setLoading(false));
                }
            }
        })
    })
});

export const { useGeneratePDFMutation, useDownloadPDFMutation } = pdfApiSlice;
