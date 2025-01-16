'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppDispatch } from '@/lib/store/hooks';
import * as services from '@/lib/services';
import { CustomError } from '@/lib/utils/customError';
import { Loader } from 'lucide-react';
import PasswordField, { PasswordFieldRef } from '@/components/PasswordField';
import EmailField, { EmailFieldRef } from '@/components/EmailField';
import { toast } from '@/hooks/use-toast';

interface ConfirmForgotPasswordFormProps extends React.HTMLAttributes<HTMLDivElement> {
    onSuccess: () => void;
}

export function ConfirmForgotPasswordForm({ onSuccess, className, ...props }: ConfirmForgotPasswordFormProps) {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const emailRef = React.useRef<EmailFieldRef>(null);
    const passwordRef = React.useRef<PasswordFieldRef>(null);
    const [email, setEmail] = React.useState<string>('');
    const [emailIsValid, setEmailIsValid] = React.useState<boolean>(false);
    const [password, setPassword] = React.useState<string>('');
    const [confirmPassword, setConfirmPassword] = React.useState<string>('');
    const confirmPasswordRef = React.useRef<PasswordFieldRef>(null);
    const [code, setCode] = React.useState<string>('');

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

        try {
            await dispatch(services.confirmForgotPassword(email, password, code));
            toast({
                variant: 'default',
                title: 'Success',
                description: 'Password successfully reset'
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

    return (
        <>
            <div className='flex flex-col space-y-2 text-center mb-4 mt-4'>
                <h1 className='text-2xl font-semibold tracking-tight'>Reset your password</h1>
                <p className='text-sm text-muted-foreground'>Enter details below to reset your password</p>
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
                        <PasswordField
                            value={confirmPassword}
                            onChange={setConfirmPassword}
                            isLoading={isLoading}
                            withHelp={true}
                            ref={confirmPasswordRef}
                            match={password}
                            showValidity
                        />
                        <Label className='sr-only' htmlFor='code'>
                            Code via email
                        </Label>
                        <Input
                            id='code'
                            autoCapitalize='none'
                            placeholder='The code emailed to you'
                            autoComplete='off'
                            type='text'
                            value={code}
                            onChange={(event) => setCode(event.target.value)}
                        />
                        <Button
                            disabled={
                                isLoading ||
                                !passwordRef.current?.isValid() ||
                                password !== confirmPassword ||
                                !emailIsValid ||
                                code.length === 0
                            }
                            name='sign-in'
                        >
                            {isLoading && <Loader className='mr-2 h-4 w-4 animate-spin' />}
                            Reset Password
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}
