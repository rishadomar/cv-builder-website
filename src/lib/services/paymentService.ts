import { Dispatch } from 'redux';
import { RootState } from '@/lib/store/store';
import { setLoading } from '@/lib/store/loading/loadingSlice';
import * as api from '@/lib/api';
import { addAxiosError } from '@/lib/store/alert/alertSlice';
import { setFieldValues } from '@/lib/store/fieldValues/fieldValuesSlice';
import type { Error } from '@/lib/type';

export const paymentComplete = (amount: number, reference: string) => {
    return async (dispatch: Dispatch, getState: () => RootState) => {
        if (!getState().authentication.sub) {
            throw new Error('No sub found');
        }
        dispatch(setLoading(true));
        try {
            const response = await api.paymentComplete(getState().authentication.sub!, amount, reference);
            dispatch(setFieldValues([{ field: 'payment', value: response.payment }]));
        } catch (error) {
            console.error('Payment error:', error);
            dispatch(addAxiosError({ title: 'Payment ', error: error as Error }));
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    };
};
