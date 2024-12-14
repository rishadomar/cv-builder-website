import { WorkExperienceEntry } from '@/lib/type';
import WorkExperienceEntryActionsDropdown from './WorkExperienceEntryActionsDropdown';
import { Calendar, MapPin } from 'lucide-react';
import { getMonth } from '@/lib/utils';
import { useRef } from 'react';
import { FieldValueReview } from '../FieldValueReview';

type WorkExperienceItemProps = {
    workExperienceEntry: WorkExperienceEntry;
    setBusyUpdatingList: (v: boolean) => void;
    collapseDescription: boolean;
    editable?: boolean;
};

export const WorkExperienceItem: React.FC<WorkExperienceItemProps> = ({
    workExperienceEntry,
    setBusyUpdatingList,
    collapseDescription,
    editable = false
}) => {
    const parentRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={parentRef} className='grid grid-cols-[1fr_auto] gap-4 text-sm relative'>
            <div className='pl-9 grid gap-1'>
                <div className='aspect-square w-3 bg-gray-900 rounded-full absolute left-6 translate-x-[-12.5px] z-10 top-1 dark:bg-gray-50' />
                <FieldValueReview value={workExperienceEntry.company} />
                {workExperienceEntry.startDate &&
                    workExperienceEntry.startDate.year &&
                    workExperienceEntry.startDate.month >= 0 && (
                        <div className='text-gray-500 dark:text-gray-400'>
                            <Calendar className='w-4 h-4 inline-block mr-1' />
                            {getMonth(workExperienceEntry.startDate.month)} {workExperienceEntry.startDate.year} -{' '}
                            {workExperienceEntry.endDate &&
                            workExperienceEntry.endDate.month >= 0 &&
                            workExperienceEntry.endDate.year
                                ? `${getMonth(workExperienceEntry.endDate.month)} ${workExperienceEntry.endDate.year}`
                                : 'Present'}
                        </div>
                    )}
                <div>
                    <MapPin className='w-4 h-4 inline-block mr-1 text-gray-500 dark:text-gray-400' />
                    {workExperienceEntry.location}
                </div>
                <FieldValueReview value={workExperienceEntry.role} />
                <FieldValueReview
                    collapseOptions={collapseDescription ? { collapsable: true, parentRef } : undefined}
                    value={workExperienceEntry.description}
                />
            </div>
            {editable && (
                <WorkExperienceEntryActionsDropdown
                    workExperienceEntry={workExperienceEntry}
                    setBusyUpdatingList={setBusyUpdatingList}
                />
            )}
        </div>
    );
};
