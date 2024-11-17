'use client';
import React from 'react';
import { useAppSelector } from '@/lib/store/hooks';
import { selectIsLoggedIn } from '@/lib/store/authentication/authenticationSlice';
import Image from 'next/image';
import StepDrawer from './StepDrawer';
import ProfileDropdown from './ProfileDropdown';

const Navbar: React.FC = () => {
    const isLoggedIn = useAppSelector(selectIsLoggedIn);
    // const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    if (!isLoggedIn) {
        return null;
    }

    return (
        <nav className='fixed top-0 left-0 right-0 bg-gray-800 border-b shadow-sm z-50'>
            <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex items-center justify-between h-16'>
                    <StepDrawer />
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
                    <ProfileDropdown />
                </div>
            </div>
            {/* <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} /> */}
        </nav>
    );
};

export default Navbar;
