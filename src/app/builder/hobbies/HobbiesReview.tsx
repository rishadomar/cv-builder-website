import { useAppSelector } from '@/lib/store/hooks';
import { getStep } from '@/lib/utils/step';
import StepHeader from '../StepHeader';
import { FieldValueReview } from '../FieldValueReview';

export const HobbiesReview: React.FC = () => {
    const allFieldValues = useAppSelector((state) => state.fieldValues);
    const step = getStep('hobbies');

    return (
        <>
            <div className='mb-3'>
                <StepHeader icon={step.icon} title={step.title} />
            </div>
            <div className='p-1'>
                <FieldValueReview value={allFieldValues.hobbiesText} />
            </div>
        </>
    );
};
