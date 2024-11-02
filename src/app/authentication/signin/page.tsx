import { GoogleLoginForm } from '@/components/GoogleLoginForm';
import PrivacyLinks from '../PrivacyLinks';
import { UserAuthLoginForm } from '@/components/auth-login-form';
import AuthImage from '../AuthImage';

export default function SigninPage() {
    return (
        <>
            <div className='container relative h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
                <AuthImage />
                <div className='lg:p-8'>
                    <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
                        <UserAuthLoginForm />
                        <GoogleLoginForm />
                        <PrivacyLinks />
                    </div>
                </div>
            </div>
        </>
    );
}
