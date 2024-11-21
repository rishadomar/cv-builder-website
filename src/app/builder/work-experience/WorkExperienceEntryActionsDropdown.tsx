import React, { useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import EditWorkExperienceDialog from './EditWorkExperienceDialog';
import DeleteWorkExperienceDialog from './DeleteWorkExperienceDialog';
import { WorkExperienceEntry } from '@/lib/type';
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import { EllipsisVertical, PencilLine, Trash2 } from 'lucide-react';

type WorkExperienceEntryActionsDropdownProps = {
    workExperienceEntry: WorkExperienceEntry;
    setBusyUpdatingList: (v: boolean) => void;
};

const WorkExperienceEntryActionsDropdown: React.FC<WorkExperienceEntryActionsDropdownProps> = ({
    workExperienceEntry,
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
            <EditWorkExperienceDialog
                dialogIsOpen={showUpdateDialog}
                setDialogState={setShowUpdateDialog}
                workExperienceEntryToEdit={workExperienceEntry}
                setBusyUpdating={(v) => setBusyUpdatingList(v)}
            />

            <DeleteWorkExperienceDialog
                dialogIsOpen={showDeleteDialog}
                setDialogState={setShowDeleteDialog}
                workExperienceEntryToDelete={workExperienceEntry}
                setBusyDeleting={(v) => setBusyUpdatingList(v)}
            />
        </>
    );
};

export default WorkExperienceEntryActionsDropdown;
