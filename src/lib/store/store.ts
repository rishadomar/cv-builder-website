import { configureStore } from '@reduxjs/toolkit';
import alertReducer from './alert/alertSlice';
import loadingReducer from './loading/loadingSlice';
import fieldValuesReducer from './fieldValues/fieldValuesSlice';
import authenticationReducer from './authentication/authenticationSlice';
import templateSelectionReducer from './templateSelection/templateSelectionSlice';
import { aiApiSlice } from './api/aiApiSlice';
import errorMiddleware from './api/errorMiddleware';

export const makeStore = () => {
    return configureStore({
        reducer: {
            alert: alertReducer,
            loading: loadingReducer,
            authentication: authenticationReducer,
            fieldValues: fieldValuesReducer,
            templateSelection: templateSelectionReducer,
            [aiApiSlice.reducerPath]: aiApiSlice.reducer
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(aiApiSlice.middleware, errorMiddleware)
    });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
