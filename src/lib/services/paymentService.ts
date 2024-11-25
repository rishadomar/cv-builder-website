import { Dispatch } from 'redux';
import { RootState } from '@/lib/store/store';
import { setLoading } from '@/lib/store/loading/loadingSlice';
import * as api from '@/lib/api';
import { addAxiosError } from '@/lib/store/alert/alertSlice';
import { setFieldValues } from '@/lib/store/fieldValues/fieldValuesSlice';
import type { Error } from '@/lib/type';
import { Currency } from 'react-paystack/dist/types';

export const paymentComplete = (currency: Currency, amount: number, reference: string) => {
    return async (dispatch: Dispatch, getState: () => RootState) => {
        if (!getState().authentication.sub) {
            throw new Error('No sub found');
        }
        dispatch(setLoading(true));
        try {
            const response = await api.paymentComplete(getState().authentication.sub!, currency, amount, reference);
            dispatch(setFieldValues([{ field: 'payment', value: response }]));
        } catch (error) {
            console.error('Payment error:', error);
            dispatch(addAxiosError({ title: 'Payment ', error: error as Error }));
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    };
};

export const validatePromoCode = async (promoCode: string) => {
    return async (dispatch: Dispatch, getState: () => RootState) => {
        if (!getState().authentication.sub) {
            throw new Error('No sub found');
        }
        dispatch(setLoading(true));
        try {
            const response = await api.validatePromoCode(getState().authentication.sub!, promoCode);
            dispatch(setFieldValues([{ field: 'payment', value: response }]));
        } catch (error) {
            console.error('Promo code validation error:', error);
            dispatch(addAxiosError({ title: 'Promo code validation', error: error as Error }));
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    };
};

export const applyPromoCode = async (promoCode: string) => {
    return async (dispatch: Dispatch, getState: () => RootState) => {
        if (!getState().authentication.sub) {
            throw new Error('No sub found');
        }
        dispatch(setLoading(true));
        try {
            const response = await api.applyPromoCode(getState().authentication.sub!, promoCode);
            dispatch(setFieldValues([{ field: 'payment', value: response }]));
        } catch (error) {
            console.error('Promo code application error:', error);
            dispatch(addAxiosError({ title: 'Promo code application', error: error as Error }));
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    };
};
