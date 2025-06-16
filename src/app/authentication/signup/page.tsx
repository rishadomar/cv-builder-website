import { AuthenticationSignupForm } from '@/app/authentication/AuthenticationSignupForm';
import { GoogleLoginForm } from '@/app/authentication/GoogleLoginForm';
import PrivacyLinks from '../PrivacyLinks';

export default function SignupPage() {
    return (
        <div className='min-h-screen relative p-4 md:p-6'>
            <div className='flex items-center justify-center min-h-screen -mt-4'>
                <div className='w-full max-w-md p-6 bg-white rounded-lg shadow-lg space-y-6'>
                    <AuthenticationSignupForm />
                    <GoogleLoginForm />
                </div>
            </div>
            <PrivacyLinks />
        </div>
    );
}
