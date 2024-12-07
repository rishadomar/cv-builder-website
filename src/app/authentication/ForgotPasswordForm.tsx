'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/lib/store/hooks';
import * as services from '@/lib/services';
import { CustomError } from '@/lib/utils/customError';
import { Loader } from 'lucide-react';
import { toast } from 'react-toastify';
import EmailField, { EmailFieldRef } from '@/components/EmailField';

interface ForgotPasswordFormProps extends React.HTMLAttributes<HTMLDivElement> {
    onSuccess: () => void;
}

export function ForgotPasswordForm({ onSuccess, className, ...props }: ForgotPasswordFormProps) {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const emailRef = React.useRef<EmailFieldRef>(null);
    const [email, setEmail] = React.useState<string>('');
    const [emailIsValid, setEmailIsValid] = React.useState<boolean>(false);

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
                await dispatch(services.forgotPassword(email));
                toast.success('Password reset code sent to your email');
                onSuccess();
            } catch (error: unknown) {
                toast.error((error as CustomError).message);
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
