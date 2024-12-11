'use client';

import { useAppSelector } from '@/lib/store/hooks';

export const ContactDetailsReview: React.FC = () => {
    const allFieldValues = useAppSelector((state) => state.fieldValues);
    // const step = getStep('contact-details');

    return (
        <div>
            <span>Name: {allFieldValues.name}</span>
        </div>
    );
};
