'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
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
            trigger={
                <div className='flex justify-center items-center'>
                    <Button variant='outline' onClick={() => setDialogIsOpen(true)}>
                        <Plus className='mr-2' />
                        Add education
                    </Button>
                </div>
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
