import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { FieldValue, FieldValuesState, WorkExperienceEntry } from '../../type';
import { RootState } from '../store';
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
    personalityTraits: undefined,
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
            state.personalityTraits = undefined;
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

export const selectIsRemoteWorkPopulated = (state: RootState) => {
    return state.fieldValues.remoteWork !== undefined;
};

export const selectIsContactDetailsPopulated = (state: RootState) => {
    return state.fieldValues.sub !== undefined;
};

export const selectIsPersonalDetailsPopulated = (state: RootState) => {
    return state.fieldValues.name !== undefined;
};

export const selectIsLocationDetailsPopulated = (state: RootState) => {
    return state.fieldValues.city !== undefined;
};

export const selectIsPersonalityDetailsPopulated = (state: RootState) => {
    return state.fieldValues.personalityText !== undefined;
};

export const selectIsHobbiesPopulated = (state: RootState) => {
    return state.fieldValues.hobbies !== undefined;
};

export const selectIsWorkExperiencePopulated = (state: RootState) => {
    return state.fieldValues.workExperiences !== undefined;
};

export const selectIsReviewPersonalityDetailsPopulated = (state: RootState) => {
    return state.fieldValues.personalityTraits !== undefined;
};

export const selectIsPaymentValid = (state: RootState) => {
    const paymentDate = state.fieldValues.payment?.date;
    if (!paymentDate) {
        return false;
    }

    const today = new Date();
    const oneYearFromToday = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate());
    const paymentDateObj = new Date(paymentDate);

    return paymentDateObj <= oneYearFromToday;
};

export default fieldvalueSlice.reducer;
