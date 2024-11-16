'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { getCookie } from '@/lib/utils';

export default function LogoutButton() {
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
            Logout
        </Button>
    );
}
