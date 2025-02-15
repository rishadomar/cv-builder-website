import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery, injectSub } from './customBaseQuery';
import { LoginResponse, LogoutResponse, RegisterNewUserResponse } from '@/lib/type';
import { setLoading } from '@/lib/store/loading/loadingSlice';
import { setCookie } from '@/lib/utils';
import { setAuthenticationDetails } from '@/lib/store/authentication/authenticationSlice';
import { readRecordFromStore } from './databaseApiUtils';
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
                    await readRecordFromStore(data.Sub, arg.email);
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
        )
    })
});

export const {
    useLoginMutation,
    useLogoutMutation,
    useRegisterNewUserMutation,
    useForgotPasswordMutation,
    useConfirmForgotPasswordMutation
} = authenticationApiSlice;
