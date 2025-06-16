'use client';
import React from 'react';
import { useAppSelector } from '@/lib/store/hooks';
import { selectIsLoggedIn } from '@/lib/store/authentication/authenticationSlice';
import StepDrawer from './StepDrawer';
import ProfileDropdown from './profileDropdown/ProfileDropdown';
import { useRouter } from 'next/navigation';
import { CircleUserRound } from 'lucide-react';

const Navbar: React.FC = () => {
    const isLoggedIn = useAppSelector(selectIsLoggedIn);
    const router = useRouter();

    return (
        <nav className='fixed top-0 left-0 right-0 bg-black border-b shadow-sm z-50'>
            <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex items-center justify-between h-16'>
                    <div className='w-24 flex items-center'>{isLoggedIn && <StepDrawer />}</div>
                    <div className='flex-grow flex justify-center'>
                        <span className='text-white cursor-pointer select-none' onClick={() => router.push('/')}>
                            CV Builder
                        </span>
                    </div>
                    <div className='w-24 flex items-center justify-end'>
                        {isLoggedIn ? (
                            <ProfileDropdown />
                        ) : (
                            <span className='cursor-pointer'>
                                <CircleUserRound
                                    className='text-gray-400'
                                    onClick={() => router.push('/authentication/login')}
                                />
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
