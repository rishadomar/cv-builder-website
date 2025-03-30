// store/loadingSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoadingState {
    isLoading: boolean;
    isReading: boolean;
    isSaving: boolean;
    isThinking: boolean;
}

const initialState: LoadingState = {
    isLoading: false,
    isReading: false,
    isSaving: false,
    isThinking: false
};

const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setReading: (state, action: PayloadAction<boolean>) => {
            state.isReading = action.payload;
        },
        setSaving: (state, action: PayloadAction<boolean>) => {
            state.isSaving = action.payload;
        },
        setThinking: (state, action: PayloadAction<boolean>) => {
            state.isThinking = action.payload;
        }
    }
});

export const { setLoading, setReading, setSaving, setThinking } = loadingSlice.actions;
export default loadingSlice.reducer;
