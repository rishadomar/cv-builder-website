import { useAppSelector } from '@/lib/store/hooks';
import { getStep } from '@/lib/utils/step';
import StepHeader from '../StepHeader';
import { FieldValueReview } from '../FieldValueReview';

export const RemoteWorkDetailsReview: React.FC = () => {
    const allFieldValues = useAppSelector((state) => state.fieldValues);
    const step = getStep('remote-work-details');

    return (
        <div>
            <div className='mb-3'>
                <StepHeader icon={step.icon} title={step.title} />
            </div>
            <div className='p-1'>
                <FieldValueReview field='Prepared to work remotely' value={allFieldValues.remoteWork} />
                <FieldValueReview field='Partially remote' value={allFieldValues.partiallyRemote} />
                <FieldValueReview field='Prefer remote' value={allFieldValues.preferRemote} />
            </div>
        </div>
    );
};
