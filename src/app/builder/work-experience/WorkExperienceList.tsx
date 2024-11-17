import { StepButtons } from '../StepButtons';
import AddWorkExperienceDialog from './AddWorkExperienceDialog';
import EditWorkExperienceDialog from './EditWorkExperienceDialog';
import DeleteWorkExperienceDialog from './DeleteWorkExperienceDialog';
import { useState } from 'react';
import { useAppSelector } from '@/lib/store/hooks';
import OverlaySpinner from '@/components/core/OverlaySpinner';
import { WorkExperienceEntry } from '@/lib/type';

type WorkExperienceItemProps = {
    workExperienceEntry: WorkExperienceEntry;
    setBusyUpdatingList: (v: boolean) => void;
};

function WorkExperienceItem({ workExperienceEntry, setBusyUpdatingList }: WorkExperienceItemProps) {
    return (
        <div className='grid grid-cols-[1fr_auto] gap-4 text-sm relative'>
            <div className='grid gap-1'>
                <div className='aspect-square w-3 bg-gray-900 rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-1 dark:bg-gray-50' />
                <div className='text-lg font-bold'>{workExperienceEntry.company}</div>
                <div className='text-gray-500 dark:text-gray-400'>{workExperienceEntry.location}</div>
                {workExperienceEntry.startDate && (
                    <div className='text-gray-500 dark:text-gray-400'>
                        {workExperienceEntry.startDate.month} {workExperienceEntry.startDate.year} -{' '}
                        {workExperienceEntry.endDate
                            ? `${workExperienceEntry.endDate.month} ${workExperienceEntry.endDate.year}`
                            : 'Present'}
                    </div>
                )}
                <div className='text-gray-500 dark:text-gray-400'>{workExperienceEntry.role}</div>
                <div className='text-gray-500 dark:text-gray-400'>{workExperienceEntry.description}</div>
            </div>
            <div className='flex flex-col items-end space-y-2 mt-4'>
                <EditWorkExperienceDialog
                    workExperienceEntryToEdit={workExperienceEntry}
                    setBusyUpdating={(v) => setBusyUpdatingList(v)}
                />
                <DeleteWorkExperienceDialog
                    workExperienceEntryToDelete={workExperienceEntry}
                    setBusyDeleting={(v) => setBusyUpdatingList(v)}
                />
            </div>
        </div>
    );
}
type WorkExperienceListProps = {
    onNext: () => void;
    onPrevious: () => void;
};

export default function WorkExperienceList({ onNext, onPrevious }: WorkExperienceListProps) {
    const workExperienceEntries = useAppSelector((state) => state.fieldValues.workExperiences);
    const [busyUpdatingList, setBusyUpdatingList] = useState(false);

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
        </>
    );
}
