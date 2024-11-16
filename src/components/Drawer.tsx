// src/components/Drawer.tsx
import React from 'react';
import { Icons } from './icons';
import ProgressSteps from './ProgressSteps';

type DrawerProps = {
    isOpen: boolean;
    onClose: () => void;
};

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose }) => {
    return (
        <>
            {isOpen && <div className='fixed inset-0 bg-black bg-opacity-50 z-40' onClick={onClose} />}
            <div
                className={`fixed top-0 left-0 h-full w-72 sm:w-80 md:w-96 bg-gray-800 text-white transform ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                } transition-transform duration-300 ease-in-out z-50  overflow-y-auto`}
            >
                <div className='p-4 flex justify-between items-center'>
                    <span className='text-lg font-bold'>Progress</span>
                    <Icons.x className='h-6 w-6 cursor-pointer' onClick={onClose} />
                </div>
                <div className='p-4'>
                    <ProgressSteps onClose={() => onClose()} />
                </div>
            </div>
        </>
    );
};

export default Drawer;
