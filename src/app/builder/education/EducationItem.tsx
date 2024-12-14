import { EducationEntry } from '@/lib/type';
import EducationEntryActionsDropdown from './EducationEntryActionsDropdown';
import { getMonth } from '@/lib/utils';
import { FieldValueReview } from '../FieldValueReview';

type EducationItemProps = {
    educationEntry: EducationEntry;
    setBusyUpdatingList: (v: boolean) => void;
    editable?: boolean;
};

export const EducationItem: React.FC<EducationItemProps> = ({
    educationEntry,
    setBusyUpdatingList,
    editable = false
}) => {
    return (
        <div className='grid grid-cols-[1fr_auto] gap-4 text-sm relative'>
            <div className='pl-9 grid gap-1'>
                <div className='aspect-square w-3 bg-gray-900 rounded-full absolute left-6 translate-x-[-12.5px] z-10 top-1 dark:bg-gray-50' />
                <FieldValueReview value={educationEntry.description} />
                <FieldValueReview field='Institution' value={educationEntry.institution} />
                <FieldValueReview field='Location' value={educationEntry.location} />
                {educationEntry.graduationDate &&
                    educationEntry.graduationDate.year &&
                    educationEntry.graduationDate.month >= 0 && (
                        <FieldValueReview
                            withCheck
                            field='Graduation date'
                            value={`${getMonth(educationEntry.graduationDate.month)} ${
                                educationEntry.graduationDate.year
                            }`}
                        />
                    )}
                <FieldValueReview value={educationEntry.comment} />
            </div>
            {editable && (
                <EducationEntryActionsDropdown
                    educationEntry={educationEntry}
                    setBusyUpdatingList={setBusyUpdatingList}
                />
            )}
        </div>
    );
};
