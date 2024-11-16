'use client';
import { AuthenticationSignupForm } from '@/app/authentication/AuthenticationSignupForm';
import { GoogleLoginForm } from '@/app/authentication/GoogleLoginForm';
import PrivacyLinks from './PrivacyLinks';
import { useAppSelector } from '@/lib/store/hooks';
import { selectIsLoggedIn } from '@/lib/store/authentication/authenticationSlice';
import { useState } from 'react';
import LoginSwitchButton from './LoginSwitchButton';
import { AuthenticationLoginForm } from '@/app/authentication/AuthenticationLoginForm';
import SignupSwitchButton from './SignupSwitchButton';
import { ForgotPasswordForm } from '@/app/authentication/ForgotPasswordForm';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function AuthenticationPage() {
    const isLoggedIn = useAppSelector(selectIsLoggedIn);
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [showSignupForm, setShowSignupForm] = useState(true);
    const router = useRouter();

    const renderAlreadyLoggedInSection = () => {
        return (
            <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
                <p>You are already logged in</p>
                <Button
                    onClick={() => {
                        router.replace('/builder');
                    }}
                >
                    Continue
                </Button>
            </div>
        );
    };

    const renderLoginSignupSection = () => {
        if (showSignupForm) {
            return (
                <>
                    <LoginSwitchButton
                        onClick={() => {
                            setShowLoginForm(true);
                            setShowSignupForm(false);
                        }}
                    />
                    <div className='mt-10 lg:p-8'>
                        <div className='mx-auto flex w-full max-w-md flex-col justify-center space-y-6 p-4 sm:w-[350px]'>
                            <AuthenticationSignupForm />
                            <GoogleLoginForm />
                            <PrivacyLinks />
                        </div>
                    </div>
                </>
            );
        }

        if (showLoginForm) {
            return (
                <>
                    <SignupSwitchButton
                        onClick={() => {
                            setShowLoginForm(false);
                            setShowSignupForm(true);
                        }}
                    />

                    <AuthenticationLoginForm
                        onForgotPassword={() => {
                            setShowForgotPassword(true);
                            setShowLoginForm(false);
                        }}
                    />
                </>
            );
        }

        if (showForgotPassword) {
            return (
                <>
                    <ForgotPasswordForm
                        onLogin={() => {
                            setShowForgotPassword(false);
                            setShowLoginForm(true);
                        }}
                    />
                </>
            );
        }
    };

    return (
        <div className='container relative h-full'>
            <div className='lg:p-8'>{isLoggedIn ? renderAlreadyLoggedInSection() : renderLoginSignupSection()}</div>
        </div>
    );
}
