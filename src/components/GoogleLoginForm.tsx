'use client';

import * as React from 'react';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';

export function GoogleLoginForm() {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    async function onGoogleSignInSubmit(event: React.SyntheticEvent) {
        event.preventDefault();
        setIsLoading(true);

        const COGNITO_DOMAIN = process.env.NEXT_PUBLIC_COGNITO_DOMAIN;
        const COGNITO_APP_CLIENT_ID = process.env.NEXT_PUBLIC_COGNITO_APP_CLIENT_ID;

        const authorizeParams = new URLSearchParams();
        const origin = window.location.origin;

        console.log('Origin: ', origin);
        console.log('COGNITO_DOMAIN: ', COGNITO_DOMAIN);
        console.log('COGNITO_APP_CLIENT_ID: ', COGNITO_APP_CLIENT_ID);

        authorizeParams.append('response_type', 'code');
        authorizeParams.append('client_id', COGNITO_APP_CLIENT_ID as string);
        authorizeParams.append('redirect_uri', `${origin}/google-login-success`);
        authorizeParams.append('identity_provider', 'Google');
        authorizeParams.append('scope', 'profile email openid');

        const authUrl = `${COGNITO_DOMAIN}/oauth2/authorize?${authorizeParams.toString()}`;
        console.log('Auth URL: ', authUrl);

        window.location.href = authUrl;
    }

    return (
        <form onSubmit={onGoogleSignInSubmit}>
            <div className='relative'>
                <div className='absolute inset-0 flex items-center'>
                    <span className='w-full border-t' />
                </div>
                <div className='relative flex justify-center text-xs uppercase'>
                    <span className='bg-background px-2 text-muted-foreground'>Or continue with</span>
                </div>
            </div>
            <Button variant='outline' type='submit' disabled={isLoading} name='google-sign-in'>
                {isLoading ? (
                    <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
                ) : (
                    <Icons.google className='mr-2 h-4 w-4' />
                )}{' '}
                Google
            </Button>
        </form>
    );
}
