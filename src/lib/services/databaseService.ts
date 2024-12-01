import { Dispatch } from 'redux';
import { RootState } from '@/lib/store/store';
import { setLoading } from '@/lib/store/loading/loadingSlice';
import * as api from '@/lib/api';
import { setFieldValues } from '@/lib/store/fieldValues/fieldValuesSlice';
import type { FieldValuesState, KeyValuePairArray, PaymentDetails, Error } from '@/lib/type';
import { addAxiosError } from '@/lib/store/alert/alertSlice';
import { compareEducationEntries, compareWorkExperienceEntries } from '../utils';

export const readRecord = (sub: string, email: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await api.readRecord(sub, email);
            const mappedArray = Object.entries(response.details).map(([field, value]) => {
                if (field === 'payment') {
                    let dateValue: Date | undefined = new Date((value as PaymentDetails).date);
                    if (isNaN(dateValue.getTime())) {
                        dateValue = undefined;
                    }
                    return {
                        field: field as keyof FieldValuesState,
                        value: {
                            currency: (value as PaymentDetails).currency,
                            amount: (value as PaymentDetails).amount,
                            date: dateValue ? dateValue.toISOString() : undefined,
                            promoCode: (value as PaymentDetails).promoCode
                        }
                    };
                } else if (field === 'workExperiences') {
                    if (value && Array.isArray(value)) {
                        const sortedArray = value.sort(compareWorkExperienceEntries);
                        return {
                            field: field as keyof FieldValuesState,
                            value: sortedArray
                        };
                    } else {
                        return {
                            field: field as keyof FieldValuesState,
                            value
                        };
                    }
                } else if (field === 'educationEntries') {
                    if (value && Array.isArray(value)) {
                        const sortedArray = value.sort(compareEducationEntries);
                        return {
                            field: field as keyof FieldValuesState,
                            value: sortedArray
                        };
                    } else {
                        return {
                            field: field as keyof FieldValuesState,
                            value
                        };
                    }
                } else {
                    return {
                        field: field as keyof FieldValuesState,
                        value
                    };
                }
            });
            dispatch(setFieldValues(mappedArray));
        } catch (error) {
            console.error('Read error:', error);
            dispatch(addAxiosError({ title: 'Reading CV data', error: error as Error }));
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    };
};

export const save = (data: KeyValuePairArray) => {
    return async (dispatch: Dispatch, getState: () => RootState) => {
        if (!getState().authentication.sub) {
            throw new Error('No sub found');
        }
        dispatch(setLoading(true));
        try {
            await api.save(getState().authentication.sub!, data);
            const mappedArray = Object.entries(data).map(([field, value]) => ({
                field: field as keyof FieldValuesState,
                value
            }));
            dispatch(setFieldValues(mappedArray));
        } catch (error) {
            console.error('Save error:', error);
            dispatch(addAxiosError({ title: 'Saving CV data', error: error as Error }));
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    };
};
