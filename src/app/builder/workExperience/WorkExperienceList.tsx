import { StepButtons } from '../StepButtons';
import AddWorkExperienceDialog from './AddWorkExperienceDialog';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import EditWorkExperienceDialog from './EditWorkExperienceDialog';
import DeleteWorkExperienceDialog from './DeleteWorkExperienceDialog';
import { useState } from 'react';
import { useAppSelector } from '@/lib/store/hooks';
import OverlaySpinner from '@/components/core/OverlaySpinner';
import { Column, WorkExperienceEntry } from '@/lib/type';
import Timeline from '@/components/Timeline';

const workExperienceEntriesToTimelineEntries = (workExperienceEntries: WorkExperienceEntry[]) => {
    return workExperienceEntries.map((workExperienceEntry) => ({
        title: workExperienceEntry.company,
        startYear: workExperienceEntry.startDate?.year ?? '',
        startMonth: workExperienceEntry.startDate?.month ?? '',
        endYear: workExperienceEntry.endDate?.year,
        endMonth: workExperienceEntry.endDate?.month,
        description: workExperienceEntry.description
    }));
};

function WorkExperienceListEntry({
    id,
    company,
    startDate,
    endDate,
    location,
    role,
    description
}: WorkExperienceEntry) {
    return (
        <div className='grid gap-1 text-sm relative'>
            <div className='aspect-square w-3 bg-gray-900 rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-1 dark:bg-gray-50' />
            <div className='text-lg font-bold'>{company}</div>
            <div className='text-gray-500 dark:text-gray-400'>{location}</div>
            {startDate && (
                <div className='text-gray-500 dark:text-gray-400'>
                    {startDate.month} {startDate.year} - {endDate ? `${endDate.month} ${endDate.year}` : 'Present'}
                </div>
            )}
            <div className='text-gray-500 dark:text-gray-400'>{role}</div>
            <div className='text-gray-500 dark:text-gray-400'>{description}</div>
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

    const columns: Column[] = [
        { key: 'company', title: 'Company' },
        { key: 'startDate', title: 'Start' },
        { key: 'endDate', title: 'End' }
    ];

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
                            <WorkExperienceListEntry key={index} {...workExperienceEntry} />
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

    /*
    return (
        <div className='relative'>
            {busyUpdatingList && <OverlaySpinner />}
            <Table>
                <TableCaption>List of work experience</TableCaption>
                <TableHeader>
                    <TableRow>
                        {columns &&
                            columns.map((column) => (
                                <TableHead
                                    key={column.key}
                                    className={`w-[${column.width || 20}] text-${column.align || 'left'}`}
                                >
                                    {column.title}
                                </TableHead>
                            ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {workExperienceEntries &&
                        workExperienceEntries.map((workExperienceEntry, index) => (
                            <TableRow key={`${workExperienceEntry.company}-${index}`}>
                                <TableCell>{workExperienceEntry.company}</TableCell>
                                <TableCell>
                                    <span>{workExperienceEntry.startDate?.year}</span>
                                    <span> {workExperienceEntry.startDate?.month}</span>
                                </TableCell>
                                <TableCell>
                                    {workExperienceEntry.endDate ? (
                                        <>
                                            <span>{workExperienceEntry.endDate.year}</span>
                                            <span> {workExperienceEntry.endDate.month}</span>
                                        </>
                                    ) : (
                                        'Present'
                                    )}
                                </TableCell>
                                <TableCell>
                                    <EditWorkExperienceDialog
                                        workExperienceEntryToEdit={workExperienceEntry}
                                        setBusyUpdating={(v) => setBusyUpdatingList(v)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <DeleteWorkExperienceDialog
                                        workExperienceEntryToDelete={workExperienceEntry}
                                        setBusyDeleting={(v) => setBusyUpdatingList(v)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>

            <div className='mt-4'>
                <AddWorkExperienceDialog setBusyUpdating={(v) => setBusyUpdatingList(v)} />
                <form onSubmit={onSubmit} className='flex flex-col'>
                    <StepButtons onNext={onNext} onPrevious={onPrevious} />
                </form>
            </div>
        </div>
    );
    */
}
