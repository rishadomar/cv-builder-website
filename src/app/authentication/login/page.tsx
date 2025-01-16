'use client';

import { useRouter } from 'next/navigation';
import SignupSwitchButton from '../SignupSwitchButton';
import { AuthenticationLoginForm } from '../AuthenticationLoginForm';

export default function LoginPage() {
    const router = useRouter();

    return (
        <div className='min-h-screen relative p-4 md:p-6'>
            <SignupSwitchButton onClick={() => router.push('/authentication/signup')} />
            <div className='flex items-center justify-center min-h-screen -mt-24'>
                <div className='w-full max-w-md p-6 bg-white rounded-lg shadow-lg space-y-6'>
                    <AuthenticationLoginForm
                        onForgotPassword={() => router.push('/authentication/forgot-password')}
                        onConfirmForgotPassword={() => router.push('/authentication/confirm-password-reset')}
                    />
                </div>
            </div>{' '}
        </div>
    );
}
