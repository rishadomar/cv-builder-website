import { LucideIcon } from 'lucide-react';

type StepHeaderProps = {
    icon?: LucideIcon;
    iconColor?: string;
    title: string;
};

const StepHeader = ({ icon: Icon, title }: StepHeaderProps) => (
    <div className='flex flex-row items-center'>
        {Icon && (
            <div className='flex items-center justify-center w-8 h-8 mr-2'>
                <Icon className='text-gray-600' />
            </div>
        )}
        <div className='text-md'>{title}</div>
    </div>
);

export default StepHeader;
