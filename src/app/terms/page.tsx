'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

const TermsPage: React.FC = () => {
    const router = useRouter();

    const handleBackClick = () => {
        router.push('/authentication');
    };

    return (
        <div className='container mx-auto p-2 sm:p-4 lg:p-6'>
            <Button onClick={handleBackClick} className='mb-4'>
                Back to Signup
            </Button>
            <h1 className='text-2xl font-bold mb-4'>Terms & Conditions</h1>
            <div className='space-y-4 text-sm sm:text-base leading-relaxed'>
                <p>Terms here</p>
            </div>
        </div>
    );
};

export default TermsPage;
