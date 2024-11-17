// src/components/Drawer.tsx
import React, { useState } from 'react';
import { Icons } from './icons';
import ProgressSteps from './ProgressSteps';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTrigger
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';

type DrawerProps = {};

const StepDrawer: React.FC<DrawerProps> = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = () => {
        setIsOpen(false);
    };

    return (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger>
                <Icons.bars4 className='h-5 w-5 text-gray-400 mr-3' aria-hidden='true' />
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerDescription>
                        <ProgressSteps onSelect={handleSelect} />
                    </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                    <DrawerClose>
                        <Button variant='outline'>Close</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default StepDrawer;
