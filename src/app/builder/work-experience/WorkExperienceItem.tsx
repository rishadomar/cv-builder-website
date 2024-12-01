import { WorkExperienceEntry } from '@/lib/type';
import WorkExperienceEntryActionsDropdown from './WorkExperienceEntryActionsDropdown';

type WorkExperienceItemProps = {
    workExperienceEntry: WorkExperienceEntry;
    setBusyUpdatingList: (v: boolean) => void;
};

export const WorkExperienceItem: React.FC<WorkExperienceItemProps> = ({ workExperienceEntry, setBusyUpdatingList }) => {
    return (
        <div className='grid grid-cols-[1fr_auto] gap-4 text-sm relative'>
            <div className='grid gap-1'>
                <div className='aspect-square w-3 bg-gray-900 rounded-full absolute left-1 translate-x-[-29.5px] z-10 top-2 dark:bg-gray-50' />
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
            <div className=''>
                <WorkExperienceEntryActionsDropdown
                    workExperienceEntry={workExperienceEntry}
                    setBusyUpdatingList={setBusyUpdatingList}
                />
            </div>
        </div>
    );
};
