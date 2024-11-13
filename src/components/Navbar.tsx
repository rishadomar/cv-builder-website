'use client';
import React from 'react';
import { useAppSelector } from '@/lib/store/hooks';
import { selectIsLoggedIn } from '@/lib/store/authentication/authenticationSlice';
import Image from 'next/image';
import LogoutButton from './LogoutButton';

const Navbar: React.FC = () => {
    const isLoggedIn = useAppSelector(selectIsLoggedIn);
    if (!isLoggedIn) {
        return null;
    }

    return (
        <nav className='bg-gray-800 p-4'>
            <div className='container mx-auto flex justify-between items-center'>
                <div className='flex items-center'>
                    <Image
                        //className='dark:invert'
                        src='https://cvbuilder.co.za/images/logo-pencil.jpeg'
                        alt='CV Builder logo'
                        width={20}
                        height={20}
                        priority
                    />
                    <span className='text-white ml-2'>CV Builder</span>
                </div>
                <LogoutButton />
            </div>
        </nav>
    );
};

export default Navbar;
