import React from 'react';
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
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { isMobile } from '@/lib/utils';

type DrawerDialogProps = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    trigger?: React.ReactNode;
    title: string;
    description: string;
    closeText?: string;
    content: React.ReactNode;
};

export const DrawerDialog: React.FC<DrawerDialogProps> = ({
    isOpen,
    setIsOpen,
    trigger,
    title,
    description,
    closeText,
    content
}) => {
    console.log('DrawerDialog -> isOpen', isOpen);

    if (isMobile()) {
        return (
            <Drawer open={isOpen} onOpenChange={setIsOpen}>
                {trigger && <DrawerTrigger>{trigger}</DrawerTrigger>}
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>{title}</DrawerTitle>
                        <DrawerDescription>{description}</DrawerDescription>
                    </DrawerHeader>
                    {content}
                    {closeText && (
                        <Button className='m-4' variant='outline' onClick={() => setIsOpen(!isOpen)}>
                            {closeText}
                        </Button>
                    )}
                </DrawerContent>
            </Drawer>
        );
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
            <DialogContent>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>{description}</DialogDescription>
                {content}
            </DialogContent>
        </Dialog>
    );
};
