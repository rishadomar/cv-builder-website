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

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}
export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    const [, setErrorMessage] = React.useState<string | null>(null);
    const router = useRouter();

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault();
        setIsLoading(true);
        if (email && password) {
            try {
                await dispatch(services.registerNewUser(email, password));
                router.push('/builder');
            } catch (error) {
                console.error('Login error:', error);
                setErrorMessage('An error occurred. Please try again.');
            } finally {
                setIsLoading(false);
            }
        } else if (email) {
            setShowPassword(true);
            setIsLoading(false);
        }
    }

    if (showPassword) {
        return (
            <>
                <div className='flex flex-col space-y-2 text-center'>
                    <h1 className='text-2xl font-semibold tracking-tight'>Create an account</h1>
                    <p className='text-sm text-muted-foreground'>Enter your email below to create your account</p>
                </div>

                <div className={cn('grid gap-6', className)} {...props}>
                    <form onSubmit={onSubmit}>
                        <div className='grid gap-2'>
                            <div className='grid gap-1'>
                                <Label className='sr-only' htmlFor='email'>
                                    Email
                                </Label>
                                <Input id='email' type='email' readOnly value={email} />
                            </div>
                            <div className='grid gap-1 mb-4'>
                                <Label className='sr-only' htmlFor='email'>
                                    Password
                                </Label>
                                <Input
                                    id='password'
                                    type='password'
                                    placeholder='Password'
                                    autoCapitalize='none'
                                    disabled={isLoading}
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                                <div className='flex flex-col'>
                                    <span className='text-xs text-muted-foreground'>
                                        The password must be atleast 8 characters long.
                                    </span>
                                    <span className='text-xs text-muted-foreground'>
                                        {' '}
                                        Contain 1 number and 1 lowercase letter.
                                    </span>
                                </div>
                            </div>
                            <Button disabled={isLoading} name='sign-in'>
                                {isLoading && <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />}
                                Create Account
                            </Button>
                        </div>
                    </form>
                </div>
            </>
        );
    }

    return (
        <>
            <div className='flex flex-col space-y-2 text-center'>
                <h1 className='text-2xl font-semibold tracking-tight'>Create an account</h1>
                <p className='text-sm text-muted-foreground'>Enter your email below to create your account</p>
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
                                placeholder='name@example.com'
                                type='email'
                                autoCapitalize='none'
                                autoComplete='email'
                                autoCorrect='off'
                                disabled={isLoading}
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <Button disabled={isLoading} name='sign-in'>
                            {isLoading && <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />}
                            Continue with Email
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}
