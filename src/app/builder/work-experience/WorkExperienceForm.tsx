import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import TextFormField from '@/app/builder/TextFormField';
import { useAppSelector } from '@/lib/store/hooks';
import { WorkExperienceEntry, YearMonth } from '@/lib/type';
import YearMonthFormField from '@/app/builder/YearMonthFormField';
import { Button } from '@/components/ui/button';
import TextareaFormField from '@/app/builder/TextareaFormField';
import ImproveWithAIButton from '@/components/ImproveWithAIButton';
import { useImproveWorkDescriptionTextMutation } from '@/lib/store/api/aiApiSlice';
import { CompareText, CompareTextState } from '@/components/compareText/CompareText';
import { useEffect, useState } from 'react';
import { OverlaySpinner } from '@/components/OverlaySpinner';
import { ConfirmCloseDialog } from '@/components/ConfirmCloseDialog';
import { toast } from '@/hooks/use-toast';
import { useUpdateWorkExperienceMutation, useAddWorkExperienceMutation } from '@/lib/store/api/workExperienceApiSlice';

const workExperienceDetailsFormSchema = z.object({
    company: z
        .string()
        .min(2, {
            message: 'Company must be at least 2 characters.'
        })
        .default(''),
    startDate: z
        .object({
            year: z.string(),
            month: z.string()
        })
        .default({ year: '2000', month: '1' }),
    endDate: z
        .object({
            year: z.string().default('').optional(),
            month: z.string().default('').optional()
        })
        .default({ year: '', month: '' }),
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
    const formHook = useForm<WorkExperienceDetailsFormValues>({
        resolver: zodResolver(workExperienceDetailsFormSchema),
        defaultValues: {
            company: '',
            startDate: { year: '2000', month: '1' },
            endDate: { year: '', month: '' },
            location: '',
            role: '',
            description: ''
        }
    });
    const { isDirty } = formHook.formState;
    const [confirmClose, setConfirmClose] = useState(false);
    const [compareText, setCompareText] = useState<CompareTextState>();
    const watchedDescription = formHook.watch('description');
    const watchedCompany = formHook.watch('company');
    const isLoading = useAppSelector((state) => state.loading.isLoading);
    const [improveWorkDescriptionText, { isLoading: isImprovingWorkDescriptionText }] =
        useImproveWorkDescriptionTextMutation();
    const [addWorkExperience] = useAddWorkExperienceMutation();
    const [updateWorkExperience] = useUpdateWorkExperienceMutation();

    useEffect(() => {
        if (!workExperienceEntryToEdit) {
            return;
        }
        const setupData = () => {
            const startDateValue = {
                year: workExperienceEntryToEdit.startDate?.year?.toString() || '2000',
                month: workExperienceEntryToEdit.startDate?.month?.toString() || '1'
            };

            const endDateValue = {
                year: workExperienceEntryToEdit.endDate?.year?.toString() || '',
                month: workExperienceEntryToEdit.endDate?.month?.toString() || ''
            };

            formHook.reset({
                company: workExperienceEntryToEdit.company,
                startDate: startDateValue,
                endDate: endDateValue,
                location: workExperienceEntryToEdit.location,
                role: workExperienceEntryToEdit.role,
                description: workExperienceEntryToEdit.description
            });

            formHook.trigger();
        };

        setTimeout(() => {
            setupData();
        }, 0);
    }, [formHook, workExperienceEntryToEdit]);

    function onSubmit(event?: React.BaseSyntheticEvent) {
        const saveValues = async (data: WorkExperienceDetailsFormValues) => {
            setBusyUpdating(true);
            const startDateValue = {
                year: 2000,
                month: 1
            };
            if (
                data.startDate?.year &&
                Number(data.startDate?.year) > 0 &&
                data.startDate?.month &&
                Number(data.startDate?.month) >= 0
            ) {
                startDateValue.year = Number(data.startDate.year);
                startDateValue.month = Number(data.startDate.month);
            }

            let endDateValue: YearMonth | undefined = undefined;
            if (
                data.endDate?.year &&
                Number(data.endDate?.year) > 0 &&
                data.endDate?.month &&
                Number(data.endDate?.month) >= 0
            ) {
                endDateValue = {
                    year: 2000,
                    month: 1
                };
                endDateValue.year = Number(data.endDate.year);
                endDateValue.month = Number(data.endDate.month);
            }

            if (workExperienceEntryToEdit) {
                const newWorkExperienceEntry: WorkExperienceEntry = {
                    company: data.company,
                    location: data.location,
                    role: data.role,
                    description: data.description,
                    startDate: startDateValue,
                    endDate: endDateValue,
                    id: workExperienceEntryToEdit.id
                };

                await updateWorkExperience({ workExperienceEntry: newWorkExperienceEntry }).unwrap();
            } else {
                const newWorkExperienceEntry: WorkExperienceEntry = {
                    company: data.company,
                    location: data.location,
                    role: data.role,
                    description: data.description,
                    startDate: startDateValue,
                    endDate: endDateValue,
                    id: 0
                };

                await addWorkExperience({ workExperienceEntry: newWorkExperienceEntry }).unwrap();
            }
            setBusyUpdating(false);
            onClose();
            toast({
                variant: 'default',
                title: 'Success',
                description: 'Successfully saved'
            });
        };

        event?.preventDefault();

        formHook.handleSubmit((data: WorkExperienceDetailsFormValues) => {
            saveValues(data);
        })();
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
                        <YearMonthFormField
                            formHook={formHook}
                            label='End'
                            fieldName='endDate'
                            fieldLayout='compact'
                            allowReset
                            description='Leave blank if still working here. Reset it if you want to clear the end date.'
                        />
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
                            placeholder='Eg. Cape Town, South Africa'
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
                    <div className='pt-4 m-4 flex justify-end'>
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
