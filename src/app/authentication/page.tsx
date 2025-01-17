'use client';
import { OverlaySpinner } from '@/components/OverlaySpinner';
import { selectIsLoggedIn } from '@/lib/store/authentication/authenticationSlice';
import { useAppSelector } from '@/lib/store/hooks';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthenticationPage() {
    const isLoggedIn = useAppSelector(selectIsLoggedIn);
    const router = useRouter();

    useEffect(() => {
        if (isLoggedIn) {
            router.push('/builder');
        } else {
            router.push('/authentication/signup');
        }
    }, [isLoggedIn, router]);

    // Add a loading state or return null
    return <OverlaySpinner />;
}
