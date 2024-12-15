import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { WorkExperienceEntry } from '@/lib/type';
import { useAppDispatch } from '@/lib/store/hooks';
import { deleteWorkExperience } from '@/lib/services';
import { toast } from 'react-toastify';

interface DeleteWorkExperienceDialogProps {
    dialogIsOpen: boolean;
    setDialogState: (v: boolean) => void;
    workExperienceEntryToDelete: WorkExperienceEntry;
    setBusyDeleting: (v: boolean) => void;
}

export default function DeleteWorkExperienceDialog({
    dialogIsOpen,
    setDialogState,
    workExperienceEntryToDelete,
    setBusyDeleting
}: DeleteWorkExperienceDialogProps) {
    const dispatch = useAppDispatch();

    return (
        <AlertDialog open={dialogIsOpen} onOpenChange={(v) => setDialogState(v)}>
            <AlertDialogContent className='bg-white opacity-100'>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>Confirm deletion of this work experience entry</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={async () => {
                            try {
                                setBusyDeleting(true);
                                await dispatch(deleteWorkExperience(workExperienceEntryToDelete));
                                toast.success('Successfully deleted');
                            } catch (error) {
                                console.error('Error deleting work experience', error);
                                toast.error('Failed to delete');
                            } finally {
                                setBusyDeleting(false);
                            }
                        }}
                    >
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
