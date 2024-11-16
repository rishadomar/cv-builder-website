'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppDispatch } from '@/lib/store/hooks';
import { useRouter } from 'next/navigation';
import * as services from '@/lib/services';
import { CustomError } from '@/lib/utils/customError';
import LoginSwitchButton from '@/app/authentication/LoginSwitchButton';

interface ForgotPasswordFormProps extends React.HTMLAttributes<HTMLDivElement> {
    onLogin: () => void;
}

export function ForgotPasswordForm({ onLogin, className, ...props }: ForgotPasswordFormProps) {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const emailRef = React.useRef<HTMLInputElement>(null);
    const [email, setEmail] = React.useState<string>('');
    const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
    const router = useRouter();

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault();
        setErrorMessage(null);
        setIsLoading(true);
        if (email) {
            try {
                await dispatch(services.forgotPassword(email));
                router.push('/authentication/signin');
            } catch (error: unknown) {
                if (error instanceof CustomError) {
                    setErrorMessage(error.message);
                } else {
                    setErrorMessage('An unknown error occurred. Please try again.');
                }
            } finally {
                setIsLoading(false);
            }
        }
    }

    return (
        <>
            <LoginSwitchButton onClick={onLogin} />
            <div className='flex flex-col space-y-2 text-center'>
                <h1 className='text-2xl font-semibold tracking-tight'>Forgot password</h1>
                <p className='text-sm text-muted-foreground'>Enter your email to reset your password</p>
            </div>

            <div className={cn('grid gap-6', className)} {...props}>
                <form onSubmit={onSubmit}>
                    <div className='grid gap-2'>
                        <div className='grid gap-1'>
                            <Label className='sr-only' htmlFor='email'>
                                Email
                            </Label>
                            <Input
                                id='email'
                                autoCapitalize='none'
                                placeholder='Email'
                                type='email'
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                ref={emailRef}
                            />
                        </div>
                        {errorMessage && <p className='text-green-500 text-sm'>{errorMessage}</p>}
                        <Button disabled={isLoading || email.trim().length === 0} name='sign-in'>
                            {isLoading && <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />}
                            Send Reset Link
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}
