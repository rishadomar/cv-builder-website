import { Dispatch } from 'redux';
import { RootState } from '@/lib/store/store';
import { setLoading } from '@/lib/store/loading/loadingSlice';
import * as api from '@/lib/api';
import { addAxiosError } from '@/lib/store/alert/alertSlice';
import type { Error } from '../type';

export const generatePersonalityText = (traits: Array<string>) => {
    return async (dispatch: Dispatch, getState: () => RootState) => {
        if (!getState().authentication.sub) {
            throw new Error('No sub found');
        }
        dispatch(setLoading(true));
        try {
            const response = await api.generatePersonalityText(getState().authentication.sub!, traits);
            // await api.delay(3000);
            // const newText = 'gen: ' + traits.join(', ');
            // const response = newText;
            return response;
        } catch (error) {
            console.error('Generate personality text error:', error);
            dispatch(addAxiosError({ title: '', error: error as Error }));
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    };
};

export const improvePersonalityText = (traits: Array<string>, previousText: string) => {
    return async (dispatch: Dispatch, getState: () => RootState) => {
        if (!getState().authentication.sub) {
            throw new Error('No sub found');
        }
        dispatch(setLoading(true));
        try {
            const response = await api.improvePersonalityText(getState().authentication.sub!, traits, previousText);
            // await api.delay(3000);
            // const newText = 'gen: ' + traits.join(', ');
            // const response = previousText ? 'was: ' + previousText + ' ' + newText : newText;
            return response;
        } catch (error) {
            console.error('Improve personality text error:', error);
            dispatch(addAxiosError({ title: '', error: error as Error }));
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    };
};
