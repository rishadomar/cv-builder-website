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
import { toast } from '@/hooks/use-toast';
import { useDeleteWorkExperienceMutation } from '@/lib/store/api/workExperienceApiSlice';

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
    const [deleteWorkExperience] = useDeleteWorkExperienceMutation();

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
                    try {
                        setShowDeleteDialog(false);
                        setBusyUpdatingList(true);
                        await deleteWorkExperience({ workExperienceEntry }).unwrap();
                        toast({
                            variant: 'default',
                            title: 'Success',
                            description: 'Successfully deleted the work experience'
                        });
                    } catch (error) {
                    } finally {
                        setBusyUpdatingList(false);
                    }
                }}
            />
        </div>
    );
};

export default WorkExperienceEntryActionsDropdown;
