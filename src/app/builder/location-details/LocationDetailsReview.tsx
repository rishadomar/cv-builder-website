import { useAppSelector } from '@/lib/store/hooks';
import { getStep } from '@/lib/utils/step';
import StepHeader from '../StepHeader';
import { FieldValueReview } from '../FieldValueReview';
import Link from 'next/link';

export const LocationDetailsReview: React.FC = () => {
    const allFieldValues = useAppSelector((state) => state.fieldValues);
    const step = getStep('location-details');

    return (
        <div>
            <div className='mb-3'>
                <Link href={`/builder?page=${step.path}`}>
                    <StepHeader icon={step.icon} title={step.title} />
                </Link>
            </div>
            <div className='p-1'>
                <FieldValueReview field='Country' value={allFieldValues.country} />
                <FieldValueReview field='City' value={allFieldValues.city} />
                <FieldValueReview field='Province' value={allFieldValues.province} />
                <FieldValueReview field='Prepared to relocate' value={allFieldValues.preparedToRelocate} />
            </div>
        </div>
    );
};
