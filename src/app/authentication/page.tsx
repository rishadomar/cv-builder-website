import { UserAuthForm } from '@/components/auth-form';
import LoginLogout from './LoginLogout';
import { GoogleLoginForm } from '@/components/GoogleLoginForm';
import PrivacyLinks from './PrivacyLinks';
import AuthImage from './AuthImage';

export default function AuthenticationPage() {
    return (
        <>
            <div className='container relative h-[800px] flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
                <LoginLogout />
                <AuthImage />
                <div className='lg:p-8'>
                    <div className='mx-auto flex w-full max-w-md flex-col justify-center space-y-6 p-4 sm:w-[350px]'>
                        <UserAuthForm />
                        <GoogleLoginForm />
                        <PrivacyLinks />
                    </div>
                </div>
            </div>
        </>
    );
}
