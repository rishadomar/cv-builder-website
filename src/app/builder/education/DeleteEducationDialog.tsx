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
import { EducationEntry } from '@/lib/type';
import { useAppDispatch } from '@/lib/store/hooks';
import { useToast } from '@/hooks/use-toast';
import { deleteEducation } from '@/lib/services';

interface DeleteEducationDialogProps {
    dialogIsOpen: boolean;
    setDialogState: (v: boolean) => void;
    educationEntryToDelete: EducationEntry;
    setBusyDeleting: (v: boolean) => void;
}

export default function DeleteEducationDialog({
    dialogIsOpen,
    setDialogState,
    educationEntryToDelete,
    setBusyDeleting
}: DeleteEducationDialogProps) {
    const dispatch = useAppDispatch();
    const { toast } = useToast();

    return (
        <AlertDialog open={dialogIsOpen} onOpenChange={(v) => setDialogState(v)}>
            <AlertDialogContent className='bg-white opacity-100'>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>Confirm deletion of this education entry</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={async () => {
                            try {
                                setBusyDeleting(true);
                                await dispatch(deleteEducation(educationEntryToDelete));
                                toast({
                                    title: 'EducationEntry',
                                    description: 'Successfully deleted'
                                });
                            } catch (error) {
                                console.error('Error deleting education', error);
                                toast({
                                    variant: 'destructive',
                                    title: 'EducationEntry',
                                    description: 'Failed to delete'
                                });
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
