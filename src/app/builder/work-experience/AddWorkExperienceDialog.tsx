'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import WorkExperienceForm from './WorkExperienceForm';
import { Plus } from 'lucide-react';
import { DrawerDialog } from '@/components/DrawerDialog';

type AddWorkExperienceDialogProps = {
    busyUpdating: boolean;
    setBusyUpdating: (v: boolean) => void;
};

export default function AddWorkExperienceDialog({ busyUpdating, setBusyUpdating }: AddWorkExperienceDialogProps) {
    const [dialogIsOpen, setDialogIsOpen] = useState(false);

    return (
        <DrawerDialog
            isOpen={dialogIsOpen}
            setIsOpen={setDialogIsOpen}
            trigger={
                <Button variant='outline' onClick={() => setDialogIsOpen(true)}>
                    <Plus className='mr-2' />
                    Add work experience
                </Button>
            }
            title='Work specification'
            content={
                <WorkExperienceForm
                    busyUpdating={busyUpdating}
                    setBusyUpdating={setBusyUpdating}
                    onClose={() => setDialogIsOpen(false)}
                />
            }
        />
    );
}
