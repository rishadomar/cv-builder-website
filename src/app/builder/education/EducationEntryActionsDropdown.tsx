import React, { useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { EducationEntry } from '@/lib/type';
import { EllipsisVertical, PencilLine, Trash2 } from 'lucide-react';
import EducationForm from './EducationForm';
import { DrawerDialog } from '@/components/DrawerDialog';
import { ConfirmDeleteDialog } from '@/components/ConfirmDeleteDialog';
import { toast } from '@/hooks/use-toast';
import { useDeleteEducationMutation } from '@/lib/store/api/educationApiSlice';

type EducationEntryActionsDropdownProps = {
    educationEntry: EducationEntry;
    busyUpdating: boolean;
    setBusyUpdatingList: (v: boolean) => void;
};

const EducationEntryActionsDropdown: React.FC<EducationEntryActionsDropdownProps> = ({
    educationEntry,
    busyUpdating,
    setBusyUpdatingList
}) => {
    const [showUpdateDialog, setShowUpdateDialog] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [deleteEducation] = useDeleteEducationMutation();

    return (
        <div className='relative'>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className='inline-flex items-center justify-center'>
                        <EllipsisVertical className='w-6 h-6 text-gray-600 cursor-pointer' />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                    <DropdownMenuGroup>
                        <DropdownMenuItem
                            className='flex items-center gap-2'
                            onSelect={() => setShowUpdateDialog(!showUpdateDialog)}
                        >
                            <PencilLine className='w-4 h-4' />
                            <span>Update</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem
                            className='flex items-center gap-2'
                            onSelect={() => setShowDeleteDialog(!showDeleteDialog)}
                        >
                            <Trash2 className='w-4 h-4 text-red-500' />
                            <span className='text-red-500'>Delete</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>

            <DrawerDialog
                isOpen={showUpdateDialog}
                setIsOpen={setShowUpdateDialog}
                title='Education specification'
                content={
                    <EducationForm
                        educationEntryToEdit={educationEntry}
                        busyUpdating={busyUpdating}
                        setBusyUpdating={setBusyUpdatingList}
                        onClose={() => setShowUpdateDialog(false)}
                    />
                }
            />
            <ConfirmDeleteDialog
                isOpen={showDeleteDialog}
                onOpenChange={setShowDeleteDialog}
                onCancel={() => setShowDeleteDialog(false)}
                onDelete={async () => {
                    try {
                        setShowDeleteDialog(false);
                        setBusyUpdatingList(true);
                        const result = await deleteEducation({ educationEntry }).unwrap();
                        console.log('Delete operation result:', result);
                        toast({
                            variant: 'default',
                            title: 'Success',
                            description: 'Successfully deleted'
                        });
                    } catch (error) {
                        console.error('Error deleting education in dialog:', error);
                    } finally {
                        setBusyUpdatingList(false);
                    }
                }}
            />
        </div>
    );
};

export default EducationEntryActionsDropdown;
