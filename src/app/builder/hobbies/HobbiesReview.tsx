import { useAppSelector } from '@/lib/store/hooks';
import { getStep } from '@/lib/utils/step';
import StepHeader from '../StepHeader';

export const HobbiesReview: React.FC = () => {
    const allFieldValues = useAppSelector((state) => state.fieldValues);
    const step = getStep('hobbies');

    return (
        <div>
            <StepHeader icon={step.icon} title={step.title} />
            <div>{allFieldValues.hobbiesText}</div>
        </div>
    );
};
