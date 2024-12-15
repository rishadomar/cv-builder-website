import React, { useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import EditWorkExperienceDialog from './EditWorkExperienceDialog';
import DeleteWorkExperienceDialog from './DeleteWorkExperienceDialog';
import { WorkExperienceEntry } from '@/lib/type';
import { EllipsisVertical, PencilLine, Trash2 } from 'lucide-react';

type WorkExperienceEntryActionsDropdownProps = {
    workExperienceEntry: WorkExperienceEntry;
    busyUpdatingList: boolean;
    setBusyUpdatingList: (v: boolean) => void;
};

const WorkExperienceEntryActionsDropdown: React.FC<WorkExperienceEntryActionsDropdownProps> = ({
    workExperienceEntry,
    busyUpdatingList,
    setBusyUpdatingList
}) => {
    const [showUpdateDialog, setShowUpdateDialog] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

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
            <EditWorkExperienceDialog
                dialogIsOpen={showUpdateDialog}
                setDialogState={setShowUpdateDialog}
                workExperienceEntryToEdit={workExperienceEntry}
                busyUpdating={busyUpdatingList}
                setBusyUpdating={(v) => setBusyUpdatingList(v)}
            />

            <DeleteWorkExperienceDialog
                dialogIsOpen={showDeleteDialog}
                setDialogState={setShowDeleteDialog}
                workExperienceEntryToDelete={workExperienceEntry}
                setBusyDeleting={(v) => setBusyUpdatingList(v)}
            />
        </div>
    );
};

export default WorkExperienceEntryActionsDropdown;
