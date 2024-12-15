import { Button } from '@/components/ui/button';
import { Loader, Sparkles } from 'lucide-react';

type ImproveWithAIButtonProps = {
    isBusyImproving: boolean;
    onClick: () => void;
    disabled?: boolean;
};

export const ImproveWithAIButton: React.FC<ImproveWithAIButtonProps> = ({
    isBusyImproving,
    onClick,
    disabled = false
}) => (
    <>
        {isBusyImproving && (
            <div className='absolute inset-0 flex items-center justify-center bg-white bg-opacity-75'>
                <Loader className='w-6 h-6 animate-spin' />
            </div>
        )}

        <Button
            type='button'
            size='icon'
            variant='ghost'
            className='absolute bottom-1 right-1 h-8 w-8 text-violet-600'
            onClick={onClick}
            disabled={disabled || isBusyImproving}
        >
            <Sparkles className='h-4 w-4' />
            <span className='sr-only'>Improve with AI</span>
        </Button>
    </>
);
