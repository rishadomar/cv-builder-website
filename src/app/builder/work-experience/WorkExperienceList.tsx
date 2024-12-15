import { StepButtons } from '../StepButtons';
import AddWorkExperienceDialog from './AddWorkExperienceDialog';
import { useState } from 'react';
import { useAppSelector } from '@/lib/store/hooks';
import { getStep } from '@/lib/utils/step';
import { OverlaySpinner } from '@/components/OverlaySpinner';
import { WorkExperienceItem } from './WorkExperienceItem';
import { StepContainer } from '../StepContainer';

type WorkExperienceListProps = {
    onNext: () => void;
    onPrevious: () => void;
};

export default function WorkExperienceList({ onNext, onPrevious }: WorkExperienceListProps) {
    const workExperienceEntries = useAppSelector((state) => state.fieldValues.workExperiences);
    const [busyUpdatingList, setBusyUpdatingList] = useState(false);
    const step = getStep('work-experience');

    function onSubmit(event?: React.BaseSyntheticEvent) {
        const submitter = (event?.nativeEvent as SubmitEvent).submitter;
        const submitterName =
            submitter instanceof HTMLButtonElement || submitter instanceof HTMLInputElement
                ? submitter.name
                : undefined;

        if (onNext && submitterName === 'next') {
            onNext();
        } else if (onPrevious && submitterName === 'previous') {
            onPrevious();
        }

        event?.preventDefault();
    }

    return (
        <StepContainer step={step}>
            {busyUpdatingList && <OverlaySpinner />}
            {workExperienceEntries &&
                workExperienceEntries.map((workExperienceEntry, index) => (
                    <WorkExperienceItem
                        key={index}
                        workExperienceEntry={workExperienceEntry}
                        busyUpdatingList={busyUpdatingList}
                        setBusyUpdatingList={setBusyUpdatingList}
                        collapseDescription={true}
                        editable={true}
                    />
                ))}
            <div>
                <AddWorkExperienceDialog
                    busyUpdating={busyUpdatingList}
                    setBusyUpdating={(v) => setBusyUpdatingList(v)}
                />
                <form onSubmit={onSubmit} className='flex flex-col'>
                    <StepButtons onNext={onNext} onPrevious={onPrevious} />
                </form>
            </div>
        </StepContainer>
    );
}
