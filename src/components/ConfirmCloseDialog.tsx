import { Button } from './ui/button';

type ConfirmCloseDialogProps = {
    onCancel: () => void;
    onClose: () => void;
};

export const ConfirmCloseDialog: React.FC<ConfirmCloseDialogProps> = ({ onCancel, onClose }) => {
    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-4'>
            <div className='bg-white p-4 rounded-lg'>
                <p>Are you sure you want to close? You have unsaved changes.</p>
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
            </div>
        </div>
    );
};
