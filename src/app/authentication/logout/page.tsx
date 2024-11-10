'use client';
import * as React from 'react';
import * as services from '@/lib/services';
import { useAppDispatch } from '@/lib/store/hooks';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
    const dispatch = useAppDispatch();
    const router = useRouter();

    // const [isLoading, setIsLoading] = React.useState<boolean>(false);
    React.useEffect(() => {
        const logout = async () => {
            try {
                await dispatch(services.logout());
                router.push('/authentication');
            } catch (error) {
                console.error('Logout error:', error);
                router.push('/authentication');
            } finally {
            }
        };

        logout();
    }, []);

    return <div>Busy logging you out...</div>;
}
