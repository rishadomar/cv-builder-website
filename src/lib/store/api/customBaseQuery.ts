import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@/lib/store/store';
import { getIdToken } from '@/lib/api/auth/authApi';

const customBaseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_GATEWAY_URL,
    prepareHeaders: async (headers) => {
        const idToken = await getIdToken();
        if (idToken) {
            headers.set('Authorization', `Bearer ${idToken}`);
        }

        return headers;
    }
});

const injectSub = async (args: any, api: any, extraOptions: any, baseQuery: any) => {
    const state = api.getState() as RootState;
    const sub = state.authentication.sub;

    if (!sub) return baseQuery(args, api, extraOptions);

    // Clone args to avoid mutating the original
    const modifiedArgs = { ...args };

    // Handle based on HTTP method
    switch (args.method?.toUpperCase()) {
        case 'GET':
            // Add sub as query parameter
            modifiedArgs.url = `${args.url}${args.url.includes('?') ? '&' : '?'}sub=${sub}`;
            break;

        case 'DELETE':
            // Add sub as query parameter for DELETE
            modifiedArgs.url = `${args.url}${args.url.includes('?') ? '&' : '?'}sub=${sub}`;
            break;

        case 'POST':
        case 'PUT':
        case 'PATCH':
            // Add sub to body for these methods
            modifiedArgs.body = {
                ...(args.body || {}),
                sub
            };
            break;
    }

    return baseQuery(modifiedArgs, api, extraOptions);
};

export { customBaseQuery, injectSub };
