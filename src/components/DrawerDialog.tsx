import React from 'react';
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
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
    description?: string;
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
    if (isMobile()) {
        return (
            <Drawer open={isOpen} onOpenChange={setIsOpen}>
                {trigger && <DrawerTrigger>{trigger}</DrawerTrigger>}
                <DrawerContent className='max-h-[90vh]'>
                    <div className='max-h-full overflow-y-auto'>
                        <DrawerHeader className='px-4'>
                            <DrawerTitle>{title}</DrawerTitle>
                            {description && <DrawerDescription>{description}</DrawerDescription>}
                        </DrawerHeader>
                        <div className='px-4'>
                            {content}
                            {closeText && (
                                <Button className='mt-6 w-full' variant='outline' onClick={() => setIsOpen(!isOpen)}>
                                    {closeText}
                                </Button>
                            )}
                        </div>
                    </div>
                </DrawerContent>
            </Drawer>
        );
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
            <DialogContent className='max-h-[90vh] overflow-y-auto'>
                <DialogTitle>{title}</DialogTitle>
                {description && <DialogDescription>{description}</DialogDescription>}
                <div>{content}</div>
            </DialogContent>
        </Dialog>
    );
};
