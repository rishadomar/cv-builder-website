import { useAppSelector } from '@/lib/store/hooks';
import { getStep } from '@/lib/utils/step';
import StepHeader from '../StepHeader';

export const PersonalityDetailsReview: React.FC = () => {
    const allFieldValues = useAppSelector((state) => state.fieldValues);
    const step = getStep('personality-details');

    return (
        <div>
            <StepHeader icon={step.icon} title={step.title} />
            <div>{allFieldValues.personalityText}</div>
        </div>
    );
};
