import { databaseApiSlice } from './databaseApiSlice';
import { getStore } from '../store';

// Function to invalidate cache and trigger a refetch through RTK Query
export const refreshRecordData = async (sub: string, email: string) => {
    const store = getStore();

    // Invalidate the cache for this tag to force a refetch
    store.dispatch(databaseApiSlice.util.invalidateTags(['FieldValues']));
    return store.dispatch(databaseApiSlice.endpoints.readRecord.initiate({ sub, email })).unwrap();
};
