import { Dispatch } from 'redux';
import { RootState } from '@/lib/store/store';
import { setLoading } from '@/lib/store/loading/loadingSlice';
import * as api from '@/lib/api';
import { setEducationEntries } from '@/lib/store/fieldValues/fieldValuesSlice';
import type { EducationEntry, Error } from '@/lib/type';
import { addAxiosError } from '@/lib/store/alert/alertSlice';

export const addEducation = (educationEntry: EducationEntry) => {
    return async (dispatch: Dispatch, getState: () => RootState) => {
        if (!getState().authentication.sub) {
            throw new Error('No sub found');
        }
        dispatch(setLoading(true));
        try {
            const response = await api.addEducationEntry(getState().authentication.sub!, educationEntry);
            dispatch(setEducationEntries(response.educationEntries));
        } catch (error) {
            console.error('Add education error:', error);
            dispatch(addAxiosError({ title: 'Add education', error: error as Error }));
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    };
};

export const updateEducation = (educationEntry: EducationEntry) => {
    return async (dispatch: Dispatch, getState: () => RootState) => {
        if (!getState().authentication.sub) {
            throw new Error('No sub found');
        }
        dispatch(setLoading(true));
        try {
            const response = await api.updateEducationEntry(getState().authentication.sub!, educationEntry);
            dispatch(setEducationEntries(response.educationEntries));
        } catch (error) {
            console.error('Update education error:', error);
            dispatch(addAxiosError({ title: 'Error updating education', error: error as Error }));
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    };
};

export const deleteEducation = (educationEntry: EducationEntry) => {
    return async (dispatch: Dispatch, getState: () => RootState) => {
        if (!getState().authentication.sub) {
            throw new Error('No sub found');
        }
        dispatch(setLoading(true));
        try {
            const response = await api.deleteEducationEntry(getState().authentication.sub!, educationEntry);
            dispatch(setEducationEntries(response.educationEntries));
        } catch (error) {
            console.error('Delete education error:', error);
            dispatch(addAxiosError({ title: 'Deleting education', error: error as Error }));
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    };
};
