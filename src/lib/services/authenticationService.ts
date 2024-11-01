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

            await readRecord(sub, email)(dispatch);
        } catch (error) {
            console.error('Load on refresh error:', error);
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    };
};

export const googleLogin = (code: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await authApi.validateGoogleLogin(code);
            setCookie('AccessToken', response.access_token);
            setCookie('IdToken', response.id_token);
            setCookie('RefreshToken', response.refresh_token);
            setCookie('Sub', response.sub);
            setCookie('Email', response.email);

            console.log('Response:', response);
            dispatch(
                setAuthenticationDetails({
                    idToken: response.id_token,
                    accessToken: response.access_token,
                    refreshToken: response.refresh_token,
                    sub: response.sub,
                    email: response.email
                })
            );
            await readRecord(response.sub, response.email)(dispatch);
        } catch (error) {
            console.error('Google login error:', error);
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    };
};

export const registerNewUser = (email: string, password: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(setLoading(true));
        try {
            await authApi.registerNewUser(email, password);
            await login(email, password)(dispatch);
        } catch (error) {
            console.error('Register new user error:', error);
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
            console.log('Sign in', response);
            setCookie('AccessToken', response.AccessToken);
            setCookie('IdToken', response.IdToken);
            setCookie('RefreshToken', response.RefreshToken);
            setCookie('Sub', response.Sub);
            setCookie('Email', email);

            dispatch(
                setAuthenticationDetails({
                    idToken: response.IdToken,
                    accessToken: response.AccessToken,
                    refreshToken: response.RefreshToken,
                    sub: response.Sub,
                    email: email
                })
            );

            await readRecord(response.Sub, email)(dispatch);
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
