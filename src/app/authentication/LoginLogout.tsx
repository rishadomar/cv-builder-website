'use client';
import Link from 'next/link';
import { cn, getCookie } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { useAppSelector } from '@/lib/store/hooks';
import { selectIsLoggedIn } from '@/lib/store/authentication/authenticationSlice';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';

export default function LoginLogout() {
    const isLoggedIn = useAppSelector(selectIsLoggedIn);
    const isLoading = useAppSelector((state) => state.loading.isLoading);
    const router = useRouter();

    if (isLoggedIn) {
        const origin = window.location.origin;
        return (
            <Button
                name='sign-out'
                className={cn(buttonVariants({ variant: 'default' }), 'absolute right-4 top-4 md:right-8 md:top-8')}
                disabled={isLoading}
                onClick={async () => {
                    console.log('Logout button clicked: Google? ', getCookie('Google'));
                    if (getCookie('Google')) {
                        console.log(
                            'Google logout URL:',
                            `${process.env.NEXT_PUBLIC_COGNITO_DOMAIN}/logout?` +
                                new URLSearchParams({
                                    client_id: process.env.NEXT_PUBLIC_COGNITO_APP_CLIENT_ID as string,
                                    logout_uri: `${origin}/authentication/logout`
                                })
                        );
                        window.location.href =
                            `${process.env.NEXT_PUBLIC_COGNITO_DOMAIN}/logout?` +
                            new URLSearchParams({
                                client_id: process.env.NEXT_PUBLIC_COGNITO_APP_CLIENT_ID as string,
                                logout_uri: `${origin}/authentication/logout`
                            });
                    } else {
                        router.push('/authentication/logout');
                    }
                }}
            >
                {isLoading && <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />}Logout
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
