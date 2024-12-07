import axios, { AxiosError } from 'axios';
import axiosInstance from '@/lib/api/axios/axiosInstance';
import { jwtDecode } from 'jwt-decode';
import { getCookie, setCookie } from '@/lib/utils/cookies';
import { CustomError } from '@/lib/utils/customError';

export type GoogleLoginResponse = {
    access_token: string;
    id_token: string;
    refresh_token: string;
    sub: string;
    email: string;
};

// Define the service function to fetch data from a given URL
export async function validateGoogleLogin(code: string): Promise<GoogleLoginResponse> {
    try {
        // Make the GET request using Axios
        console.log('ENV VAR API_GATEWAY', process.env.NEXT_PUBLIC_API_GATEWAY_URL);
        const response = await axios.post(process.env.NEXT_PUBLIC_API_GATEWAY_URL + '/validateGoogleLogin', {
            code,
            callbackURL: `${window.location.origin}/google-login-success`
        });
        console.log(response.data);
        // Return the response data
        return response.data;
    } catch (error) {
        // Handle any errors
        console.error('Error fetching data:', error);
        throw error;
    }
}

export type LoginResponse = {
    AccessToken: string;
    IdToken: string;
    RefreshToken: string;
    Sub: string;
};

// Define the service function to fetch data from a given URL
export async function login(email: string, password: string): Promise<LoginResponse> {
    try {
        // Make the GET request using Axios
        const response = await axiosInstance.post('/login', {
            email,
            password
        });
        console.log(response.data);
        return response.data;
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            console.log('Error fetching data:', error.response?.data);
            throw new CustomError(
                error.response?.data?.error || 'An error occurred while logging in',
                error.response?.status || 500,
                error.response?.data
            );
        } else {
            console.log('Error fetching data:', error);
            throw new CustomError('An unknown error occurred', 500, error);
        }
    }
}

export type RegisterNewUserResponse = {
    sub: string;
    email: string;
};

export async function registerNewUser(email: string, password: string): Promise<RegisterNewUserResponse> {
    try {
        // Make the GET request using Axios
        const response = await axiosInstance.post('/registerNewUser', {
            email,
            password
        });

        console.log(response.data);
        return response.data;
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            console.log('Error fetching data:', error.response?.data);
            throw new CustomError(
                error.response?.data?.error || 'An error occurred while logging in',
                error.response?.status || 500,
                error.response?.data
            );
        } else {
            console.log('Error fetching data:', error);
            throw new CustomError('An unknown error occurred', 500, error);
        }
    }
}

type LogoutResponse = {
    message: string;
};

export async function logout(email: string, accessToken: string): Promise<LogoutResponse> {
    try {
        // Make the GET request using Axios
        return await axiosInstance.post('/logout', { email, accessToken });
    } catch (error: unknown) {
        // Handle any errors
        throw (error as Error).cause;
    }
}

export async function forgotPassword(email: string) {
    try {
        // Make the GET request using Axios
        const response = await axiosInstance.post('/forgotPassword', { email });
        console.log(response.data);
        return response.data;
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            console.log('Error fetching data:', error.response?.data);
            throw new CustomError(
                error.response?.data?.error || 'An error occurred during forgotten password',
                error.response?.status || 500,
                error.response?.data
            );
        } else {
            console.log('Error fetching data:', error);
            throw new CustomError('An unknown error occurred', 500, error);
        }
    }
}

export async function resetPassword(email: string, newPassword: string, verificationCode: string) {
    try {
        // Make the GET request using Axios
        const response = await axiosInstance.post('/resetPassword', { email, newPassword, verificationCode });
        console.log(response.data);
        return response.data;
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            console.log('Error fetching data:', error.response?.data);
            throw new CustomError(
                error.response?.data?.error || 'An error occurred resetting password',
                error.response?.status || 500,
                error.response?.data
            );
        } else {
            console.log('Error fetching data:', error);
            throw new CustomError('An unknown error occurred', 500, error);
        }
    }
}

export async function confirmSignup(email: string, verificationCode: string) {
    try {
        // Make the GET request using Axios
        const response = await axiosInstance.post('/confirmSignup', { email, verificationCode });
        console.log(response.data);
        return response.data;
    } catch (error: unknown) {
        // Handle any errors
        throw (error as Error).cause;
    }
}

export async function confirmForgotPassword(email: string, verificationCode: string, password: string) {
    try {
        // Make the GET request using Axios
        const response = await axiosInstance.post('/confirmForgotPassword', { email, verificationCode, password });
        console.log(response.data);
        return response.data;
    } catch (error: unknown) {
        // Handle any errors
        throw (error as Error).cause;
    }
}

export const isTokenExpired = (token: string) => {
    const decodedToken = jwtDecode(token);
    if (!decodedToken || !decodedToken.exp) {
        return true;
    }
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
};

export const refreshToken = async () => {
    const refreshToken = getCookie('RefreshToken');
    if (!refreshToken) {
        throw new Error('No RefreshToken available in Cookie');
    }

    try {
        const response = await axios.post(process.env.NEXT_PUBLIC_API_GATEWAY_URL + '/refresh_token', {
            refreshToken
        });

        console.log('After refresh_token', response.data);
        const { AccessToken, IdToken } = response.data;

        setCookie('AccessToken', AccessToken);
        setCookie('IdToken', IdToken);
    } catch (error) {
        console.error('Token refresh failed:', error);
        throw error;
    }
};

export const getIdToken = async () => {
    let idToken = getCookie('IdToken');
    if (!idToken) {
        return null;
    }
    if (isTokenExpired(idToken)) {
        await refreshToken();
        idToken = getCookie('IdToken');
    }
    return idToken;
};
