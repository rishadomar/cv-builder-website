'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/lib/store/hooks';
import { useRouter } from 'next/navigation';
import * as services from '@/lib/services';
import PasswordField, { PasswordFieldRef } from '@/components/PasswordField';
import { Loader } from 'lucide-react';
import { CustomError } from '@/lib/utils/customError';
import EmailField, { EmailFieldRef } from '@/components/EmailField';
import { toast } from '@/hooks/use-toast';

interface AuthenticationSignupFormProps extends React.HTMLAttributes<HTMLDivElement> {}
export function AuthenticationSignupForm({ className, ...props }: AuthenticationSignupFormProps) {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [email, setEmail] = React.useState<string>('');
    const emailRef = React.useRef<EmailFieldRef>(null);
    const [password, setPassword] = React.useState<string>('');
    const passwordRef = React.useRef<PasswordFieldRef>(null);
    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    const [emailIsValid, setEmailIsValid] = React.useState<boolean>(false);
    const [passwordIsValid, setPasswordIsValid] = React.useState<boolean>(false);
    const router = useRouter();

    React.useEffect(() => {
        emailRef.current?.focus();
    }, []);

    React.useEffect(() => {
        if (emailRef.current?.isValid()) {
            setEmailIsValid(true);
        } else {
            setEmailIsValid(false);
        }
    }, [email]);

    React.useEffect(() => {
        if (passwordRef.current?.isValid()) {
            setPasswordIsValid(true);
        } else {
            setPasswordIsValid(false);
        }
    }, [password]);

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault();
        setIsLoading(true);
        if (email && password) {
            try {
                await dispatch(services.registerNewUser(email, password));
                router.push('/builder');
            } catch (error) {
                if (error instanceof CustomError) {
                    toast({
                        variant: 'destructive',
                        title: 'Error',
                        description: error.message
                    });
                } else {
                    toast({
                        variant: 'destructive',
                        title: 'Error',
                        description: 'An unexpected error occurred. Please try again.'
                    });
                }
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
                <div className='flex flex-col space-y-4 text-center mb-4 mt-4'>
                    <h1 className='text-2xl font-semibold tracking-tight'>Create an account</h1>
                    <p className='text-sm text-muted-foreground'>Enter your email below to create your account</p>
                </div>

                <div className={cn('grid gap-6', className)} {...props}>
                    <form onSubmit={onSubmit}>
                        <div className='grid gap-2'>
                            <EmailField
                                value={email}
                                onChange={setEmail}
                                isLoading={isLoading}
                                ref={emailRef}
                                showValidity
                            />
                            <PasswordField
                                value={password}
                                onChange={setPassword}
                                isLoading={isLoading}
                                withHelp={true}
                                ref={passwordRef}
                                showValidity
                            />
                            <Button disabled={isLoading || !emailIsValid || !passwordIsValid} name='sign-in'>
                                {isLoading && <Loader className='mr-2 h-4 w-4 animate-spin' />}
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
            <div className='flex flex-col space-y-2 text-center mb-4'>
                <h1 className='text-2xl font-semibold tracking-tight'>Create an account</h1>
                <p className='text-sm text-muted-foreground'>Enter your email below to create your account</p>
            </div>

            <div className={cn('grid gap-6', className)} {...props}>
                <form onSubmit={onSubmit}>
                    <div className='grid gap-2'>
                        <EmailField
                            isLoading={isLoading}
                            value={email}
                            onChange={setEmail}
                            ref={emailRef}
                            showValidity
                        />
                        <Button disabled={isLoading || !emailIsValid} name='sign-up'>
                            {isLoading && <Loader className='mr-2 h-4 w-4 animate-spin' />}
                            Create account with Email
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}
