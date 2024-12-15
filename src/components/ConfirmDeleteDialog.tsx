import { Button } from './ui/button';

type ConfirmDeleteDialogProps = {
    onCancel: () => void;
    onDelete: () => void;
};

export const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({ onCancel, onDelete }) => {
    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-4'>
            <div className='bg-white p-4 rounded-lg'>
                <p>Are you sure you want to delete this entry?</p>
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
            </div>
        </div>
    );
};
