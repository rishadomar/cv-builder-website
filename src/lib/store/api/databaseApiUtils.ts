import { databaseApiSlice } from './databaseApiSlice';
import { getStore } from '../store';
import { setReading } from '../loading/loadingSlice';

// Function to invalidate cache and trigger a refetch through RTK Query
export const refreshRecordData = async (sub: string, email: string) => {
    const store = getStore();
    store.dispatch(setReading(true));
    // Invalidate the cache for this tag to force a refetch
    store.dispatch(databaseApiSlice.util.invalidateTags(['FieldValues']));
    const r = await store.dispatch(databaseApiSlice.endpoints.readRecord.initiate({ sub, email })).unwrap();
    store.dispatch(setReading(false));
    return r;
};
