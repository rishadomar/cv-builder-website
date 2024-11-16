'use client';

import { GoogleLoginForm } from '@/components/GoogleLoginForm';
import { UserAuthLoginForm } from '@/components/auth-login-form';
import { useState } from 'react';
import { ForgotPasswordForm } from '@/components/ForgotPasswordForm';
import { useAppSelector } from '@/lib/store/hooks';
import { selectIsLoggedIn } from '@/lib/store/authentication/authenticationSlice';

export default function SigninPage() {
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const isLoggedIn = useAppSelector(selectIsLoggedIn);

    if (isLoggedIn) {
        return (
            <div className='container relative h-full flex-col items-center justify-center'>
                <div className='lg:p-8'>
                    <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
                        <p>You are already logged in</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='container relative h-full flex-col items-center justify-center'>
            <div className='lg:p-8'>
                <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
                    {showForgotPassword ? (
                        <ForgotPasswordForm />
                    ) : (
                        <>
                            <UserAuthLoginForm onForgotPassword={() => setShowForgotPassword(true)} />
                            <GoogleLoginForm />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
