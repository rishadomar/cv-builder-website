import { Dispatch } from 'redux';
import { RootState } from '@/lib/store/store';
import { setLoading } from '@/lib/store/loading/loadingSlice';
import * as api from '@/lib/api';
import { addAxiosError } from '@/lib/store/alert/alertSlice';
import { setFieldValues } from '@/lib/store/fieldValues/fieldValuesSlice';
import type { Error } from '../type';

export const generatePDF = () => {
    return async (dispatch: Dispatch, getState: () => RootState) => {
        if (!getState().authentication.sub) {
            throw new Error('No sub found');
        }
        dispatch(setLoading(true));
        try {
            const pdfId = await api.generatePDF(getState().authentication.sub!);
            dispatch(
                setFieldValues([
                    { field: 'pdf_id', value: pdfId },
                    { field: 'pdf_generated_date', value: new Date().toISOString() }
                ])
            );
        } catch (error) {
            console.error('Generate PDF error:', error);
            dispatch(addAxiosError({ title: 'Generate PDF ', error: error as Error }));
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    };
};

export const downloadPDF = () => {
    return async (dispatch: Dispatch, getState: () => RootState) => {
        if (!getState().authentication.sub) {
            throw new Error('No sub found');
        }
        dispatch(setLoading(true));
        try {
            const presignedUrl = await api.downloadPDF(getState().authentication.sub!);
            return presignedUrl;
        } catch (error) {
            console.error('Pre-signed URL error:', error);
            dispatch(addAxiosError({ title: 'Pre-signed URL ', error: error as Error }));
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    };
};
