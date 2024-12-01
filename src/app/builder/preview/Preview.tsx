import { getStep } from '@/lib/utils/step';
import { StepButtons } from '../StepButtons';
import StepHeader from '../StepHeader';
import { LucideIcon } from 'lucide-react';
// import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';

type PreviewProps = {
    onNext?: () => void;
    onPrevious: () => void;
};

export const Preview: React.FC<PreviewProps> = ({ onNext, onPrevious }) => {
    // const dispatch = useAppDispatch();
    // const isLoading = useAppSelector((state) => state.loading.isLoading);
    // const allFieldValues = useAppSelector((state) => state.fieldValues);
    const step = getStep('preview');

    return (
        <>
            <div className='h-[calc(100vh-theme(spacing.16)-theme(spacing.20))] overflow-y-auto'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6'>
                    <StepHeader icon={step?.icon as LucideIcon} title={step?.title ?? ''} />
                    <div>Coming soon...</div>
                </div>
            </div>
            <StepButtons asSubmit={false} onNext={onNext} onPrevious={onPrevious} />
        </>
    );
};
