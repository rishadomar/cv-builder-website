import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

type ImproveWithAIButtonProps = {
    isBusyImproving: boolean;
    onClick: () => void;
    disabled?: boolean;
    isDirty?: boolean;
};

const ImproveWithAIButton: React.FC<ImproveWithAIButtonProps> = ({
    isBusyImproving,
    onClick,
    disabled = false,
    isDirty = false
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
            className={cn(
                'absolute bottom-1 right-3 h-8 w-8 text-violet-600',
                isDirty && 'animate-[vibrate-burst_4s_ease-in-out_infinite]'
            )}
            onClick={onClick}
            disabled={disabled || isBusyImproving}
            style={{
                ['--tw-animate-vibrate' as string]: isDirty && !disabled && !isBusyImproving ? 'running' : 'paused'
            }}
        >
            <Sparkles className='h-4 w-4' />
            <span className='sr-only'>Improve with AI</span>
        </Button>

        <style jsx global>{`
            @keyframes vibrate-burst {
                0%,
                75%,
                100% {
                    transform: translate(0);
                }

                /* 1-second burst of vibrations (0-25% of the 4s cycle) */
                2.5% {
                    transform: translate(2px);
                }
                5% {
                    transform: translate(-2px);
                }
                7.5% {
                    transform: translate(2px);
                }
                10% {
                    transform: translate(-2px);
                }
                12.5% {
                    transform: translate(2px);
                }
                15% {
                    transform: translate(-2px);
                }
                17.5% {
                    transform: translate(2px);
                }
                20% {
                    transform: translate(-2px);
                }
                22.5% {
                    transform: translate(2px);
                }
                25% {
                    transform: translate(0);
                }

                /* Remains still from 25% to 100% (3 seconds) */
            }
        `}</style>
    </>
);

export default ImproveWithAIButton;
