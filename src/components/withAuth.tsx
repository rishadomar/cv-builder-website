// src/components/withAuth.tsx
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/lib/store/hooks';
import { selectIsLoggedIn } from '@/lib/store/authentication/authenticationSlice';

const withAuth = (WrappedComponent: React.ComponentType) => {
    const AuthenticatedComponent: React.FC = (props) => {
        const isLoading = useAppSelector((state) => state.loading.isLoading);
        const isLoggedIn = useAppSelector(selectIsLoggedIn);
        const router = useRouter();

        useEffect(() => {
            console.log('isLoggedIn: ', isLoggedIn);
            if (!isLoading && isLoggedIn !== undefined) {
                if (!isLoggedIn) {
                    router.replace('/authentication');
                }
            }
        }, [isLoggedIn, isLoading, router]);

        if (isLoading) {
            return <div>Loading...</div>; // or a loading spinner
        }

        if (!isLoggedIn) {
            return null; // or a loading spinner
        }

        return <WrappedComponent {...props} />;
    };

    return AuthenticatedComponent;
};

export default withAuth;
