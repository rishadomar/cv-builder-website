import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { AuthenticationPayload } from '../../type';

// Define a type for the slice state
interface AuthenticationState {
    idToken: string | undefined;
    accessToken: string | undefined;
    refreshToken: string | undefined;
    sub: string | undefined;
    email: string | undefined;
}

// Define the initial state using that type
const initialState: AuthenticationState = {
    idToken: undefined,
    accessToken: undefined,
    refreshToken: undefined,
    sub: undefined,
    email: undefined
};

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        setAuthenticationDetails: (state, action: PayloadAction<AuthenticationPayload>) => {
            state.idToken = action.payload.idToken;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.sub = action.payload.sub;
            state.email = action.payload.email;
        },
        resetAuthenticationDetails: (state) => {
            state.idToken = undefined;
            state.accessToken = undefined;
            state.refreshToken = undefined;
            state.sub = undefined;
            state.email = undefined;
        }
    }
});

export const { setAuthenticationDetails, resetAuthenticationDetails } = authenticationSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectIsLoggedIn = (state: RootState) => state.authentication.sub !== undefined;

export default authenticationSlice.reducer;
