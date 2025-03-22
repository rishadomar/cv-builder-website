import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Home, RotateCcw } from 'lucide-react';

type StepButtonsProps = {
    onPrevious?: () => void;
    onNext?: () => void;
    onRestartDemo?: () => void;
    onReturnToHome: () => void;
    asSubmit?: boolean;
    typing?: boolean;
    completed?: boolean;
};

export function StepButtons({
    onPrevious,
    onNext,
    onRestartDemo,
    onReturnToHome,
    asSubmit = true,
    typing,
    completed
}: StepButtonsProps) {
    return (
        <div className='fixed bottom-0 left-0 right-0 bg-white border-t h-20'>
            <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 h-full'>
                {onRestartDemo ? (
                    <div className='flex items-center justify-end h-full space-x-4'>
                        <Button
                            variant='outline'
                            name='restart'
                            type='button'
                            onClick={asSubmit ? undefined : () => onRestartDemo()}
                        >
                            <RotateCcw className='mr-2 h-4 w-4' />
                            Restart demo
                        </Button>
                        <Button
                            variant='default'
                            name='home'
                            type='button'
                            onClick={asSubmit ? undefined : () => onReturnToHome()}
                        >
                            <Home className='mr-2 h-4 w-4' />
                            Home
                        </Button>
                    </div>
                ) : (
                    <div className='flex items-center justify-between h-full'>
                        <Button
                            variant='outline'
                            name='home'
                            type='button'
                            onClick={onReturnToHome}
                            className='rounded-full p-0 w-10 h-10 flex items-center justify-center'
                        >
                            <Home className='h-4 w-4' />
                        </Button>
                        <Button
                            disabled={!onPrevious || typing || !completed}
                            variant='outline'
                            name='previous'
                            type={asSubmit ? 'submit' : 'button'}
                            onClick={asSubmit || !onPrevious ? undefined : () => onPrevious()}
                        >
                            <ChevronLeft className='mr-2 h-4 w-4' />
                            Previous
                        </Button>

                        <Button
                            disabled={!onNext || typing || !completed}
                            variant={onNext ? 'default' : 'outline'}
                            name='next'
                            type={asSubmit ? 'submit' : 'button'}
                            onClick={asSubmit || !onNext ? undefined : () => onNext()}
                        >
                            {typing ? (
                                'Auto-filling...'
                            ) : (
                                <>
                                    Next
                                    <ChevronRight className={`ml-2 h-4 w-4 ${onNext ? 'text-white' : 'text-black'}`} />
                                </>
                            )}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
