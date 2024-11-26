'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import TermsAndConditions from './TermsAndConditions';

const TermsPage: React.FC = () => {
    const router = useRouter();

    const handleBackClick = () => {
        router.back();
    };

    return (
        <div className='container mx-auto py-4 px-4 sm:p-4 lg:p-6'>
            <TermsAndConditions />
            <Button onClick={handleBackClick} className='mb-4'>
                Back
            </Button>
        </div>
    );
};

export default TermsPage;
