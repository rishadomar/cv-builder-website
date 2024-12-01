import { Dispatch } from 'redux';
import { RootState } from '@/lib/store/store';
import { setLoading } from '@/lib/store/loading/loadingSlice';
import * as api from '@/lib/api';
import { setWorkExperiences } from '@/lib/store/fieldValues/fieldValuesSlice';
import type { WorkExperienceEntry, Error } from '@/lib/type';
import { addAxiosError } from '@/lib/store/alert/alertSlice';

export const addWorkExperience = (workExperienceEntry: WorkExperienceEntry) => {
    return async (dispatch: Dispatch, getState: () => RootState) => {
        if (!getState().authentication.sub) {
            throw new Error('No sub found');
        }
        dispatch(setLoading(true));
        try {
            const response = await api.addWorkExperienceEntry(getState().authentication.sub!, workExperienceEntry);
            dispatch(setWorkExperiences(response.workExperiences));
        } catch (error) {
            console.error('Add work experience error:', error);
            dispatch(addAxiosError({ title: 'Add work experience', error: error as Error }));
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    };
};

export const updateWorkExperience = (workExperienceEntry: WorkExperienceEntry) => {
    return async (dispatch: Dispatch, getState: () => RootState) => {
        if (!getState().authentication.sub) {
            throw new Error('No sub found');
        }
        dispatch(setLoading(true));
        try {
            const response = await api.updateWorkExperienceEntry(getState().authentication.sub!, workExperienceEntry);
            dispatch(setWorkExperiences(response.workExperiences));
        } catch (error) {
            console.error('Update work experience error:', error);
            dispatch(addAxiosError({ title: 'Error updating work experience', error: error as Error }));
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    };
};

export const deleteWorkExperience = (workExperienceEntry: WorkExperienceEntry) => {
    return async (dispatch: Dispatch, getState: () => RootState) => {
        if (!getState().authentication.sub) {
            throw new Error('No sub found');
        }
        dispatch(setLoading(true));
        try {
            const response = await api.deleteWorkExperienceEntry(getState().authentication.sub!, workExperienceEntry);
            dispatch(setWorkExperiences(response.workExperiences));
        } catch (error) {
            console.error('Delete work experience error:', error);
            dispatch(addAxiosError({ title: 'Deleting work experience', error: error as Error }));
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    };
};
