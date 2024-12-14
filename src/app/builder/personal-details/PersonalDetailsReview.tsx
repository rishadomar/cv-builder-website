import { useAppSelector } from '@/lib/store/hooks';
import { getStep } from '@/lib/utils/step';
import StepHeader from '../StepHeader';
import { FieldValueReview } from '../FieldValueReview';

export const PersonalDetailsReview: React.FC = () => {
    const allFieldValues = useAppSelector((state) => state.fieldValues);
    const step = getStep('personal-details');

    return (
        <div>
            <div className='mb-3'>
                <StepHeader icon={step.icon} title={step.title} />
            </div>
            <div className='p-1'>
                <FieldValueReview field='Preferred pronoun' value={allFieldValues.preferredPronoun} />
            </div>
        </div>
    );
};
