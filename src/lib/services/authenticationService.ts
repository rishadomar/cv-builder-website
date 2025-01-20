// services/authService.ts
import { Dispatch } from 'redux';
import * as authApi from '@/lib/api';

import { resetAuthenticationDetails, setAuthenticationDetails } from '@/lib/store/authentication/authenticationSlice';
import { resetFieldValues } from '@/lib/store/fieldValues/fieldValuesSlice';
import { RootState } from '@/lib/store/store';
import { deleteCookie, getCookie, setCookie } from '@/lib/utils/cookies';
import { setLoading } from '@/lib/store/loading/loadingSlice';
import { readRecordFromStore } from '../store/api/databaseApiUtils';

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

            return await readRecordFromStore(sub, email);
        } catch (error) {
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
            setCookie('Google', 'true');

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

            return await readRecordFromStore(response.sub, response.email);
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
            setCookie('Google', 'false');

            dispatch(
                setAuthenticationDetails({
                    idToken: response.IdToken,
                    accessToken: response.AccessToken,
                    refreshToken: response.RefreshToken,
                    sub: response.Sub,
                    email: email
                })
            );

            return await readRecordFromStore(response.Sub, email);
        } catch (error: unknown) {
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
            if (!getCookie('Google')) {
                const email = getState().authentication.email;
                const accessToken = getState().authentication.accessToken;
                if (email && accessToken) {
                    await authApi.logout(email, accessToken);
                }
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
            deleteCookie('Google');

            dispatch(resetFieldValues());
            dispatch(setLoading(false));
        }
    };
};

export const forgotPassword = (email: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(setLoading(true));
        try {
            await authApi.forgotPassword(email);
        } catch (error) {
            console.error('Forgot password error:', error);
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    };
};

export const confirmForgotPassword = (email: string, newPassword: string, code: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(setLoading(true));
        try {
            await authApi.confirmForgotPassword(email, newPassword, code);
        } catch (error) {
            console.error('Reset password error:', error);
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    };
};
