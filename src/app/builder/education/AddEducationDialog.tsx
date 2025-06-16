'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import EducationForm from './EducationForm';
import { Plus } from 'lucide-react';
import { DrawerDialog } from '@/components/DrawerDialog';

type AddEducationDialogProps = {
    busyUpdating: boolean;
    setBusyUpdating: (v: boolean) => void;
};

export default function AddEducationDialog({ busyUpdating, setBusyUpdating }: AddEducationDialogProps) {
    const [dialogIsOpen, setDialogIsOpen] = useState(false);

    return (
        <DrawerDialog
            isOpen={dialogIsOpen}
            setIsOpen={setDialogIsOpen}
            preferDialog
            trigger={
                <Button variant='outline' onClick={() => setDialogIsOpen(true)}>
                    <Plus className='mr-2' />
                    Add education
                </Button>
            }
            title='Education specification'
            content={
                <EducationForm
                    busyUpdating={busyUpdating}
                    setBusyUpdating={setBusyUpdating}
                    onClose={() => setDialogIsOpen(false)}
                />
            }
        />
    );
}
