'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function useAuth() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        try {
            // Check for Cognito authentication cookies
            const authCookie = document.cookie.includes('AccessToken');

            setIsAuthenticated(authCookie);

            if (!authCookie) {
                router.replace('/authentication');
            }
        } catch (error) {
            console.error('Authentication check failed:', error);
            router.replace('/authentication');
        } finally {
            setIsLoading(false);
        }
    }, [router]);

    return {
        isAuthenticated,
        isLoading
    };
}
