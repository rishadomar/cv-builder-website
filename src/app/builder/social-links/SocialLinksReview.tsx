import { useAppSelector } from '@/lib/store/hooks';
import { getStep } from '@/lib/utils/step';
import StepHeader from '../StepHeader';
import { FieldValueReview } from '../FieldValueReview';
import Link from 'next/link';

export const SocialLinksReview: React.FC = () => {
    const allFieldValues = useAppSelector((state) => state.fieldValues);
    const step = getStep('social-links');

    return (
        <div>
            <div className='mb-3'>
                <Link href={`/builder?page=${step.path}`}>
                    <StepHeader icon={step.icon} title={step.title} />
                </Link>
            </div>
            <div className='p-1'>
                {allFieldValues.socialLinks?.linkedIn && (
                    <FieldValueReview field='LinkedIn' value={allFieldValues.socialLinks?.linkedIn} />
                )}
                {allFieldValues.socialLinks?.github && (
                    <FieldValueReview field='github' value={allFieldValues.socialLinks?.github} />
                )}
                {allFieldValues.socialLinks?.twitter && (
                    <FieldValueReview field='Twitter' value={allFieldValues.socialLinks?.twitter} />
                )}
                {allFieldValues.socialLinks?.portfolio && (
                    <FieldValueReview field='Portfolio' value={allFieldValues.socialLinks?.portfolio} />
                )}
            </div>
        </div>
    );
};
