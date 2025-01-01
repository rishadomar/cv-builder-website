import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TemplateSelectionState {
    selected: string | undefined;
}

const initialState: TemplateSelectionState = {
    selected: undefined
};

const templateSelectionSlice = createSlice({
    name: 'templateSelection',
    initialState,
    reducers: {
        setTemplate: (state, action: PayloadAction<string>) => {
            state.selected = action.payload;
        }
    }
});

export const { setTemplate } = templateSelectionSlice.actions;
export default templateSelectionSlice.reducer;
