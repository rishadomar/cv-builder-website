'use client';

import { useAppSelector } from '@/lib/store/hooks';
import { getStep } from '@/lib/utils/step';
import StepHeader from '../StepHeader';
import { FieldValueReview } from '../FieldValueReview';
import Link from 'next/link';

export const ContactDetailsReview: React.FC = () => {
    const allFieldValues = useAppSelector((state) => state.fieldValues);
    const step = getStep('contact-details');

    return (
        <div>
            <div className='mb-3'>
                <Link href={`/builder?page=${step.path}`}>
                    <StepHeader icon={step.icon} title={step.title} />
                </Link>
            </div>
            <div className='p-1'>
                <FieldValueReview field='Name' value={allFieldValues.name} />
                <FieldValueReview field='Contact number' value={allFieldValues.phoneNumber} />
            </div>
        </div>
    );
};
