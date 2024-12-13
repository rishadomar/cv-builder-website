import { useAppSelector } from '@/lib/store/hooks';
import { getStep } from '@/lib/utils/step';
import StepHeader from '../StepHeader';
import { WorkExperienceItem } from './WorkExperienceItem';

export const WorkExperienceReview: React.FC = () => {
    const workExperienceEntries = useAppSelector((state) => state.fieldValues.workExperiences);
    const step = getStep('work-experience');

    return (
        <div>
            <StepHeader icon={step.icon} title={step.title} />
            {workExperienceEntries &&
                workExperienceEntries.map((workExperienceEntry, index) => (
                    <WorkExperienceItem
                        key={index}
                        workExperienceEntry={workExperienceEntry}
                        setBusyUpdatingList={() => {}}
                    />
                ))}
        </div>
    );
};
