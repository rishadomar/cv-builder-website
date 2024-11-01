import { StepButtons } from '../StepButtons';
import AddWorkExperienceDialog from './AddWorkExperienceDialog';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import EditWorkExperienceDialog from './EditWorkExperienceDialog';
import DeleteWorkExperienceDialog from './DeleteWorkExperienceDialog';
import { useState } from 'react';
import { useAppSelector } from '@/lib/store/hooks';
import OverlaySpinner from '@/components/core/OverlaySpinner';
import { Column } from '@/lib/type';

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
                                    <span>test</span>
                                    {/* <span>{workExperienceEntry.startDate}</span>
                                    <span> {workExperienceEntry.startDate}</span> */}
                                </TableCell>
                                <TableCell>
                                    {workExperienceEntry.endDate?.toISOString().slice(0, 10) || 'Present'}
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
}
