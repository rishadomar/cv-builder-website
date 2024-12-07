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
import { toast } from 'react-toastify';
import PasswordField, { PasswordFieldRef } from '../builder/PasswordField';
import EmailField, { EmailFieldRef } from '../builder/EmailField';

interface PasswordResetFormProps extends React.HTMLAttributes<HTMLDivElement> {
    onSuccess: () => void;
}

export function PasswordResetForm({ onSuccess, className, ...props }: PasswordResetFormProps) {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const emailRef = React.useRef<EmailFieldRef>(null);
    const passwordRef = React.useRef<PasswordFieldRef>(null);
    const [email, setEmail] = React.useState<string>('');
    const [emailIsValid, setEmailIsValid] = React.useState<boolean>(false);
    const [password, setPassword] = React.useState<string>('');
    const [passwordIsValid, setPasswordIsValid] = React.useState<boolean>(false);
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
                <h1 className='text-2xl font-semibold tracking-tight'>Reset your password</h1>
                <p className='text-sm text-muted-foreground'>Enter details below to reset your password</p>
            </div>

            <div className={cn('grid gap-6', className)} {...props}>
                <form onSubmit={onSubmit}>
                    <div className='grid gap-2'>
                        <EmailField value={email} onChange={setEmail} isLoading={isLoading} ref={emailRef} />
                        <PasswordField
                            value={password}
                            onChange={setPassword}
                            isLoading={isLoading}
                            withHelp={true}
                            ref={passwordRef}
                        />
                        <Label className='sr-only' htmlFor='code'>
                            Code
                        </Label>
                        <Input
                            id='code'
                            autoCapitalize='none'
                            placeholder='The code emailed to you'
                            type='text'
                            value={code}
                            onChange={(event) => setCode(event.target.value)}
                        />
                        <Button disabled={isLoading || !passwordIsValid || !emailIsValid} name='sign-in'>
                            {isLoading && <Loader className='mr-2 h-4 w-4 animate-spin' />}
                            Reset Password
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}
