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
    if (sub) {
        if (args.body) {
            args.body.sub = sub;
        } else {
            args.body = { sub };
        }
    }
    return baseQuery(args, api, extraOptions);
};

export { customBaseQuery, injectSub };
