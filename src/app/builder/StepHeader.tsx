import { LucideIcon } from 'lucide-react';

type StepHeaderProps = {
    icon: LucideIcon;
    title: string;
};

const StepHeader = ({ icon: Icon, title }: StepHeaderProps) => (
    <div className='flex items-center'>
        <div className='flex items-center justify-center w-8 h-8 bg-primary rounded-full mr-3'>
            <Icon className='text-white' />
        </div>
        <div className='text-lg font-bold'>{title}</div>
    </div>
);

export default StepHeader;
