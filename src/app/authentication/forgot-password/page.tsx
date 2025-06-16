'use client';

import { useRouter } from 'next/navigation';
import { ForgotPasswordForm } from '../ForgotPasswordForm';

export default function ForgotPasswordPage() {
    const router = useRouter();

    return (
        <div className='min-h-screen relative p-4 md:p-6'>
            <div className='flex items-center justify-center min-h-screen -mt-4'>
                <div className='w-full max-w-md p-6 bg-white rounded-lg shadow-lg'>
                    <ForgotPasswordForm
                        onSuccess={() => {
                            router.push('/authentication/confirm-password-reset');
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
