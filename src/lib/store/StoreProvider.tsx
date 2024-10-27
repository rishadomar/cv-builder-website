'use client';
import { useEffect, useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from './store';

export default function StoreProvider({ children }: { children: React.ReactNode }) {
    const storeRef = useRef<AppStore>();
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = makeStore();
    }

    useEffect(() => {
        if (!storeRef.current) {
            return;
        }
        // Log the latest state whenever the component mounts or updates
        const unsubscribe = storeRef.current.subscribe(() => {
            console.log('Latest state:', storeRef.current!.getState());
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    return <Provider store={storeRef.current}>{children}</Provider>;
}
