import { useAppSelector } from '@/lib/store/hooks';
import { getStep } from '@/lib/utils/step';
import StepHeader from '../StepHeader';

export const LocationDetailsReview: React.FC = () => {
    const allFieldValues = useAppSelector((state) => state.fieldValues);
    const step = getStep('location-details');

    return (
        <div>
            <StepHeader icon={step.icon} title={step.title} />
            <div>Country: {allFieldValues.country}</div>
            <div>City: {allFieldValues.city}</div>
            <div>Province: {allFieldValues.province}</div>
            <div>Prepared to relocate: {allFieldValues.preparedToRelocate}</div>
        </div>
    );
};
