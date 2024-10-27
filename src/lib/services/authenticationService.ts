// services/authService.ts
import { Dispatch } from 'redux';
import * as authApi from '@/lib/api';

import { resetAuthenticationDetails, setAuthenticationDetails } from '@/lib/store/authentication/authenticationSlice';
import { resetFieldValues } from '@/lib/store/fieldValues/fieldValuesSlice';
import { RootState } from '@/lib/store/store';
import { deleteCookie, getCookie, setCookie } from '@/lib/cookies';
import { setLoading } from '@/lib/store/loading/loadingSlice';
import { readRecord } from './databaseService';

export const loadOnRefresh = () => {
    return async (dispatch: Dispatch) => {
        dispatch(setLoading(true));

        try {
            const idToken = getCookie('IdToken');
            if (!idToken) {
                return;
            }
            const accessToken = getCookie('AccessToken');
            if (!accessToken) {
                return;
            }
            const refreshToken = getCookie('RefreshToken');
            if (!refreshToken) {
                return;
            }
            const sub = getCookie('Sub');
            if (!sub) {
                return;
            }
            const email = getCookie('Email');
            if (!email) {
                return;
            }
            dispatch(setAuthenticationDetails({ idToken, accessToken, refreshToken, sub, email }));

            await readRecord(sub)(dispatch);
        } catch (error) {
            console.error('Load on refresh error:', error);
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    };
};

export const login = (email: string, password: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await authApi.login(email, password);
            console.log('Sign in', response.data);
            setCookie('AccessToken', response.data.AccessToken);
            setCookie('IdToken', response.data.IdToken);
            setCookie('RefreshToken', response.data.RefreshToken);
            setCookie('Sub', response.data.Sub);
            setCookie('Email', email);

            dispatch(
                setAuthenticationDetails({
                    idToken: response.data.IdToken,
                    accessToken: response.data.AccessToken,
                    refreshToken: response.data.RefreshToken,
                    sub: response.data.Sub,
                    email: email
                })
            );

            await readRecord(response.data.Sub)(dispatch);
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    };
};

export const logout = () => {
    return async (dispatch: Dispatch, getState: () => RootState) => {
        dispatch(setLoading(true));
        try {
            const accessToken = getState().authentication.accessToken;
            if (accessToken) {
                await authApi.logout(accessToken);
            }
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            dispatch(resetAuthenticationDetails());

            deleteCookie('AccessToken');
            deleteCookie('IdToken');
            deleteCookie('RefreshToken');
            deleteCookie('Sub');
            deleteCookie('Email');

            dispatch(resetFieldValues());
            dispatch(setLoading(false));
        }
    };
};
