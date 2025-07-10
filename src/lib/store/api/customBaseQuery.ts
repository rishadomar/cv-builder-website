import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@/lib/store/store';
import { getIdToken } from './authenticationApiUtils';

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

    if (!sub) return retryOnServerError(args, api, extraOptions, baseQuery);

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

    return retryOnServerError(modifiedArgs, api, extraOptions, baseQuery);
};

const retryOnServerError = async (args: any, api: any, extraOptions: any, baseQuery: any) => {
    const maxRetries = 3;
    const retryDelay = 1000; // 1 second

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        const result = await baseQuery(args, api, extraOptions);

        // If request succeeded or it's not a 500 error, return the result
        if (!result.error || (result.error as any)?.status !== 500) {
            return result;
        }

        // If this was the last attempt, return the error
        if (attempt === maxRetries) {
            return result;
        }

        // Wait before retrying (exponential backoff)
        await new Promise((resolve) => setTimeout(resolve, retryDelay * Math.pow(2, attempt)));
    }
};

export { customBaseQuery, injectSub, retryOnServerError };
