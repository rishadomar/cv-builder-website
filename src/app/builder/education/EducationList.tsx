import { StepButtons } from '../StepButtons';
import AddEducationDialog from './AddEducationDialog';
import { useState } from 'react';
import { useAppSelector } from '@/lib/store/hooks';
import { EducationEntry } from '@/lib/type';
import EducationEntryActionsDropdown from './EducationEntryActionsDropdown';
import { getStep } from '@/lib/utils/step';
import StepHeader from '../StepHeader';
import { LucideIcon } from 'lucide-react';
import { OverlaySpinner } from '@/components/OverlaySpinner';

type EducationItemProps = {
    educationEntry: EducationEntry;
    setBusyUpdatingList: (v: boolean) => void;
};

function EducationItem({ educationEntry, setBusyUpdatingList }: EducationItemProps) {
    return (
        <div className='grid grid-cols-[1fr_auto] gap-4 text-sm relative'>
            <div className='grid gap-1'>
                <div className='aspect-square w-3 bg-gray-900 rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-1 dark:bg-gray-50' />
                <div className='text-lg font-bold'>{educationEntry.institution}</div>
                <div className='text-gray-500 dark:text-gray-400'>{educationEntry.location}</div>
                {educationEntry.graduationDate && (
                    <div className='text-gray-500 dark:text-gray-400'>
                        {educationEntry.graduationDate.month} {educationEntry.graduationDate.year}
                    </div>
                )}
                <div className='text-gray-500 dark:text-gray-400'>{educationEntry.description}</div>
                <div className='text-gray-500 dark:text-gray-400'>{educationEntry.comment}</div>
            </div>
            <div className=''>
                <EducationEntryActionsDropdown
                    educationEntry={educationEntry}
                    setBusyUpdatingList={setBusyUpdatingList}
                />
            </div>
        </div>
    );
}

type EducationListProps = {
    onNext: () => void;
    onPrevious: () => void;
};

export default function EducationList({ onNext, onPrevious }: EducationListProps) {
    const educationEntries = useAppSelector((state) => state.fieldValues.educationEntries);
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
