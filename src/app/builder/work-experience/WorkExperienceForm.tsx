import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import TextFormField from '@/app/builder/TextFormField';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { addWorkExperience, updateWorkExperience } from '@/lib/services';
import { WorkExperienceEntry } from '@/lib/type';
import YearMonthFormField from '@/app/builder/YearMonthFormField';
import { Button } from '@/components/ui/button';
import TextareaFormField from '@/app/builder/TextareaFormField';
import ImproveWithAIButton from '@/components/ImproveWithAIButton';
import { useImproveWorkDescriptionTextMutation } from '@/lib/store/api/aiApiSlice';
import { CompareText, CompareTextState } from '@/components/compareText/CompareText';
import { useState } from 'react';
import { OverlaySpinner } from '@/components/OverlaySpinner';
import { ConfirmCloseDialog } from '@/components/ConfirmCloseDialog';
import { toast } from '@/hooks/use-toast';
import { CustomError } from '@/lib/utils/customError';

const workExperienceDetailsFormSchema = z.object({
    company: z
        .string()
        .min(2, {
            message: 'Company must be at least 2 characters.'
        })
        .default(''),
    startDate: z
        .object({
            year: z.number(),
            month: z.number()
        })
        .default({ year: 2000, month: 1 }),
    endDate: z
        .object({
            year: z.number().optional(),
            month: z.number().optional()
        })
        .optional(),
    location: z
        .string()
        .min(2, {
            message: 'Location must be at least 2 characters.'
        })
        .default(''),
    role: z
        .string()
        .min(2, {
            message: 'Role must be at least 2 characters.'
        })
        .default(''),
    description: z
        .string()
        .min(2, {
            message: 'Description must be at least 2 characters.'
        })
        .default('')
});

type WorkExperienceDetailsFormValues = z.infer<typeof workExperienceDetailsFormSchema>;

interface WorkExperienceFormProps {
    workExperienceEntryToEdit?: WorkExperienceEntry;
    busyUpdating: boolean;
    setBusyUpdating: (v: boolean) => void;
    onClose: () => void;
}

export default function WorkExperienceForm({
    workExperienceEntryToEdit,
    busyUpdating,
    setBusyUpdating,
    onClose
}: WorkExperienceFormProps) {
    const dispatch = useAppDispatch();
    const defaultValues: Partial<WorkExperienceDetailsFormValues> = {
        company: workExperienceEntryToEdit?.company || '',
        startDate: workExperienceEntryToEdit?.startDate,
        endDate: workExperienceEntryToEdit?.endDate || undefined,
        location: workExperienceEntryToEdit?.location || '',
        role: workExperienceEntryToEdit?.role || '',
        description: workExperienceEntryToEdit?.description || ''
    };
    const formHook = useForm<WorkExperienceDetailsFormValues>({
        resolver: zodResolver(workExperienceDetailsFormSchema),
        defaultValues
    });
    const { isDirty } = formHook.formState;
    const [confirmClose, setConfirmClose] = useState(false);
    const [compareText, setCompareText] = useState<CompareTextState>();
    const watchedDescription = formHook.watch('description');
    const watchedCompany = formHook.watch('company');
    const isLoading = useAppSelector((state) => state.loading.isLoading);
    const [improveWorkDescriptionText, { isLoading: isImprovingWorkDescriptionText }] =
        useImproveWorkDescriptionTextMutation();

    function onSubmit(event?: React.BaseSyntheticEvent) {
        const saveValues = async (data: WorkExperienceDetailsFormValues) => {
            try {
                setBusyUpdating(true);
                if (workExperienceEntryToEdit) {
                    await dispatch(
                        updateWorkExperience({ ...(data as WorkExperienceEntry), id: workExperienceEntryToEdit.id })
                    );
                } else {
                    await dispatch(addWorkExperience(data as WorkExperienceEntry));
                }
                onClose();
                toast({
                    variant: 'default',
                    title: 'Success',
                    description: 'Successfully saved'
                });
            } catch (error) {
                if (error instanceof CustomError) {
                    toast({
                        variant: 'destructive',
                        title: 'Error',
                        description: error.message
                    });
                } else {
                    toast({
                        variant: 'destructive',
                        title: 'Error',
                        description: 'An unexpected error occurred. Please try again.'
                    });
                }
            } finally {
                console.log('Set busy adding to false');
                setBusyUpdating(false);
            }
        };

        formHook.handleSubmit((data: WorkExperienceDetailsFormValues) => {
            saveValues(data);
        })();

        event?.preventDefault();
    }

    return (
        <>
            <Form {...formHook}>
                {busyUpdating && <OverlaySpinner />}
                <form onSubmit={onSubmit} className='flex flex-col bg-white'>
                    <div className='xs:max-w-[400px] max-h-[500px] overflow-auto space-y-4 px-2'>
                        <TextFormField
                            formHook={formHook}
                            label='Company'
                            fieldName='company'
                            placeholder='Company name'
                        />
                        <YearMonthFormField
                            formHook={formHook}
                            label='Start'
                            fieldName='startDate'
                            fieldLayout='compact'
                        />
                        <YearMonthFormField formHook={formHook} label='End' fieldName='endDate' fieldLayout='compact' />
                        <TextFormField
                            formHook={formHook}
                            label='Role'
                            fieldName='role'
                            placeholder='Eg. Intern, Software Engineer'
                            fieldLayout='compact'
                        />
                        <TextFormField
                            formHook={formHook}
                            label='Location'
                            fieldName='location'
                            placeholder='Eg. Lagos, Nigeria'
                            fieldLayout='compact'
                        />
                        <div className='relative'>
                            <TextareaFormField
                                formHook={formHook}
                                label='Description'
                                fieldName='description'
                                placeholder='Eg. I was responsible for...'
                            />
                            <ImproveWithAIButton
                                isBusyImproving={isImprovingWorkDescriptionText}
                                disabled={!watchedDescription || watchedDescription.length === 0}
                                isDirty={isDirty}
                                onClick={async () => {
                                    const newDescription = await improveWorkDescriptionText({
                                        workDetails: { company: watchedCompany },
                                        previousText: watchedDescription
                                    }).unwrap();
                                    setCompareText({
                                        previousText: watchedDescription,
                                        newText: newDescription,
                                        onAccept: (acceptedText: string) => {
                                            formHook.setValue('description', acceptedText, {
                                                shouldValidate: true,
                                                shouldDirty: true
                                            });
                                            setCompareText(undefined);
                                        },
                                        onReject: () => {
                                            setCompareText(undefined);
                                        }
                                    });
                                }}
                            />
                        </div>
                    </div>
                    <div className='m-4 flex justify-end'>
                        <Button
                            className='mr-3'
                            variant='secondary'
                            type='button'
                            onClick={() => {
                                if (isDirty) {
                                    setConfirmClose(true);
                                } else {
                                    onClose();
                                }
                            }}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button type='submit' disabled={isLoading}>
                            Save
                        </Button>
                    </div>
                </form>
            </Form>

            <ConfirmCloseDialog
                isOpen={confirmClose}
                onOpenChange={setConfirmClose}
                onCancel={() => setConfirmClose(false)}
                onClose={() => {
                    setConfirmClose(false);
                    onClose();
                }}
            />
            {compareText && <CompareText isOpen={true} setIsOpen={() => setCompareText(undefined)} {...compareText} />}
        </>
    );
}
