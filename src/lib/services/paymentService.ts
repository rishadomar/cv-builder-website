import { Dispatch } from 'redux';
import { RootState } from '@/lib/store/store';
import { setLoading } from '@/lib/store/loading/loadingSlice';
import * as api from '@/lib/api';
import { setFieldValues } from '@/lib/store/fieldValues/fieldValuesSlice';
import { Currency } from 'react-paystack/dist/types';
import { ApiError } from '../api/axios/ApiError';
import { toast } from '@/hooks/use-toast';

export const paymentComplete = (currency: Currency, amount: number, reference: string) => {
    return async (dispatch: Dispatch, getState: () => RootState) => {
        const sub = getState().authentication.sub;
        if (!sub) {
            toast({
                variant: 'destructive',
                title: 'Authentication Error',
                description: 'Please log in to apply a promo code.'
            });
            return;
        }
        dispatch(setLoading(true));
        try {
            const response = await api.paymentComplete(getState().authentication.sub!, currency, amount, reference);
            dispatch(setFieldValues([{ field: 'payment', value: response.payment }]));
        } catch (error) {
            if (error instanceof ApiError) {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: error.userMessage
                });
            } else {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: 'An unexpected error occurred. Please try again.'
                });
            }
        } finally {
            dispatch(setLoading(false));
        }
    };
};

export const validatePromoCodeInService = (promoCode: string) => {
    return async (dispatch: Dispatch, getState: () => RootState) => {
        const sub = getState().authentication.sub;
        if (!sub) {
            toast({
                variant: 'destructive',
                title: 'Authentication Error',
                description: 'Please log in to apply a promo code.'
            });
            return;
        }
        dispatch(setLoading(true));
        try {
            const response = await api.validatePromoCode(getState().authentication.sub!, promoCode);
            dispatch(setFieldValues([{ field: 'payment', value: response }]));
        } catch (error) {
            if (error instanceof ApiError) {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: error.userMessage
                });
            } else {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: 'An unexpected error occurred. Please try again.'
                });
            }
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    };
};

export const applyPromoCode = (promoCode: string) => {
    return async (dispatch: Dispatch, getState: () => RootState) => {
        const sub = getState().authentication.sub;
        if (!sub) {
            toast({
                variant: 'destructive',
                title: 'Authentication Error',
                description: 'Please log in to apply a promo code.'
            });
            return;
        }

        dispatch(setLoading(true));
        try {
            const response = await api.applyPromoCode(sub, promoCode);
            dispatch(setFieldValues([{ field: 'payment', value: response }]));
            toast({
                title: 'Success',
                description: 'Promo code applied successfully!'
            });
        } catch (error) {
            if (error instanceof ApiError) {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: error.userMessage
                });
            } else {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: 'An unexpected error occurred. Please try again.'
                });
            }
        } finally {
            dispatch(setLoading(false));
        }
    };
};
