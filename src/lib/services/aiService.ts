import { Dispatch } from 'redux';
import { RootState } from '@/lib/store/store';
import { setLoading } from '@/lib/store/loading/loadingSlice';
import * as api from '@/lib/api';
import { addAxiosError } from '@/lib/store/alert/alertSlice';
import { setFieldValue } from '@/lib/store/fieldValues/fieldValuesSlice';
import type { Error } from '../type';

export const generatePersonalityText = (traits: Array<string>) => {
    return async (dispatch: Dispatch, getState: () => RootState) => {
        if (!getState().authentication.sub) {
            throw new Error('No sub found');
        }
        dispatch(setLoading(true));
        try {
            const response = await api.generatePersonalityText(getState().authentication.sub!, traits);
            //await delay(3000);
            //const response = 'Personality text generated for traits: ' + traits.join(', ');
            dispatch(setFieldValue({ field: 'personalityText', value: response }));
        } catch (error) {
            console.error('Generate personality text error:', error);
            dispatch(addAxiosError({ title: '', error: error as Error }));
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    };
};
