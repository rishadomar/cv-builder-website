'use client';
import { selectIsLoggedIn } from '@/lib/store/authentication/authenticationSlice';
import { useAppSelector } from '@/lib/store/hooks';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const isLoggedIn = useAppSelector(selectIsLoggedIn);
    const router = useRouter();

    if (isLoggedIn) {
        router.push('/builder');
    } else {
        router.push('/authentication/signup');
    }
}
