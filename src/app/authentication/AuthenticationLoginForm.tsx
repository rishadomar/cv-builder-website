'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppDispatch } from '@/lib/store/hooks';
import { useRouter } from 'next/navigation';
import * as services from '@/lib/services';
import PasswordField from '@/app/builder/PasswordField';
import { CustomError } from '@/lib/utils/customError';
import LinkButton from '@/components/core/LinkButton';
import { Loader } from 'lucide-react';
import { toast } from 'react-toastify';

interface AuthenticationLoginFormProps extends React.HTMLAttributes<HTMLDivElement> {
    onForgotPassword: () => void;
}

export function AuthenticationLoginForm({ onForgotPassword, className, ...props }: AuthenticationLoginFormProps) {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const emailRef = React.useRef<HTMLInputElement>(null);
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const router = useRouter();

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
                        <PasswordField onChange={setPassword} value={password} withHelp={false} isLoading={false} />
                        <Button
                            disabled={isLoading || email.trim().length === 0 || password.trim().length === 0}
                            name='sign-in'
                        >
                            {isLoading && <Loader className='mr-2 h-4 w-4 animate-spin' />}
                            Login
                        </Button>
                        <LinkButton onClick={onForgotPassword} label='Forgot Password?' />
                    </div>
                </form>
            </div>
        </>
    );
}
