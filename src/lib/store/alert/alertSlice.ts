import { Error } from '@/lib/type';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type AddAxiosErrorPayload = {
    title: string;
    error: Error;
};

// Define a type for the slice state
interface AlertState {
    entries: string[];
}

// Define the initial state using that type
const initialState: AlertState = {
    entries: []
};

export const alertSlice = createSlice({
    name: 'alert',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        addAlert: (state, action: PayloadAction<string>) => {
            state.entries.push(action.payload);
        },
        removeAlert: (state, action: PayloadAction<string>) => {
            const i = state.entries.findIndex((entry) => entry === action.payload);
            if (i) {
                state.entries.splice(i, 1);
            }
        },
        addAxiosError: (state, action: PayloadAction<AddAxiosErrorPayload>) => {
            state.entries.push(
                `Error encountered: ${action.payload.title}: ${action.payload.error.response.data.error}`
            );
        }
    }
});

export const { addAlert, removeAlert, addAxiosError } = alertSlice.actions;

export default alertSlice.reducer;
