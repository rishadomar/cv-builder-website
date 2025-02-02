'use client';
import * as React from 'react';
import { useAppSelector } from '@/lib/store/hooks';
import { useRouter } from 'next/navigation';
import { useLogoutMutation } from '@/lib/store/api/authenticationApiSlice';

export default function LogoutPage() {
    const router = useRouter();
    const authentication = useAppSelector((state) => state.authentication);
    const [logoutMutation] = useLogoutMutation();

    // const [isLoading, setIsLoading] = React.useState<boolean>(false);
    React.useEffect(() => {
        const logout = async () => {
            try {
                await logoutMutation({
                    email: authentication.email!,
                    accessToken: authentication.accessToken!
                }).unwrap();
                router.push('/authentication/login');
            } catch (error) {
                console.error('Logout error:', error);
                router.push('/authentication/login');
            } finally {
            }
        };

        if (authentication.email && authentication.accessToken) {
            logout();
        } else {
            router.push('/authentication/login');
        }
    }, []);

    return <div>Busy logging you out...</div>;
}
