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
import { ConfirmForgotPasswordForm } from './ConfirmForgotPasswordForm';

export default function AuthenticationPage() {
    const isLoggedIn = useAppSelector(selectIsLoggedIn);
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [showSignupForm, setShowSignupForm] = useState(true);
    const [showConfirmPasswordResetForm, setShowConfirmPasswordResetForm] = useState(false);
    const router = useRouter();

    const renderAlreadyLoggedInSection = () => {
        return (
            <div className='flex items-center justify-center min-h-screen -mt-24'>
                <div className='w-full max-w-md p-6 bg-white rounded-lg shadow-lg space-y-6'>
                    <div className='text-center'>You have successfully logged in</div>
                    <div className='flex justify-center'>
                        <Button
                            onClick={() => {
                                router.replace('/builder');
                            }}
                        >
                            Continue
                        </Button>
                    </div>
                </div>
            </div>
        );
    };

    const renderConfirmPasswordResetForm = () => {
        return (
            <>
                <LoginSwitchButton
                    onClick={() => {
                        setShowLoginForm(true);
                        setShowConfirmPasswordResetForm(false);
                    }}
                />

                <div className='flex items-center justify-center min-h-screen -mt-24'>
                    <div className='w-full max-w-md p-6 bg-white rounded-lg shadow-lg space-y-6'>
                        <ConfirmForgotPasswordForm
                            onSuccess={() => {
                                setShowConfirmPasswordResetForm(false);
                                setShowLoginForm(true);
                            }}
                        />
                    </div>
                </div>
            </>
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
                    <div className='flex items-center justify-center min-h-screen -mt-24'>
                        <div className='w-full max-w-md p-6 bg-white rounded-lg shadow-lg space-y-6'>
                            <AuthenticationSignupForm />
                            <GoogleLoginForm />
                        </div>
                    </div>
                    <PrivacyLinks />
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

                    <div className='flex items-center justify-center min-h-screen -mt-24'>
                        <div className='w-full max-w-md p-6 bg-white rounded-lg shadow-lg space-y-6'>
                            <AuthenticationLoginForm
                                onForgotPassword={() => {
                                    setShowForgotPassword(true);
                                    setShowLoginForm(false);
                                }}
                                onConfirmForgotPassword={() => {
                                    setShowForgotPassword(false);
                                    setShowConfirmPasswordResetForm(true);
                                }}
                            />
                        </div>
                    </div>
                </>
            );
        }

        if (showForgotPassword) {
            return (
                <>
                    <LoginSwitchButton
                        onClick={() => {
                            setShowForgotPassword(false);
                            setShowLoginForm(true);
                        }}
                    />
                    <div className='flex items-center justify-center min-h-screen -mt-24'>
                        <div className='w-full max-w-md p-6 bg-white rounded-lg shadow-lg'>
                            <ForgotPasswordForm
                                onSuccess={() => {
                                    setShowForgotPassword(false);
                                    setShowConfirmPasswordResetForm(true);
                                }}
                            />
                        </div>
                    </div>
                </>
            );
        }
    };

    return (
        <div className='min-h-screen relative p-4 md:p-6'>
            {showConfirmPasswordResetForm
                ? renderConfirmPasswordResetForm()
                : isLoggedIn
                ? renderAlreadyLoggedInSection()
                : renderLoginSignupSection()}
        </div>
    );
}
