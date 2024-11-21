import React from 'react';
import { Check } from 'lucide-react';

interface PillProps {
    variant: 'selected' | 'outline';
    onClick: () => void;
    children: React.ReactNode;
}

const Pill: React.FC<PillProps> = ({ variant, onClick, children }) => {
    const baseClasses = 'px-2 py-1 text-xs rounded-full cursor-pointer flex items-center';
    const variantClasses = variant === 'selected' ? 'bg-gray-400 text-white' : 'border border-gray-700 text-gray-500';

    return (
        <span className={`${baseClasses} ${variantClasses}`} onClick={onClick}>
            {variant === 'selected' && <Check className='mr-1' />} {children}
        </span>
    );
};

export default Pill;
