'use client';
import { useAppSelector } from '@/lib/store/hooks';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { getCookie } from '@/lib/utils';
import { Icons } from '@/components/icons';

export default function LogoutButton() {
    const isLoading = useAppSelector((state) => state.loading.isLoading);
    const router = useRouter();

    return (
        <Button
            name='sign-out'
            variant={'default'}
            onClick={async () => {
                if (getCookie('Google')) {
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
