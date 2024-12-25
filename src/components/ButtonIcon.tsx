import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader, LucideIcon } from 'lucide-react';

type ButtonIconProps = {
    icon: LucideIcon;
    onClick: () => void;
    disabled?: boolean;
    isBusy?: boolean;
    description?: string;
};

const ButtonIcon: React.FC<ButtonIconProps> = ({ icon: Icon, onClick, disabled, isBusy, description }) => (
    <>
        {isBusy && (
            <div className='absolute inset-0 flex items-center justify-center bg-white bg-opacity-75'>
                <Loader className='w-6 h-6 animate-spin' />
            </div>
        )}

        <Button type='button' size='icon' variant='ghost' className='' onClick={onClick} disabled={disabled || isBusy}>
            <Icon className='w-4 h-4 text-gray-500 dark:text-gray-400' />
            <span className='sr-only'>{description ?? 'Button with icon'}</span>
        </Button>
    </>
);

export default ButtonIcon;
