import { useAppSelector } from '@/lib/store/hooks';
import { getStep } from '@/lib/utils/step';
import StepHeader from '../StepHeader';

export const RemoteWorkDetailsReview: React.FC = () => {
    const allFieldValues = useAppSelector((state) => state.fieldValues);
    const step = getStep('remote-work-details');

    return (
        <div>
            <StepHeader icon={step.icon} title={step.title} />
            <div>Prepared to work remotely: {allFieldValues.remoteWork}</div>
            <div>Partially remote: {allFieldValues.partiallyRemote}</div>
            <div>Prefer remote: {allFieldValues.preferRemote}</div>
        </div>
    );
};
