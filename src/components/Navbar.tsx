'use client';
import React from 'react';
import { useAppSelector } from '@/lib/store/hooks';
import { selectIsLoggedIn } from '@/lib/store/authentication/authenticationSlice';
import StepDrawer from './StepDrawer';
import ProfileDropdown from './ProfileDropdown';
import { useRouter } from 'next/navigation';

const Navbar: React.FC = () => {
    const isLoggedIn = useAppSelector(selectIsLoggedIn);
    const router = useRouter();

    if (!isLoggedIn) {
        return null;
    }

    return (
        <nav className='fixed top-0 left-0 right-0 bg-black border-b shadow-sm z-50'>
            <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex items-center justify-between h-16'>
                    <StepDrawer />
                    <div className='flex items-center' onClick={() => router.push('/')}>
                        <span className='text-white ml-2'>CV Builder</span>
                    </div>
                    <ProfileDropdown />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
