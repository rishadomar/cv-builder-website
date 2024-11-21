import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type StepButtonsProps = {
    onPrevious?: () => void;
    onNext?: () => void;
    asSubmit?: boolean;
};

export function StepButtons({ onPrevious, onNext, asSubmit = true }: StepButtonsProps) {
    return (
        <div className='fixed bottom-0 left-0 right-0 bg-white border-t h-20'>
            <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 h-full'>
                <div className='flex items-center justify-end h-full space-x-4'>
                    <Button
                        disabled={!onPrevious}
                        variant='outline'
                        name='previous'
                        type={asSubmit ? 'submit' : 'button'}
                        onClick={asSubmit || !onPrevious ? undefined : () => onPrevious()}
                    >
                        <ChevronLeft className='mr-2 h-4 w-4' />
                        Previous
                    </Button>

                    <Button
                        disabled={!onNext}
                        variant={onNext ? 'default' : 'outline'}
                        name='next'
                        type={asSubmit ? 'submit' : 'button'}
                        onClick={asSubmit || !onNext ? undefined : () => onNext()}
                    >
                        Next
                        <ChevronRight className={`ml-2 h-4 w-4 ${onNext ? 'text-white' : 'text-black'}`} />
                    </Button>
                </div>
            </div>
        </div>
    );
}
