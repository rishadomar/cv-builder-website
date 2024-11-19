'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '@/lib/store/hooks';
import { loadOnRefresh } from '@/lib/services';

const CookieLoader: React.FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        setTimeout(() => {
            dispatch(loadOnRefresh());
        }, 0);
    }, [dispatch]);

    return null;
};

export default CookieLoader;
