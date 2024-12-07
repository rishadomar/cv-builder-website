'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/lib/store/hooks';
import { useRouter } from 'next/navigation';
import * as services from '@/lib/services';
import PasswordField, { PasswordFieldRef } from '@/components/PasswordField';
import { CustomError } from '@/lib/utils/customError';
import LinkButton from '@/components/core/LinkButton';
import { Loader } from 'lucide-react';
import { toast } from 'react-toastify';
import EmailField, { EmailFieldRef } from '@/components/EmailField';

interface AuthenticationLoginFormProps extends React.HTMLAttributes<HTMLDivElement> {
    onForgotPassword: () => void;
    onConfirmForgotPassword: () => void;
}

export function AuthenticationLoginForm({
    onForgotPassword,
    onConfirmForgotPassword,
    className,
    ...props
}: AuthenticationLoginFormProps) {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const emailRef = React.useRef<EmailFieldRef>(null);
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [emailIsValid, setEmailIsValid] = React.useState<boolean>(false);
    const [passwordIsValid, setPasswordIsValid] = React.useState<boolean>(false);
    const passwordRef = React.useRef<PasswordFieldRef>(null);
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
                await dispatch(services.login(email, password));
                router.replace('/builder');
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
                <h1 className='text-2xl font-semibold tracking-tight'>Sign In</h1>
                <p className='text-sm text-muted-foreground'>Enter your email & password below to sign in</p>
            </div>

            <div className={cn('grid gap-6', className)} {...props}>
                <form onSubmit={onSubmit}>
                    <div className='grid gap-2'>
                        <EmailField value={email} onChange={setEmail} isLoading={isLoading} ref={emailRef} />
                        <PasswordField
                            onChange={setPassword}
                            value={password}
                            withHelp={false}
                            isLoading={false}
                            ref={passwordRef}
                        />
                        <Button disabled={isLoading || !emailIsValid || !passwordIsValid} name='sign-in'>
                            {isLoading && <Loader className='mr-2 h-4 w-4 animate-spin' />}
                            Login
                        </Button>
                        <LinkButton onClick={onForgotPassword} label='Forgot Password?' />
                        <LinkButton
                            onClick={onConfirmForgotPassword}
                            label='Have a code to reset forgotten password?'
                        />
                    </div>
                </form>
            </div>
        </>
    );
}
