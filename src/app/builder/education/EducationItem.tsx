import { EducationEntry } from '@/lib/type';
import EducationEntryActionsDropdown from './EducationEntryActionsDropdown';
import { getMonth } from '@/lib/utils';
import { Check } from 'lucide-react';

type EducationItemProps = {
    educationEntry: EducationEntry;
    setBusyUpdatingList: (v: boolean) => void;
};

export const EducationItem: React.FC<EducationItemProps> = ({ educationEntry, setBusyUpdatingList }) => {
    return (
        <div className='grid grid-cols-[1fr_auto] gap-4 text-sm relative'>
            <div className='pl-4 grid gap-1'>
                <div className='aspect-square w-3 bg-gray-900 rounded-full absolute left-1 translate-x-[-12.5px] z-10 top-2 dark:bg-gray-50' />{' '}
                <div className='text-lg font-bold'>{educationEntry.description}</div>
                <div className='text-gray-500 dark:text-gray-400'>{educationEntry.institution}</div>
                <div className='text-gray-500 dark:text-gray-400'>{educationEntry.location}</div>
                {educationEntry.graduationDate &&
                    educationEntry.graduationDate.year &&
                    educationEntry.graduationDate.month && (
                        <div className='text-gray-500 dark:text-gray-400'>
                            <Check className='w-4 h-4 inline-block mr-1' />
                            {getMonth(educationEntry.graduationDate.month)} {educationEntry.graduationDate.year}
                        </div>
                    )}
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
};
