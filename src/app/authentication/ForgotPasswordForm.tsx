'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { CustomError } from '@/lib/utils/customError';
import { Loader } from 'lucide-react';
import EmailField, { EmailFieldRef } from '@/components/EmailField';
import { toast } from '@/hooks/use-toast';
import { useForgotPasswordMutation } from '@/lib/store/api/authenticationApiSlice';

interface ForgotPasswordFormProps extends React.HTMLAttributes<HTMLDivElement> {
    onSuccess: () => void;
}

export function ForgotPasswordForm({ onSuccess, className, ...props }: ForgotPasswordFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const emailRef = React.useRef<EmailFieldRef>(null);
    const [email, setEmail] = React.useState<string>('');
    const [emailIsValid, setEmailIsValid] = React.useState<boolean>(false);
    const [forgotPassword] = useForgotPasswordMutation();

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

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault();
        setIsLoading(true);
        if (email) {
            try {
                await forgotPassword({ email }).unwrap();
                toast({
                    variant: 'default',
                    title: 'Success',
                    description: 'Password reset code sent to your email'
                });

                onSuccess();
            } catch (error: unknown) {
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
        }
    }

    return (
        <>
            <div className='flex flex-col space-y-2 text-center mb-4'>
                <h1 className='text-2xl font-semibold tracking-tight'>Forgot password</h1>
                <p className='text-sm text-muted-foreground'>Enter your email to reset your password</p>
            </div>

            <div className={cn('grid gap-6', className)} {...props}>
                <form onSubmit={onSubmit}>
                    <div className='grid gap-2'>
                        <EmailField isLoading={isLoading} value={email} onChange={setEmail} ref={emailRef} />
                        <Button disabled={isLoading || !emailIsValid} name='sign-in'>
                            {isLoading && <Loader className='mr-2 h-4 w-4 animate-spin' />}
                            Email reset code
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}
