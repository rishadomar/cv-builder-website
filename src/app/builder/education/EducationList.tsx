import { StepButtons } from '../StepButtons';
import AddEducationDialog from './AddEducationDialog';
import { useState } from 'react';
import { useAppSelector } from '@/lib/store/hooks';
import { getStep } from '@/lib/utils/step';
import StepHeader from '../StepHeader';
import { LucideIcon } from 'lucide-react';
import { OverlaySpinner } from '@/components/OverlaySpinner';
import { EducationItem } from './EducationItem';

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
        <>
            <div className='h-[calc(100vh-theme(spacing.16)-theme(spacing.20))] overflow-y-auto'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6'>
                    {busyUpdatingList && <OverlaySpinner />}
                    <StepHeader icon={step?.icon as LucideIcon} title={step?.title ?? ''} />
                    {educationEntries &&
                        educationEntries.map((educationEntry, index) => (
                            <EducationItem
                                key={index}
                                educationEntry={educationEntry}
                                setBusyUpdatingList={setBusyUpdatingList}
                            />
                        ))}
                    <div>
                        <AddEducationDialog setBusyUpdating={(v) => setBusyUpdatingList(v)} />
                        <form onSubmit={onSubmit} className='flex flex-col'>
                            <StepButtons onNext={onNext} onPrevious={onPrevious} />
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
