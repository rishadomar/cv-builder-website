import { Button } from '@/components/ui/button';
import { MicVocal } from 'lucide-react';

export const TriggerConversionButton = () => {
    return (
        <div className='flex flex-col items-center justify-center mt-4 relative'>
            <div className='absolute -top-3 right-3 md:right-1/4'>
                <span className='inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 animate-pulse'>
                    New
                </span>
            </div>
            <Button
                className='w-full max-w-md'
                variant='outline'
                onClick={() => console.log('Listen to your topskills')}
            >
                Listen
                <MicVocal className='ml-2 h-5 w-5' />
            </Button>
            <div className='text-xs text-center mt-2'>Listen to human resource discuss your TopSkills</div>
        </div>
    );
};
