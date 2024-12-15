import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';

type ConfirmCloseDialogProps = {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onCancel: () => void;
    onClose: () => void;
};

export const ConfirmCloseDialog: React.FC<ConfirmCloseDialogProps> = ({ isOpen, onOpenChange, onCancel, onClose }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className='px-4'>
                <DialogTitle>Are you sure you want to close this entry?</DialogTitle>
                <DialogDescription>You may lose any unsaved changes</DialogDescription>
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
                            onClose();
                        }}
                    >
                        Close
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
