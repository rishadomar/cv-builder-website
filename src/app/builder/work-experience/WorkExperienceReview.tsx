import { useAppSelector } from '@/lib/store/hooks';
import { getStep } from '@/lib/utils/step';
import StepHeader from '../StepHeader';
import { WorkExperienceItem } from './WorkExperienceItem';

export const WorkExperienceReview: React.FC = () => {
    const workExperienceEntries = useAppSelector((state) => state.fieldValues.workExperiences);
    const step = getStep('work-experience');

    return (
        <div>
            <div className='mb-3'>
                <StepHeader icon={step.icon} title={step.title} />
            </div>

            <div className='flex flex-col gap-6'>
                {workExperienceEntries &&
                    workExperienceEntries.map((workExperienceEntry, index) => (
                        <WorkExperienceItem
                            key={index}
                            workExperienceEntry={workExperienceEntry}
                            setBusyUpdatingList={() => {}}
                            collapseDescription={false}
                        />
                    ))}
            </div>
        </div>
    );
};
