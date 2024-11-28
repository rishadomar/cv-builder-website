'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import PrivacyStatement from './Privacy';

const PrivacyPage: React.FC = () => {
    const router = useRouter();

    const handleBackClick = () => {
        router.push('/authentication');
    };

    return (
        <div className='container mx-auth px-4 py-20 overflow-y-auto'>
            <PrivacyStatement />
            <Button onClick={handleBackClick} className='m-4'>
                Back
            </Button>
        </div>
    );
};

export default PrivacyPage;
