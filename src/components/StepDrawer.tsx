import React, { useState } from 'react';
import ProgressSteps from './ProgressSteps';
import { TableOfContents } from 'lucide-react';
import { DrawerDialog } from './DrawerDialog';

type DrawerProps = {};

const StepDrawer: React.FC<DrawerProps> = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = () => {
        setIsOpen(false);
    };

    return (
        <DrawerDialog
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            trigger={
                <div className='flex flex-row items-center text-center'>
                    <TableOfContents className='h-5 w-5 text-gray-400 mr-1' aria-hidden='true' />
                    <span className='text-gray-400 text-xs'>Contents</span>
                </div>
            }
            title='Build your CV'
            description='Complete these steps to complete your CV'
            closeText='Close'
            content={<ProgressSteps onSelect={handleSelect} />}
        />
    );
};

export default StepDrawer;
