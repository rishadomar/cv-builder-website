import React, { useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { WorkExperienceEntry } from '@/lib/type';
import { EllipsisVertical, PencilLine, Trash2 } from 'lucide-react';
import { DrawerDialog } from '@/components/DrawerDialog';
import WorkExperienceForm from './WorkExperienceForm';
import { ConfirmDeleteDialog } from '@/components/ConfirmDeleteDialog';
import { deleteWorkExperience } from '@/lib/services';
import { toast } from 'react-toastify';
import { useAppDispatch } from '@/lib/store/hooks';

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
    const dispatch = useAppDispatch();

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
                title='Update Work Experience'
                content={
                    <WorkExperienceForm
                        workExperienceEntryToEdit={workExperienceEntry}
                        setBusyUpdating={setBusyUpdatingList}
                        busyUpdating={busyUpdatingList}
                        onClose={() => setShowUpdateDialog(false)}
                    />
                }
            />

            <ConfirmDeleteDialog
                isOpen={showDeleteDialog}
                onOpenChange={setShowDeleteDialog}
                onCancel={() => setShowDeleteDialog(false)}
                onDelete={async () => {
                    setBusyUpdatingList(true);
                    await dispatch(deleteWorkExperience(workExperienceEntry));
                    toast.success('Successfully deleted');
                    setBusyUpdatingList(false);
                    setShowDeleteDialog(false);
                }}
            />
        </div>
    );
};

export default WorkExperienceEntryActionsDropdown;
