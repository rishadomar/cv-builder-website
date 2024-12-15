import { EducationEntry } from '@/lib/type';
import EducationEntryActionsDropdown from './EducationEntryActionsDropdown';
import { getMonth } from '@/lib/utils';
import { FieldValueReview } from '../FieldValueReview';
import { Calendar, MapPin, University } from 'lucide-react';
import { IconValueReview } from '../IconValueReview';
import { useRef } from 'react';

type EducationItemProps = {
    educationEntry: EducationEntry;
    busyUpdatingList?: boolean;
    setBusyUpdatingList?: (v: boolean) => void;
    editable?: boolean;
    collapseComment: boolean;
};

export const EducationItem: React.FC<EducationItemProps> = ({
    educationEntry,
    busyUpdatingList,
    setBusyUpdatingList,
    editable = false,
    collapseComment
}) => {
    const parentRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={parentRef} className='grid grid-cols-[1fr_auto] gap-4 text-sm relative'>
            <div className='pl-9 grid gap-1'>
                <div className='aspect-square w-3 bg-gray-900 rounded-full absolute left-6 translate-x-[-12.5px] z-10 top-1 dark:bg-gray-50' />
                <FieldValueReview value={educationEntry.description} />
                <IconValueReview icon={University} value={educationEntry.institution} />
                {educationEntry.graduationDate &&
                    educationEntry.graduationDate.year &&
                    educationEntry.graduationDate.month >= 0 && (
                        <IconValueReview
                            icon={Calendar}
                            value={`${getMonth(educationEntry.graduationDate.month)} ${
                                educationEntry.graduationDate.year
                            }`}
                        />
                    )}
                <IconValueReview icon={MapPin} value={educationEntry.location} />
                <FieldValueReview
                    collapseOptions={collapseComment ? { collapsable: true, parentRef } : undefined}
                    value={educationEntry.comment}
                />
            </div>
            {editable === true && busyUpdatingList !== undefined && setBusyUpdatingList !== undefined && (
                <div className='self-start'>
                    <EducationEntryActionsDropdown
                        educationEntry={educationEntry}
                        busyUpdating={busyUpdatingList}
                        setBusyUpdatingList={setBusyUpdatingList}
                    />
                </div>
            )}
        </div>
    );
};
