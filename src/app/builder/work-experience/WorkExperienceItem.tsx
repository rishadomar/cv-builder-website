import { WorkExperienceEntry } from '@/lib/type';
import WorkExperienceEntryActionsDropdown from './WorkExperienceEntryActionsDropdown';
import { Calendar } from 'lucide-react';
import { getMonth } from '@/lib/utils';

type WorkExperienceItemProps = {
    workExperienceEntry: WorkExperienceEntry;
    setBusyUpdatingList: (v: boolean) => void;
};

export const WorkExperienceItem: React.FC<WorkExperienceItemProps> = ({ workExperienceEntry, setBusyUpdatingList }) => {
    return (
        <div className='grid grid-cols-[1fr_auto] gap-4 text-sm relative'>
            <div className='pl-4 grid gap-1'>
                <div className='aspect-square w-3 bg-gray-900 rounded-full absolute left-1 translate-x-[-12.5px] z-10 top-2 dark:bg-gray-50' />
                <div className='text-lg font-bold'>{workExperienceEntry.company}</div>
                <div className='text-gray-500 dark:text-gray-400'>{workExperienceEntry.location}</div>
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
                <div className='text-gray-500 dark:text-gray-400'>{workExperienceEntry.role}</div>
                <div className='text-gray-500 dark:text-gray-400'>{workExperienceEntry.description}</div>
            </div>
            <div className=''>
                <WorkExperienceEntryActionsDropdown
                    workExperienceEntry={workExperienceEntry}
                    setBusyUpdatingList={setBusyUpdatingList}
                />
            </div>
        </div>
    );
};
