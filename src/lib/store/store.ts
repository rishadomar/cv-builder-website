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
import { paymentApiSlice } from './api/paymentApiSlice';
import { pdfApiSlice } from './api/pdfApiSlice';
import { authenticationApiSlice } from './api/authenticationApiSlice';
import { audioApiSlice } from './api/audioApiSlice';

export type AppStore = ReturnType<typeof makeConfiguredStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

const makeConfiguredStore = () => {
    return configureStore({
        reducer: {
            alert: alertReducer,
            loading: loadingReducer,
            fieldValues: fieldValuesReducer,
            authentication: authenticationReducer,
            [aiApiSlice.reducerPath]: aiApiSlice.reducer,
            [databaseApiSlice.reducerPath]: databaseApiSlice.reducer,
            [educationApiSlice.reducerPath]: educationApiSlice.reducer,
            [workExperienceApiSlice.reducerPath]: workExperienceApiSlice.reducer,
            [paymentApiSlice.reducerPath]: paymentApiSlice.reducer,
            [pdfApiSlice.reducerPath]: pdfApiSlice.reducer,
            [authenticationApiSlice.reducerPath]: authenticationApiSlice.reducer,
            [audioApiSlice.reducerPath]: audioApiSlice.reducer
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                .concat(aiApiSlice.middleware)
                .concat(databaseApiSlice.middleware)
                .concat(educationApiSlice.middleware)
                .concat(workExperienceApiSlice.middleware)
                .concat(paymentApiSlice.middleware)
                .concat(pdfApiSlice.middleware)
                .concat(authenticationApiSlice.middleware)
                .concat(audioApiSlice.middleware)
                .concat(errorMiddleware)
    });
};

// Store instance
let storeInstance: AppStore | undefined;

// Create store function
export function makeStore() {
    if (!storeInstance) {
        storeInstance = makeConfiguredStore();
    }
    return storeInstance;
}

// Getter for non-React usage
export function getStore() {
    if (!storeInstance) {
        storeInstance = makeConfiguredStore();
    }
    return storeInstance;
}
