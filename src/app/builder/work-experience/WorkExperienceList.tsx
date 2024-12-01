import { StepButtons } from '../StepButtons';
import AddWorkExperienceDialog from './AddWorkExperienceDialog';
import { useState } from 'react';
import { useAppSelector } from '@/lib/store/hooks';
import { getStep } from '@/lib/utils/step';
import StepHeader from '../StepHeader';
import { LucideIcon } from 'lucide-react';
import { OverlaySpinner } from '@/components/OverlaySpinner';
import { WorkExperienceItem } from './WorkExperienceItem';

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
        <div className='h-[calc(100vh-theme(spacing.16)-theme(spacing.20))] overflow-y-auto'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6'>
                {busyUpdatingList && <OverlaySpinner />}
                <StepHeader icon={step?.icon as LucideIcon} title={step?.title ?? ''} />
                {workExperienceEntries &&
                    workExperienceEntries.map((workExperienceEntry, index) => (
                        <WorkExperienceItem
                            key={index}
                            workExperienceEntry={workExperienceEntry}
                            setBusyUpdatingList={setBusyUpdatingList}
                        />
                    ))}
                <div>
                    <AddWorkExperienceDialog setBusyUpdating={(v) => setBusyUpdatingList(v)} />
                    <form onSubmit={onSubmit} className='flex flex-col'>
                        <StepButtons onNext={onNext} onPrevious={onPrevious} />
                    </form>
                </div>
            </div>
        </div>
    );
}
