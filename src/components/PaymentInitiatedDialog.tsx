import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';

type PaymentInitiatedDialogProps = {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
};

export const PaymentInitiatedDialog: React.FC<PaymentInitiatedDialogProps> = ({ isOpen, onOpenChange }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className='px-4 max-w-[95%] sm:max-w-lg rounded-lg'>
                <DialogTitle>Not seeing your payment?</DialogTitle>
                <DialogDescription>
                    If you are not seeing your payment after making a successful payment, please wait a minute and
                    refresh.
                </DialogDescription>
                <div className='flex justify-end mt-4'>
                    <Button
                        className='mr-3'
                        variant='secondary'
                        onClick={() => {
                            window.location.reload();
                        }}
                    >
                        Refresh
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
