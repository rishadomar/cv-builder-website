'use client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { EducationEntry } from '@/lib/type';
import EducationForm from './EducationForm';

interface EditEducationDialogProps {
    educationEntryToEdit: EducationEntry;
    setBusyUpdating: (v: boolean) => void;
    dialogIsOpen: boolean;
    setDialogState: (v: boolean) => void;
}

export default function EditEducationDialog({
    dialogIsOpen,
    setDialogState,
    educationEntryToEdit,
    setBusyUpdating
}: EditEducationDialogProps) {
    return (
        <Dialog open={dialogIsOpen} onOpenChange={(v) => setDialogState(v)}>
            <DialogContent aria-describedby='Capture education entry' className='sm:max-w-[425px] bg-white'>
                <DialogHeader>
                    <DialogTitle>Details</DialogTitle>
                </DialogHeader>

                <EducationForm
                    educationEntryToEdit={educationEntryToEdit}
                    setBusyUpdating={setBusyUpdating}
                    onClose={() => setDialogState(false)}
                />
            </DialogContent>
        </Dialog>
    );
}
