'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';
import WorkExperienceForm from './WorkExperienceForm';
import { Plus } from 'lucide-react';

type AddWorkExperienceDialogProps = {
    setBusyUpdating: (v: boolean) => void;
};

export default function AddWorkExperienceDialog({ setBusyUpdating }: AddWorkExperienceDialogProps) {
    const [dialogIsOpen, setDialogIsOpen] = useState(false);

    return (
        <Dialog open={dialogIsOpen} onOpenChange={(v) => setDialogIsOpen(v)}>
            <DialogTrigger asChild>
                <div className='flex justify-center items-center'>
                    <Button variant='outline' onClick={() => setDialogIsOpen(true)}>
                        <Plus className='mr-2' />
                        Add work experience
                    </Button>
                </div>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>Job specification</DialogTitle>
                </DialogHeader>

                <WorkExperienceForm setBusyUpdating={setBusyUpdating} onClose={() => setDialogIsOpen(false)} />
            </DialogContent>
        </Dialog>
    );
}
