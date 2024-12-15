import React, { useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { EducationEntry } from '@/lib/type';
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import { EllipsisVertical, PencilLine, Trash2 } from 'lucide-react';
import EducationForm from './EducationForm';
import { DrawerDialog } from '@/components/DrawerDialog';
import { ConfirmDeleteDialog } from '@/components/ConfirmDeleteDialog';
import { useAppDispatch } from '@/lib/store/hooks';
import { toast } from 'react-toastify';
import { deleteEducation } from '@/lib/services';

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
    const dispatch = useAppDispatch();

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <span>
                        <EllipsisVertical className='w-6 h-6 text-gray-600 cursor-pointer' />
                    </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuGroup>
                        <DropdownMenuItem onSelect={() => setShowUpdateDialog(!showUpdateDialog)}>
                            <PencilLine />
                            <span>Update</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem onSelect={() => setShowDeleteDialog(!showDeleteDialog)}>
                            <Trash2 className='text-red-500' />
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
            {showDeleteDialog && (
                <ConfirmDeleteDialog
                    onCancel={() => setShowDeleteDialog(false)}
                    onDelete={async () => {
                        setBusyUpdatingList(true);
                        await dispatch(deleteEducation(educationEntry));
                        toast.success('Successfully deleted');
                        setBusyUpdatingList(false);
                        setShowDeleteDialog(false);
                    }}
                />
            )}
        </>
    );
};

export default EducationEntryActionsDropdown;
