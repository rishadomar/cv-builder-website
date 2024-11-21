import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

type StepHeaderProps = {
    icon: LucideIcon;
    iconColor?: string;
    title: string;
};

const StepHeader = ({ icon: Icon, iconColor = 'primary', title }: StepHeaderProps) => (
    <div className='flex flex-row'>
        <div
            className={cn('flex items-center justify-center w-8 h-8 rounded-full mr-3', {
                'bg-green-400': iconColor === 'done',
                'bg-primary': iconColor === 'primary',
                'bg-gray-500': iconColor === 'todo'
            })}
        >
            <Icon className='text-white' />
        </div>
        <div className='text-md font-bold'>{title}</div>
    </div>
);

export default StepHeader;
