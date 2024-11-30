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
    DrawerTitle,
    DrawerTrigger
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

type DrawerProps = {};

const StepDrawer: React.FC<DrawerProps> = () => {
    const [isOpen, setIsOpen] = useState(false);
    const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

    const handleSelect = () => {
        setIsOpen(false);
    };

    if (isMobile) {
        return (
            <Drawer open={isOpen} onOpenChange={setIsOpen}>
                <DrawerTrigger>
                    <div className='flex flex-row items-center text-center'>
                        <Menu className='h-5 w-5 text-gray-400 mr-1' aria-hidden='true' />
                        <span className='text-gray-400 text-xs'>Menu</span>
                    </div>
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Build your CV</DrawerTitle>
                        <DrawerDescription>Complete these steps to complete your CV</DrawerDescription>
                    </DrawerHeader>
                    <ProgressSteps onSelect={handleSelect} />
                    <DrawerFooter>
                        <DrawerClose>
                            <Button variant='outline'>Close</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        );
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <div className='flex flex-row items-center text-center'>
                    <Menu className='h-5 w-5 text-gray-400 mr-1' aria-hidden='true' />
                    <span className='text-gray-400 text-xs'>Menu</span>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>Make changes to your profile here. Click save when you are done.</DialogDescription>
                <ProgressSteps onSelect={() => setIsOpen(false)} />
            </DialogContent>
        </Dialog>
    );
};

export default StepDrawer;
