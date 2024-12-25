import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';

type ConfirmDeleteDialogProps = {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onCancel: () => void;
    onDelete: () => void;
};

export const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({
    isOpen,
    onOpenChange,
    onCancel,
    onDelete
}) => {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className='px-4 max-w-[95%] sm:max-w-lg'>
                <DialogTitle>Are you sure you want to delete this entry?</DialogTitle>
                <DialogDescription>Some description here</DialogDescription>
                <div className='flex justify-end mt-4'>
                    <Button
                        className='mr-3'
                        variant='secondary'
                        onClick={() => {
                            onCancel();
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            onDelete();
                        }}
                    >
                        Delete
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
