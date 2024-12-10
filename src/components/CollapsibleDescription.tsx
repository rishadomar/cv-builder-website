import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface CollapsibleDescriptionProps {
    text: string;
    maxLength?: number;
    parentRef?: React.RefObject<HTMLDivElement>;
}

export const CollapsibleDescription: React.FC<CollapsibleDescriptionProps> = ({ text, maxLength = 150, parentRef }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const shouldTruncate = text.length > maxLength;

    const displayText = shouldTruncate && !isExpanded ? `${text.slice(0, maxLength)}...` : text;

    const handleClick = () => {
        setIsExpanded(!isExpanded);
        if (isExpanded && parentRef?.current) {
            parentRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    if (!shouldTruncate) return <div className='text-gray-500 dark:text-gray-400'>{text}</div>;

    return (
        <div className='space-y-1'>
            <div className='text-gray-500 dark:text-gray-400'>{displayText}</div>
            <Button
                variant='ghost'
                size='sm'
                className='h-8 px-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
                onClick={handleClick}
            >
                {isExpanded ? <ChevronUp className='h-4 w-4 mr-1' /> : <ChevronDown className='h-4 w-4 mr-1' />}
                {isExpanded ? 'Show Less' : 'Show More'}
            </Button>
        </div>
    );
};
