import { useAppSelector } from '@/lib/store/hooks';
import { getStep } from '@/lib/utils/step';
import StepHeader from '../StepHeader';
import Link from 'next/link';

export const SocialLinksReview: React.FC = () => {
    const allFieldValues = useAppSelector((state) => state.fieldValues);
    const step = getStep('social-links');

    const renderFieldValue = (field: string, value: string) => (
        <div>
            <div className='col-span-2 text-sm font-medium text-gray-500'>{field}:</div>
            <div className='text-sm whitespace-pre-wrap'>{value}</div>
        </div>
    );

    return (
        <div>
            <div className='mb-3'>
                <Link href={`/builder?page=${step.path}`}>
                    <StepHeader icon={step.icon} title={step.title} />
                </Link>
            </div>
            <div className='flex flex-col gap-2'>
                {allFieldValues.socialLinks?.linkedIn &&
                    renderFieldValue('LinkedIn', allFieldValues.socialLinks?.linkedIn)}
                {allFieldValues.socialLinks?.github && renderFieldValue('Github', allFieldValues.socialLinks?.github)}

                {allFieldValues.socialLinks?.twitter &&
                    renderFieldValue('Twitter', allFieldValues.socialLinks?.twitter)}

                {allFieldValues.socialLinks?.portfolio &&
                    renderFieldValue('Portfolio', allFieldValues.socialLinks?.portfolio)}
            </div>
        </div>
    );
};
