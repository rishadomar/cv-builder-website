import { WorkExperienceEntry } from '@/lib/type';
import WorkExperienceEntryActionsDropdown from './WorkExperienceEntryActionsDropdown';
import { Calendar, MapPin } from 'lucide-react';
import { getMonth } from '@/lib/utils';
import { useRef } from 'react';
import { FieldValueReview } from '../FieldValueReview';
import { IconValueReview } from '../IconValueReview';

type WorkExperienceItemProps = {
    workExperienceEntry: WorkExperienceEntry;
    busyUpdatingList?: boolean;
    setBusyUpdatingList?: (v: boolean) => void;
    collapseDescription: boolean;
    editable?: boolean;
};

export const WorkExperienceItem: React.FC<WorkExperienceItemProps> = ({
    workExperienceEntry,
    busyUpdatingList,
    setBusyUpdatingList,
    collapseDescription,
    editable = false
}) => {
    const parentRef = useRef<HTMLDivElement>(null);

    const getPeriod = () => {
        if (
            !workExperienceEntry.startDate ||
            !workExperienceEntry.startDate.year ||
            !workExperienceEntry.startDate.month
        ) {
            return '';
        }
        const startDateString = `${getMonth(workExperienceEntry.startDate.month)} ${
            workExperienceEntry.startDate.year
        }`;

        if (!workExperienceEntry.endDate || !workExperienceEntry.endDate.year || !workExperienceEntry.endDate.month) {
            return `${startDateString} - Present`;
        }

        return `${startDateString} - ${getMonth(workExperienceEntry.endDate.month)} ${
            workExperienceEntry.endDate.year
        }`;
    };

    return (
        <div ref={parentRef} className='grid grid-cols-[1fr_auto] gap-4 text-sm relative'>
            <div className='pl-9 grid gap-1'>
                <div className='aspect-square w-3 bg-gray-900 rounded-full absolute left-6 translate-x-[-12.5px] z-10 top-1 dark:bg-gray-50' />
                <FieldValueReview value={workExperienceEntry.company} />
                {workExperienceEntry.startDate &&
                    workExperienceEntry.startDate.year &&
                    workExperienceEntry.startDate.month >= 0 && <IconValueReview icon={Calendar} value={getPeriod()} />}
                <IconValueReview icon={MapPin} value={workExperienceEntry.location} />
                <FieldValueReview value={workExperienceEntry.role} />
                <FieldValueReview
                    collapseOptions={collapseDescription ? { collapsable: true, parentRef } : undefined}
                    value={workExperienceEntry.description}
                />
            </div>
            {editable === true && busyUpdatingList !== undefined && setBusyUpdatingList !== undefined && (
                <WorkExperienceEntryActionsDropdown
                    workExperienceEntry={workExperienceEntry}
                    busyUpdatingList={busyUpdatingList}
                    setBusyUpdatingList={setBusyUpdatingList}
                />
            )}
        </div>
    );
};
