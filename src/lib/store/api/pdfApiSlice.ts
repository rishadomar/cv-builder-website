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

        downloadPDF: builder.query<Blob, { download?: boolean }>({
            query: (args) => ({
                url: '/downloadPDF',
                method: 'GET',
                params: { download: args?.download ?? false },
                cache: 'no-cache',
                responseHandler: async (response: Response) => {
                    if (!response.ok) {
                        throw new Error('Failed to download PDF');
                    }

                    const contentType = response.headers.get('content-type');
                    if (
                        !contentType?.includes('application/pdf') &&
                        !contentType?.includes('application/octet-stream')
                    ) {
                        throw new Error(`Invalid content type: ${contentType}`);
                    }

                    const base64Data = await response.text();
                    console.log('Raw response:', base64Data.substring(0, 50));

                    // Convert base64 to binary
                    const binaryString = atob(base64Data);
                    console.log('First few chars after atob:', binaryString.substring(0, 20));

                    // Convert binary string to Uint8Array
                    const bytes = new Uint8Array(binaryString.length);
                    for (let i = 0; i < binaryString.length; i++) {
                        bytes[i] = binaryString.charCodeAt(i);
                    }

                    console.log('First bytes:', bytes.slice(0, 20));
                    console.log('As text:', new TextDecoder().decode(bytes.slice(0, 20)));

                    // Create blob from the binary data
                    return new Blob([bytes], { type: 'application/pdf' });
                }
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setLoading(true));
                    await queryFulfilled;
                } finally {
                    dispatch(setLoading(false));
                }
            }
        }),

        downloadSamplePDF: builder.query<Blob, { download?: boolean }>({
            query: (args) => ({
                url: '/downloadSamplePDF',
                method: 'GET',
                params: { download: args?.download ?? false },
                cache: 'no-cache',
                responseHandler: async (response: Response) => {
                    if (!response.ok) {
                        throw new Error('Failed to download Sample PDF');
                    }

                    const contentType = response.headers.get('content-type');
                    if (
                        !contentType?.includes('application/pdf') &&
                        !contentType?.includes('application/octet-stream')
                    ) {
                        throw new Error(`Invalid content type: ${contentType}`);
                    }

                    const base64Data = await response.text();

                    // Convert base64 to binary
                    const binaryString = atob(base64Data);

                    // Convert binary string to Uint8Array
                    const bytes = new Uint8Array(binaryString.length);
                    for (let i = 0; i < binaryString.length; i++) {
                        bytes[i] = binaryString.charCodeAt(i);
                    }

                    // Create blob from the binary data
                    return new Blob([bytes], { type: 'application/pdf' });
                }
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

export const { useGeneratePDFMutation, useLazyDownloadPDFQuery, useLazyDownloadSamplePDFQuery } = pdfApiSlice;
