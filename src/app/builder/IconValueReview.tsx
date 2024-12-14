import { LucideIcon } from 'lucide-react';

type CollapseOptions = {
    collapsable: boolean;
    parentRef: React.RefObject<HTMLDivElement>;
};

type IconValueReviewProps = {
    icon: LucideIcon;
    value?: string;
};

export const IconValueReview: React.FC<IconValueReviewProps> = ({ icon: Icon, value = '--no value--' }) => (
    <div className='flex flex-row items-center gap-2'>
        <Icon className='w-4 h-4 text-gray-500 dark:text-gray-400' />
        <span className='text-sm'>{value}</span>
    </div>
);
