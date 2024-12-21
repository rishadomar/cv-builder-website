import { useAppSelector } from '@/lib/store/hooks';
import { getStep } from '@/lib/utils/step';
import StepHeader from '../StepHeader';
import { FieldValueReview } from '../FieldValueReview';
import Link from 'next/link';

export const PersonalityDetailsReview: React.FC = () => {
    const allFieldValues = useAppSelector((state) => state.fieldValues);
    const step = getStep('personality-details');

    return (
        <div>
            <div className='mb-3'>
                <Link href={`/builder?page=${step.path}`}>
                    <StepHeader icon={step.icon} title={step.title} />
                </Link>
            </div>
            <div className='p-1'>
                <FieldValueReview value={allFieldValues.personalityText} />
            </div>
        </div>
    );
};
