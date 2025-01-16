'use client';

import { AuthenticationSignupForm } from '@/app/authentication/AuthenticationSignupForm';
import { GoogleLoginForm } from '@/app/authentication/GoogleLoginForm';
import { useRouter } from 'next/navigation';
import LoginSwitchButton from '../LoginSwitchButton';
import PrivacyLinks from '../PrivacyLinks';

export default function SignupPage() {
    const router = useRouter();

    return (
        <div className='min-h-screen relative p-4 md:p-6'>
            <LoginSwitchButton onClick={() => router.push('/authentication/login')} />
            <div className='flex items-center justify-center min-h-screen -mt-24'>
                <div className='w-full max-w-md p-6 bg-white rounded-lg shadow-lg space-y-6'>
                    <AuthenticationSignupForm />
                    <GoogleLoginForm />
                </div>
            </div>
            <PrivacyLinks />
        </div>
    );
}
