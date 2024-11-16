'use client';
import React, { useState } from 'react';
import { useAppSelector } from '@/lib/store/hooks';
import { selectIsLoggedIn } from '@/lib/store/authentication/authenticationSlice';
import Image from 'next/image';
import LogoutButton from '../app/authentication/LogoutButton';
import { Icons } from './icons';
import Drawer from './Drawer';

const Navbar: React.FC = () => {
    const isLoggedIn = useAppSelector(selectIsLoggedIn);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    if (!isLoggedIn) {
        return null;
    }

    return (
        <nav className='fixed top-0 left-0 right-0 bg-white border-b shadow-sm z-50'>
            <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex items-center justify-between h-16'>
                    <Icons.bars4
                        className='h-5 w-5 text-gray-400 mr-3'
                        aria-hidden='true'
                        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                    />
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
            </div>
            <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
        </nav>
    );
};

export default Navbar;
