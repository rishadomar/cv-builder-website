'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { OverlaySpinner } from '@/components/OverlaySpinner';
import { validateGoogleLogin } from '@/lib/store/api/authenticationApiUtils';

export default function GoogleLoginSuccess() {
    const [loading] = React.useState<boolean>(true);
    const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
    const hasFetchedData = React.useRef(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    React.useEffect(() => {
        if (hasFetchedData.current) {
            return;
        }

        const fetchData = async () => {
            try {
                const code = searchParams.get('code');
                const error = searchParams.get('error');

                if (error) {
                    throw new Error(error);
                }

                if (!code) {
                    throw new Error('No code found in URL parameters');
                }

                await validateGoogleLogin(code);
                router.replace('/builder');
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
            {loading && <OverlaySpinner />}
            {errorMessage && <p>Some error {errorMessage}</p>}
            {!loading && !errorMessage && <p>Authenticated successfully!</p>}
        </div>
    );
}
