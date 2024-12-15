'use client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { WorkExperienceEntry } from '@/lib/type';
import WorkExperienceForm from './WorkExperienceForm';

interface EditWorkExperienceDialogProps {
    workExperienceEntryToEdit: WorkExperienceEntry;
    busyUpdating: boolean;
    setBusyUpdating: (v: boolean) => void;
    dialogIsOpen: boolean;
    setDialogState: (v: boolean) => void;
}

export default function EditWorkExperienceDialog({
    dialogIsOpen,
    setDialogState,
    workExperienceEntryToEdit,
    busyUpdating,
    setBusyUpdating
}: EditWorkExperienceDialogProps) {
    return (
        <Dialog open={dialogIsOpen} onOpenChange={(v) => setDialogState(v)}>
            <DialogContent aria-describedby='Capture job specification' className='sm:max-w-[425px] bg-white'>
                <DialogHeader>
                    <DialogTitle>Job specification</DialogTitle>
                </DialogHeader>

                <WorkExperienceForm
                    workExperienceEntryToEdit={workExperienceEntryToEdit}
                    busyUpdating={busyUpdating}
                    setBusyUpdating={setBusyUpdating}
                    onClose={() => setDialogState(false)}
                />
            </DialogContent>
        </Dialog>
    );
}
