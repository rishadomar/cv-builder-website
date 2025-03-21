import { StepType } from '@/lib/type';
import StepHeader from '../app/builder/StepHeader';
import { LucideIcon } from 'lucide-react';

type StepContainerProps = {
    step: StepType;
    children: React.ReactNode;
};

export const StepContainer: React.FC<StepContainerProps> = ({ step, children }) => (
    <div className='h-[calc(100vh-theme(spacing.16)-theme(spacing.20))] overflow-y-auto'>
        <div className='max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-6 space-y-6'>
            <StepHeader icon={step?.icon as LucideIcon} title={step?.title ?? ''} />
            {children}
        </div>
    </div>
);
