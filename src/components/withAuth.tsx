// src/components/withAuth.tsx
import React from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/lib/store/hooks';
import { selectIsLoggedIn } from '@/lib/store/authentication/authenticationSlice';

const withAuth = (WrappedComponent: React.ComponentType) => {
    const AuthenticatedComponent: React.FC = (props) => {
        const isLoggedIn = useAppSelector(selectIsLoggedIn);
        const router = useRouter();

        React.useEffect(() => {
            if (!isLoggedIn) {
                router.push('/authentication');
            }
        }, [isLoggedIn, router]);

        if (!isLoggedIn) {
            return null; // or a loading spinner
        }

        return <WrappedComponent {...props} />;
    };

    return AuthenticatedComponent;
};

export default withAuth;
