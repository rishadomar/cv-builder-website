import { configureStore } from '@reduxjs/toolkit';
import alertReducer from './alert/alertSlice';
import loadingReducer from './loading/loadingSlice';
import fieldValuesReducer from './fieldValues/fieldValuesSlice';
import authenticationReducer from './authentication/authenticationSlice';
import { aiApiSlice } from './api/aiApiSlice';
import { databaseApiSlice } from './api/databaseApiSlice';
import { educationApiSlice } from './api/educationApiSlice';
import errorMiddleware from './api/errorMiddleware';
import { workExperienceApiSlice } from './api/workExperienceApiSlice';

export const makeStore = () => {
    return configureStore({
        reducer: {
            alert: alertReducer,
            loading: loadingReducer,
            authentication: authenticationReducer,
            fieldValues: fieldValuesReducer,
            [aiApiSlice.reducerPath]: aiApiSlice.reducer,
            [databaseApiSlice.reducerPath]: databaseApiSlice.reducer,
            [educationApiSlice.reducerPath]: educationApiSlice.reducer,
            [workExperienceApiSlice.reducerPath]: workExperienceApiSlice.reducer
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                .concat(aiApiSlice.middleware)
                .concat(databaseApiSlice.middleware)
                .concat(educationApiSlice.middleware)
                .concat(workExperienceApiSlice.middleware)
                .concat(errorMiddleware)
    });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
