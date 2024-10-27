import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { FieldValue, FieldValuesState, WorkExperienceEntry } from '../../type';
//import { compareWorkExperienceEntries } from '@/lib/firebase/saveData';

// Define the initial state using that type
const initialState: FieldValuesState = {
    sub: undefined,
    email: undefined,
    name: undefined,
    phoneNumber: undefined,
    preferredPronoun: undefined,
    excludeGender: undefined,
    city: undefined,
    country: undefined,
    province: undefined,
    preparedToRelocate: undefined,
    remoteWork: undefined,
    partiallyRemote: undefined,
    preferRemote: undefined,
    descriptionOfSelf: undefined,
    otherTraits: undefined,
    personalityText: undefined,
    hobbies: undefined,
    otherHobbies: undefined,
    workExperiences: undefined,
    payment: undefined,
    pdf_id: undefined,
    pdf_url: undefined
};

export const fieldvalueSlice = createSlice({
    name: 'fieldvalues',
    initialState,
    reducers: {
        setFieldValue: (state, action: PayloadAction<FieldValue>) => {
            const { field, value } = action.payload;
            state[field] = value;
        },
        resetFieldValues: (state) => {
            state.sub = undefined;
            state.email = undefined;
            state.name = undefined;
            state.phoneNumber = undefined;
            state.preferredPronoun = undefined;
            state.excludeGender = undefined;
            state.city = undefined;
            state.country = undefined;
            state.province = undefined;
            state.preparedToRelocate = undefined;
            state.remoteWork = undefined;
            state.partiallyRemote = undefined;
            state.preferRemote = undefined;
            state.descriptionOfSelf = undefined;
            state.otherTraits = undefined;
            state.personalityText = undefined;
            state.hobbies = undefined;
            state.otherHobbies = undefined;
            state.workExperiences = undefined;
            state.payment = undefined;
            state.pdf_id = undefined;
            state.pdf_url = undefined;
        },
        setFieldValues: (state, action: PayloadAction<FieldValue[]>) => {
            if (!action.payload || !Array.isArray(action.payload) || action.payload.length === 0) {
                return;
            }
            action.payload.forEach((fieldValue) => {
                state[fieldValue.field] = fieldValue.value;
            });
        },
        setWorkExperiences: (state, action: PayloadAction<WorkExperienceEntry[]>) => {
            state.workExperiences = action.payload;
            //state.workExperiences?.sort(compareWorkExperienceEntries);
        }
    }
});

export const { setFieldValue, resetFieldValues, setFieldValues, setWorkExperiences } = fieldvalueSlice.actions;

export default fieldvalueSlice.reducer;
