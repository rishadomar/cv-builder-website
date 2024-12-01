'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';
import EducationForm from './EducationForm';
import { Plus } from 'lucide-react';

type AddEducationDialogProps = {
    setBusyUpdating: (v: boolean) => void;
};

export default function AddEducationDialog({ setBusyUpdating }: AddEducationDialogProps) {
    const [dialogIsOpen, setDialogIsOpen] = useState(false);

    return (
        <Dialog open={dialogIsOpen} onOpenChange={(v) => setDialogIsOpen(v)}>
            <DialogTrigger asChild>
                <div className='flex justify-center items-center'>
                    <Button variant='outline' onClick={() => setDialogIsOpen(true)}>
                        <Plus className='mr-2' />
                        Add education
                    </Button>
                </div>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>Details</DialogTitle>
                </DialogHeader>

                <EducationForm setBusyUpdating={setBusyUpdating} onClose={() => setDialogIsOpen(false)} />
            </DialogContent>
        </Dialog>
    );
}
