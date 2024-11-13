'use client';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { useAppSelector } from '@/lib/store/hooks';
import { selectIsLoggedIn } from '@/lib/store/authentication/authenticationSlice';
import LogoutButton from '@/components/LogoutButton';

export default function LoginLogout() {
    const isLoggedIn = useAppSelector(selectIsLoggedIn);

    if (isLoggedIn) {
        return (
            <div className='absolute right-4 top-4 md:right-8 md:top-8'>
                <LogoutButton />
            </div>
        );
    }

    return (
        <Link
            href='/authentication/signin'
            className={cn(buttonVariants({ variant: 'ghost' }), 'absolute right-4 top-4 md:right-8 md:top-8')}
        >
            Login
        </Link>
    );
}
