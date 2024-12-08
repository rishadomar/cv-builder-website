import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

type ImproveWithAIButtonProps = {
    onClick: () => void;
    disabled?: boolean;
};

export const ImproveWithAIButton: React.FC<ImproveWithAIButtonProps> = ({ onClick, disabled = false }) => (
    <Button
        type='button'
        size='icon'
        variant='ghost'
        className='absolute bottom-2 right-2 h-8 w-8 hover:bg-violet-50 hover:text-violet-600'
        onClick={onClick}
        disabled={disabled}
    >
        <Sparkles className='h-4 w-4' />
        <span className='sr-only'>Improve with AI</span>
    </Button>
);
