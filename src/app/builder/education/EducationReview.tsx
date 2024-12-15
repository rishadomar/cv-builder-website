import { useAppSelector } from '@/lib/store/hooks';
import { getStep } from '@/lib/utils/step';
import StepHeader from '../StepHeader';
import { EducationItem } from './EducationItem';

export const EducationReview: React.FC = () => {
    const educationEntries = useAppSelector((state) => state.fieldValues.educationEntries);
    const step = getStep('education');

    return (
        <div>
            <div className='mb-3'>
                <StepHeader icon={step.icon} title={step.title} />
            </div>
            <div className='flex flex-col gap-6'>
                {educationEntries &&
                    educationEntries.map((educationEntry, index) => (
                        <EducationItem
                            key={index}
                            educationEntry={educationEntry}
                            setBusyUpdatingList={() => {}}
                            collapseComment={false}
                        />
                    ))}
            </div>
        </div>
    );
};
