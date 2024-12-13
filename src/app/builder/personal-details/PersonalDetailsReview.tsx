import { useAppSelector } from '@/lib/store/hooks';
import { getStep } from '@/lib/utils/step';
import StepHeader from '../StepHeader';

export const PersonalDetailsReview: React.FC = () => {
    const allFieldValues = useAppSelector((state) => state.fieldValues);
    const step = getStep('personal-details');

    return (
        <div>
            <StepHeader icon={step.icon} title={step.title} />
            <div>Preferred pronoun: {allFieldValues.preferredPronoun}</div>
        </div>
    );
};
