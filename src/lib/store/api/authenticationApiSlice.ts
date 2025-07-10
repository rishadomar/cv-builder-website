import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery, injectSub } from './customBaseQuery';
import { LoginResponse, LogoutResponse, RegisterNewUserResponse } from '@/lib/type';
import { setLoading } from '@/lib/store/loading/loadingSlice';
import { setCookie } from '@/lib/utils';
import { setAuthenticationDetails } from '@/lib/store/authentication/authenticationSlice';
import { refreshRecordData } from './databaseApiUtils';
import { loginFromStore, resetAuthenticationFields } from './authenticationApiUtils';

export const authenticationApiSlice = createApi({
    reducerPath: 'authenticationApi',
    baseQuery: async (args, api, extraOptions) => injectSub(args, api, extraOptions, customBaseQuery),
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, { email: string; password: string }>({
            query: ({ email, password }) => ({
                url: '/login',
                method: 'POST',
                body: {
                    email,
                    password
                }
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setLoading(true));
                    const { data } = await queryFulfilled;
                    setCookie('AccessToken', data.AccessToken);
                    setCookie('IdToken', data.IdToken);
                    setCookie('RefreshToken', data.RefreshToken);
                    setCookie('Sub', data.Sub);
                    setCookie('Email', arg.email);
                    setCookie('Google', 'false');

                    dispatch(
                        setAuthenticationDetails({
                            idToken: data.IdToken,
                            accessToken: data.AccessToken,
                            refreshToken: data.RefreshToken,
                            sub: data.Sub,
                            email: arg.email
                        })
                    );
                    await refreshRecordData(data.Sub, arg.email);
                } finally {
                    dispatch(setLoading(false));
                }
            }
        }),

        logout: builder.mutation<LogoutResponse, { email: string; accessToken: string }>({
            query: ({ email, accessToken }) => ({
                url: '/logout',
                method: 'POST',
                body: {
                    email,
                    accessToken
                }
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setLoading(true));
                    await queryFulfilled;
                } finally {
                    await resetAuthenticationFields();
                    dispatch(setLoading(false));
                }
            }
        }),

        registerNewUser: builder.mutation<RegisterNewUserResponse, { email: string; password: string }>({
            query: ({ email, password }) => ({
                url: '/registerNewUser',
                method: 'POST',
                body: {
                    email,
                    password
                }
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setLoading(true));
                    await queryFulfilled;
                    await loginFromStore(arg.email, arg.password);
                } finally {
                    dispatch(setLoading(false));
                }
            }
        }),

        forgotPassword: builder.mutation<void, { email: string }>({
            query: ({ email }) => ({
                url: '/forgotPassword',
                method: 'POST',
                body: {
                    email
                }
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setLoading(true));
                    await queryFulfilled;
                } finally {
                    dispatch(setLoading(false));
                }
            }
        }),

        confirmForgotPassword: builder.mutation<void, { email: string; newPassword: string; verificationCode: string }>(
            {
                query: ({ email, newPassword, verificationCode }) => ({
                    url: '/confirmForgotPassword',
                    method: 'POST',
                    body: {
                        email,
                        newPassword,
                        verificationCode
                    }
                }),
                async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                    try {
                        dispatch(setLoading(true));
                        await queryFulfilled;
                    } finally {
                        dispatch(setLoading(false));
                    }
                }
            }
        ),

        refreshToken: builder.mutation<{ AccessToken: string; IdToken: string }, { refreshToken: string }>({
            query: ({ refreshToken }) => ({
                url: '/refresh_token',
                method: 'POST',
                body: {
                    refreshToken
                }
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    setCookie('AccessToken', data.AccessToken);
                    setCookie('IdToken', data.IdToken);
                } catch (error) {
                    console.error('Token refresh failed:', error);
                    throw error;
                }
            }
        }),

        validateGoogleLogin: builder.mutation<any, { code: string; callbackURL: string }>({
            query: ({ code, callbackURL }) => ({
                url: '/validateGoogleLogin',
                method: 'POST',
                body: {
                    code,
                    callbackURL
                }
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    setCookie('AccessToken', data.access_token);
                    setCookie('IdToken', data.id_token);
                    setCookie('RefreshToken', data.refresh_token);
                    setCookie('Sub', data.sub);
                    setCookie('Email', data.email);
                    setCookie('Google', 'true');

                    dispatch(
                        setAuthenticationDetails({
                            idToken: data.id_token,
                            accessToken: data.access_token,
                            refreshToken: data.refresh_token,
                            sub: data.sub,
                            email: data.email
                        })
                    );

                    await refreshRecordData(data.sub, data.email);
                } catch (error) {
                    console.error('Error validating Google login:', error);
                    throw error;
                }
            }
        })
    })
});

export const {
    useLoginMutation,
    useLogoutMutation,
    useRegisterNewUserMutation,
    useForgotPasswordMutation,
    useConfirmForgotPasswordMutation,
    useRefreshTokenMutation,
    useValidateGoogleLoginMutation
} = authenticationApiSlice;
