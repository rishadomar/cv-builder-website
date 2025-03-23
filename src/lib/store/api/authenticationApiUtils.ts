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
    const refreshToken = getCookie('RefreshToken');
    if (!refreshToken) {
        throw new Error('No RefreshToken available in Cookie');
    }

    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_GATEWAY_URL + '/refresh_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ refreshToken })
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const { AccessToken, IdToken } = data;

        setCookie('AccessToken', AccessToken);
        setCookie('IdToken', IdToken);
    } catch (error) {
        console.error('Token refresh failed:', error);
        throw error;
    }
};

export async function validateGoogleLogin(code: string): Promise<GoogleLoginResponse> {
    try {
        // Make the GET request using Axios
        const response = await fetch(process.env.NEXT_PUBLIC_API_GATEWAY_URL + '/validateGoogleLogin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ code: code, callbackURL: `${window.location.origin}/google-login-success` })
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = (await response.json()) as GoogleLoginResponse;
        setCookie('AccessToken', data.access_token);
        setCookie('IdToken', data.id_token);
        setCookie('RefreshToken', data.refresh_token);
        setCookie('Sub', data.sub);
        setCookie('Email', data.email);
        setCookie('Google', 'true');

        const store = getStore();
        store.dispatch(
            setAuthenticationDetails({
                idToken: data.id_token,
                accessToken: data.access_token,
                refreshToken: data.refresh_token,
                sub: data.sub,
                email: data.email
            })
        );

        await refreshRecordData(data.sub, data.email);
        return data;
    } catch (error) {
        // Handle any errors
        console.error('Error fetching data:', error);
        throw error;
    }
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
