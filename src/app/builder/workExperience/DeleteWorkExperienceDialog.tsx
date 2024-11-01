import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { WorkExperienceEntry } from '@/lib/type';
import { useAppDispatch } from '@/lib/store/hooks';
import { useToast } from '@/hooks/use-toast';
import { deleteWorkExperience } from '@/lib/services';
import { Icons } from '@/components/icons';

interface DeleteWorkExperienceDialogProps {
    workExperienceEntryToDelete: WorkExperienceEntry;
    setBusyDeleting: (v: boolean) => void;
}

export default function DeleteWorkExperienceDialog({
    workExperienceEntryToDelete,
    setBusyDeleting
}: DeleteWorkExperienceDialogProps) {
    const dispatch = useAppDispatch();
    const { toast } = useToast();

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Icons.trash />
            </AlertDialogTrigger>
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
                                toast({
                                    title: 'WorkExperienceEntry',
                                    description: 'Successfully deleted'
                                });
                            } catch (error) {
                                console.error('Error deleting work experience', error);
                                toast({
                                    variant: 'destructive',
                                    title: 'WorkExperienceEntry',
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
