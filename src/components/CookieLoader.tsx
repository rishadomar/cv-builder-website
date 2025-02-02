'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '@/lib/store/hooks';
import { loadOnRefresh } from '@/lib/store/api/authenticationApiUtils';

const CookieLoader: React.FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        setTimeout(() => {
            loadOnRefresh();
        }, 0);
    }, [dispatch]);

    return null;
};

export default CookieLoader;
