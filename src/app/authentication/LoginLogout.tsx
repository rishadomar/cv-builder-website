'use client';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { useAppSelector } from '@/lib/store/hooks';
import { useAppDispatch } from '@/lib/store/hooks';
import { selectIsLoggedIn } from '@/lib/store/authentication/authenticationSlice';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import * as services from '@/lib/services';

export default function LoginLogout() {
    const isLoggedIn = useAppSelector(selectIsLoggedIn);
    const dispatch = useAppDispatch();
    const router = useRouter();

    if (isLoggedIn) {
        return (
            <Button
                name='sign-out'
                className={cn(buttonVariants({ variant: 'default' }), 'absolute right-4 top-4 md:right-8 md:top-8')}
                onClick={async () => {
                    // This is a placeholder for the actual logout logic
                    console.log('Logging out');
                    await dispatch(services.logout());
                    router.push('/authentication');
                }}
            >
                Logout
            </Button>
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
