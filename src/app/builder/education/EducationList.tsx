import { StepButtons } from '../StepButtons';
import AddEducationDialog from './AddEducationDialog';
import { useState } from 'react';
import { useAppSelector } from '@/lib/store/hooks';
import { getStep } from '@/lib/utils/step';
import { OverlaySpinner } from '@/components/OverlaySpinner';
import { EducationItem } from './EducationItem';
import { StepContainer } from '../StepContainer';

type EducationListProps = {
    onNext: () => void;
    onPrevious: () => void;
};

export default function EducationList({ onNext, onPrevious }: EducationListProps) {
    const educationEntries = useAppSelector((state) => state.fieldValues.educationEntries);
    const [busyUpdatingList, setBusyUpdatingList] = useState(false);
    const step = getStep('education');

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
            {educationEntries &&
                educationEntries.map((educationEntry, index) => (
                    <EducationItem
                        key={index}
                        educationEntry={educationEntry}
                        busyUpdatingList={busyUpdatingList}
                        setBusyUpdatingList={setBusyUpdatingList}
                        editable={true}
                        collapseComment={true}
                    />
                ))}
            <div className='flex justify-center my-4'>
                <AddEducationDialog busyUpdating={busyUpdatingList} setBusyUpdating={setBusyUpdatingList} />
            </div>
            <form onSubmit={onSubmit} className='flex flex-col'>
                <StepButtons onNext={onNext} onPrevious={onPrevious} />
            </form>
        </StepContainer>
    );
}
