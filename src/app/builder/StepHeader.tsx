import { LucideIcon } from 'lucide-react';

type StepHeaderProps = {
    icon?: LucideIcon;
    iconColor?: string;
    title: string;
    renderInContents?: boolean;
};

const StepHeader = ({ icon: Icon, title, renderInContents = false }: StepHeaderProps) => (
    <div className='flex flex-row items-center'>
        {Icon && (
            <div className='flex items-center justify-center w-8 h-8 mr-2'>
                <Icon className='text-gray-600' />
            </div>
        )}
        {renderInContents ? <div className='text-md'>{title}</div> : <h3 className='text-lg font-semibold'>{title}</h3>}
    </div>
);

export default StepHeader;
