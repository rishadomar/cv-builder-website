'use client';

import React from 'react';
import * as services from '@/lib/services';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/lib/store/hooks';


export default function GoogleLoginSuccessPage() {
    const [loading] = React.useState<boolean>(true);
    const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
    const hasFetchedData = React.useRef(false);
    const dispatch = useAppDispatch();
    const router = useRouter();

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

                const response = await dispatch(services.googleLogin(code));
                console.log('Response:', response);
                router.push('/builder');
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
