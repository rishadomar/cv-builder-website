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
            <div className='p-6 sm:p-10'>
                <div className='after:absolute after:inset-y-0 after:w-px after:bg-gray-500/20 relative pl-6 after:left-0 grid gap-10 dark:after:bg-gray-400/20'>
                    {busyUpdatingList && <OverlaySpinner />}
                    {workExperienceEntries &&
                        workExperienceEntries.map((workExperienceEntry, index) => (
                            <WorkExperienceItem
                                key={index}
                                workExperienceEntry={workExperienceEntry}
                                setBusyUpdatingList={setBusyUpdatingList}
                            />
                        ))}
                </div>
            </div>

            <div className='mt-4'>
                <AddWorkExperienceDialog setBusyUpdating={(v) => setBusyUpdatingList(v)} />
                <form onSubmit={onSubmit} className='flex flex-col'>
                    <StepButtons onNext={onNext} onPrevious={onPrevious} />
                </form>
            </div>
        </>
    );
}
