import React from 'react';
import TermsAndConditions from './TermsAndConditions';
import { BackButton } from '@/components/BackButton';

const TermsPage: React.FC = () => {
    return (
        <div className='container mx-auth px-4 py-20 overflow-y-auto'>
            <TermsAndConditions />
            <BackButton />
        </div>
    );
};

export default TermsPage;
