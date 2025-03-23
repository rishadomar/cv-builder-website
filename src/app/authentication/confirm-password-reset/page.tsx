'use client';

import { useRouter } from 'next/navigation';
import { ConfirmForgotPasswordForm } from '../ConfirmForgotPasswordForm';

export default function ConfirmPasswordResetPage() {
    const router = useRouter();

    return (
        <div className='min-h-screen relative p-4 md:p-6'>
            <div className='flex items-center justify-center min-h-screen -mt-24'>
                <div className='w-full max-w-md p-6 bg-white rounded-lg shadow-lg space-y-6'>
                    <ConfirmForgotPasswordForm onSuccess={() => router.push('/authentication/login')} />
                </div>
            </div>
        </div>
    );
}
