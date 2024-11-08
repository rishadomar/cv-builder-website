'use client';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';
import { WorkExperienceEntry } from '@/lib/type';
import WorkExperienceForm from './WorkExperienceForm';
import { Icons } from '@/components/icons';

interface EditWorkExperienceDialogProps {
    workExperienceEntryToEdit: WorkExperienceEntry;
    setBusyUpdating: (v: boolean) => void;
}

export default function EditWorkExperienceDialog({
    workExperienceEntryToEdit,
    setBusyUpdating
}: EditWorkExperienceDialogProps) {
    const [dialogIsOpen, setDialogIsOpen] = useState(false);

    return (
        <Dialog open={dialogIsOpen} onOpenChange={(v) => setDialogIsOpen(v)}>
            <DialogTrigger asChild>
                <div className='flex justify-center items-center'>
                    <Icons.pen
                        className='w-4 h-4 text-gray-500 dark:text-gray-400 cursor-pointer'
                        onClick={() => {
                            setDialogIsOpen(true);
                        }}
                    />
                </div>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px] bg-white'>
                <DialogHeader>
                    <DialogTitle>Job specification</DialogTitle>
                </DialogHeader>

                <WorkExperienceForm
                    workExperienceEntryToEdit={workExperienceEntryToEdit}
                    setBusyUpdating={setBusyUpdating}
                    onClose={() => setDialogIsOpen(false)}
                />
            </DialogContent>
        </Dialog>
    );
}
