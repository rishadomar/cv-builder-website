import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery, injectSub } from './customBaseQuery';
import { setFieldValues } from '@/lib/store/fieldValues/fieldValuesSlice';
import { Currency } from 'react-paystack/dist/types';
import { setLoading } from '@/lib/store/loading/loadingSlice';

interface PaymentResponse {
    payment: {
        currency: Currency;
        amount: number;
        date: string;
        promoCode?: string;
    };
}

export const paymentApiSlice = createApi({
    reducerPath: 'paymentApi',
    baseQuery: async (args, api, extraOptions) => injectSub(args, api, extraOptions, customBaseQuery),
    endpoints: (builder) => ({
        paymentComplete: builder.mutation<PaymentResponse, { currency: Currency; amount: number; reference: string }>({
            query: ({ currency, amount, reference }) => ({
                url: '/paymentComplete',
                method: 'POST',
                body: { currency, amount, reference }
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setLoading(true));
                    const { data } = await queryFulfilled;
                    dispatch(setFieldValues([{ field: 'payment', value: data.payment }]));
                } finally {
                    dispatch(setLoading(false));
                }
            }
        }),

        applyPromoCode: builder.mutation<PaymentResponse, { promoCode: string }>({
            query: ({ promoCode }) => ({
                url: '/applyPromoCode',
                method: 'POST',
                body: { promoCode }
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setLoading(true));
                    const { data } = await queryFulfilled;
                    dispatch(setFieldValues([{ field: 'payment', value: data.payment }]));
                } finally {
                    dispatch(setLoading(false));
                }
            }
        })
    })
});

export const { usePaymentCompleteMutation, useApplyPromoCodeMutation } = paymentApiSlice;
