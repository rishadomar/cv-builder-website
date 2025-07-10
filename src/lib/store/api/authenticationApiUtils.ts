import { getStore } from '../store';
import { GoogleLoginResponse, LoginResponse } from '@/lib/type';
import { authenticationApiSlice } from './authenticationApiSlice';
import { jwtDecode } from 'jwt-decode';
import { deleteCookie, getCookie, setCookie } from '@/lib/utils';
import { resetAuthenticationDetails, setAuthenticationDetails } from '../authentication/authenticationSlice';
import { refreshRecordData } from './databaseApiUtils';
import { resetFieldValues } from '../fieldValues/fieldValuesSlice';

export async function loginFromStore(email: string, password: string): Promise<LoginResponse> {
    // Initialize the query
    const store = getStore();
    return await store.dispatch(authenticationApiSlice.endpoints.login.initiate({ email, password })).unwrap();
}

export const isTokenExpired = (token: string) => {
    const decodedToken = jwtDecode(token);
    if (!decodedToken || !decodedToken.exp) {
        return true;
    }
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
};

export const getIdToken = async () => {
    let idToken = getCookie('IdToken');
    if (!idToken) {
        return null;
    }
    const refreshTokenCookie = getCookie('RefreshToken');
    if (!refreshTokenCookie) {
        return null;
    }
    if (isTokenExpired(idToken)) {
        await refreshToken();
        idToken = getCookie('IdToken');
    }
    return idToken;
};

export const refreshToken = async () => {
    const refreshTokenValue = getCookie('RefreshToken');
    if (!refreshTokenValue) {
        throw new Error('No RefreshToken available in Cookie');
    }

    const store = getStore();
    return await store
        .dispatch(authenticationApiSlice.endpoints.refreshToken.initiate({ refreshToken: refreshTokenValue }))
        .unwrap();
};

export async function validateGoogleLogin(code: string): Promise<GoogleLoginResponse> {
    const store = getStore();
    return await store
        .dispatch(
            authenticationApiSlice.endpoints.validateGoogleLogin.initiate({
                code,
                callbackURL: `${window.location.origin}/google-login-success`
            })
        )
        .unwrap();
}

export async function resetAuthenticationFields() {
    const store = getStore();
    store.dispatch(resetFieldValues());
    store.dispatch(resetAuthenticationDetails());
    deleteCookie('AccessToken');
    deleteCookie('IdToken');
    deleteCookie('RefreshToken');
    deleteCookie('Sub');
    deleteCookie('Email');
    deleteCookie('Google');
}

export const loadOnRefresh = async () => {
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

    const store = getStore();
    store.dispatch(setAuthenticationDetails({ idToken, accessToken, refreshToken, sub, email }));
    return await refreshRecordData(sub, email);
};
