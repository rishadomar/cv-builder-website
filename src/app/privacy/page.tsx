import React from 'react';
import PrivacyStatement from './Privacy';
import { BackButton } from '@/components/BackButton';

const PrivacyPage: React.FC = () => {
    return (
        <div className='container mx-auth px-4 py-20 overflow-y-auto'>
            <PrivacyStatement />
            <BackButton />
        </div>
    );
};

export default PrivacyPage;
