import { useAppSelector } from '@/lib/store/hooks';
import { getStep } from '@/lib/utils/step';
import StepHeader from '../StepHeader';
import { EducationItem } from './EducationItem';
import Link from 'next/link';

export const EducationReview: React.FC = () => {
    const educationEntries = useAppSelector((state) => state.fieldValues.educationEntries);
    const step = getStep('education');

    return (
        <div>
            <div className='mb-3'>
                <Link href={`/builder?page=${step.path}`}>
                    <StepHeader icon={step.icon} title={step.title} />
                </Link>
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
