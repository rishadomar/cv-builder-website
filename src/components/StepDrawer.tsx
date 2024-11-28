// src/components/Drawer.tsx
import React, { useState } from 'react';
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
import { Menu } from 'lucide-react';

type DrawerProps = {};

const StepDrawer: React.FC<DrawerProps> = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = () => {
        setIsOpen(false);
    };

    return (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger>
                <div className='flex flex-row text-center'>
                    <Menu className='h-5 w-5 text-gray-400 mr-1' aria-hidden='true' />
                    <span className='text-gray-400 text-xs'>Menu</span>
                </div>
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
