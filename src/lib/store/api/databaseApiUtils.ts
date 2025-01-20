import { FieldValue } from '@/lib/type';
import { getStore } from '../store';
import { databaseApiSlice } from './databaseApiSlice';

export async function readRecordFromStore(sub: string, email: string): Promise<FieldValue[]> {
    // Initialize the query
    const store = getStore();
    return await store.dispatch(databaseApiSlice.endpoints.readRecord.initiate({ sub, email })).unwrap();
}
