import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';

type StepButtonsProps = {
    onPrevious?: () => void;
    onNext?: () => void;
    asSubmit?: boolean;
    className?: string;
};

export function StepButtons({ onPrevious, onNext, asSubmit = true, ...rest }: StepButtonsProps) {
    return (
        <div className={`flex flex-row justify-between ${rest.className}`}>
            <Button
                disabled={!onPrevious}
                variant='outline'
                name='previous'
                type={asSubmit ? 'submit' : 'button'}
                onClick={asSubmit || !onPrevious ? undefined : () => onPrevious()}
            >
                <Icons.chevronLeft className='mr-2 h-4 w-4' />
                Previous
            </Button>

            <Button
                disabled={!onNext}
                variant={onNext ? 'default' : 'secondary'}
                name='next'
                type={asSubmit ? 'submit' : 'button'}
                onClick={asSubmit || !onNext ? undefined : () => onNext()}
            >
                Next
                <Icons.chevronRight className='ml-2' />
            </Button>
        </div>
    );
}
