import React, { useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import EditEducationDialog from './EditEducationDialog';
import DeleteEducationDialog from './DeleteEducationDialog';
import { EducationEntry } from '@/lib/type';
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import { EllipsisVertical, PencilLine, Trash2 } from 'lucide-react';

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
            <EditEducationDialog
                dialogIsOpen={showUpdateDialog}
                setDialogState={setShowUpdateDialog}
                educationEntryToEdit={educationEntry}
                busyUpdating={busyUpdating}
                setBusyUpdating={(v) => setBusyUpdatingList(v)}
            />

            <DeleteEducationDialog
                dialogIsOpen={showDeleteDialog}
                setDialogState={setShowDeleteDialog}
                educationEntryToDelete={educationEntry}
                setBusyDeleting={(v) => setBusyUpdatingList(v)}
            />
        </>
    );
};

export default EducationEntryActionsDropdown;
