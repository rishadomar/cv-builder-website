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
            const accessTokenCookie = document.cookie.includes('AccessToken');
            const idTokenCookie = document.cookie.includes('IdToken');
            const refreshTokenCookie = document.cookie.includes('RefreshToken');
            const subCookie = document.cookie.includes('Sub');
            const emailCookie = document.cookie.includes('Email');

            const allCookiesAvailable =
                accessTokenCookie && idTokenCookie && refreshTokenCookie && subCookie && emailCookie;

            setIsAuthenticated(allCookiesAvailable);

            if (!allCookiesAvailable) {
                router.replace('/authentication/login');
            }
        } catch (error) {
            console.error('Authentication check failed:', error);
            router.replace('/authentication/login');
        } finally {
            setIsLoading(false);
        }
    }, [router]);

    return {
        isAuthenticated,
        isLoading
    };
}
