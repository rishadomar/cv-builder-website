'use client';
import React, { useState } from 'react';
import { useAppSelector } from '@/lib/store/hooks';
import { selectIsLoggedIn } from '@/lib/store/authentication/authenticationSlice';

const items = [
    { id: 1, text: 'Complete Profile' },
    { id: 2, text: 'Upload Resume' },
    { id: 3, text: 'Add Work Experience' },
    { id: 4, text: 'Add Education' },
    { id: 5, text: 'Submit Application' }
];

const Sidebar: React.FC = () => {
    const isLoggedIn = useAppSelector(selectIsLoggedIn);
    const [completedItems] = useState<number[]>([1, 3]); // Example of completed items

    if (!isLoggedIn) {
        return null;
    }

    return (
        <nav className='bg-gray-600 p-4'>
            <div className='container mx-auto flex flex-col justify-between items-center'>
                <ul className='list-none w-full'>
                    {items.map((item) => (
                        <li
                            key={item.id}
                            className={`p-2 mb-2 border rounded ${
                                completedItems.includes(item.id) ? 'bg-green-200' : 'bg-gray-200'
                            }`}
                        >
                            <div className='flex justify-between items-center'>
                                <span>{item.text}</span>
                                {completedItems.includes(item.id) && <span className='text-green-600'>Done</span>}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Sidebar;
