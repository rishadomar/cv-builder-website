'use client';

import React from 'react';
import { validateGoogleLogin } from '@/api/auth/authApi';
import { setCookie } from '@/lib/cookies';

export default function GoogleLoginSuccessPage() {
    const [loading, setLoading] = React.useState<boolean>(true);
    const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
    const hasFetchedData = React.useRef(false);

    React.useEffect(() => {
        if (hasFetchedData.current) {
            return;
        }

        const fetchData = async () => {
            try {
                const urlParams = new URLSearchParams(window.location.search);
                const code = urlParams.get('code');
                const error = urlParams.get('error');

                if (error) {
                    throw new Error(error);
                }

                if (!code) {
                    throw new Error('No code found in URL parameters');
                }

                const response = await validateGoogleLogin(code);
                setCookie('AccessToken', response.access_token);
                setCookie('IdToken', response.id_token);
                setCookie('RefreshToken', response.refresh_token);
                setCookie('Sub', response.sub);
                setCookie('Email', response.email);

                console.log('Response:', response);
            } catch (error) {
                if (error instanceof Error) {
                    setErrorMessage(error.message);
                } else {
                    setErrorMessage('An unknown error occurred');
                }
            } finally {
                hasFetchedData.current = true;
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures this runs only once
    return (
        <div className='min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
            {loading && <p>Loading...</p>}
            {errorMessage && <p>Some error {errorMessage}</p>}
            {!loading && !errorMessage && <p>Authenticated successfully!</p>}
        </div>
    );
}
