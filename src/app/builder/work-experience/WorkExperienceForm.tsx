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
import { useToast } from '@/hooks/use-toast';
import { ImproveWithAIButton } from '@/components/ImproveWithAIButton';
import { useImproveWorkDescriptionTextMutation } from '@/lib/store/api/aiApiSlice';
import { CompareText, CompareTextState } from '@/components/compareText/CompareText';
import { useState } from 'react';

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
    setBusyUpdating: (v: boolean) => void;
    onClose: () => void;
}

export default function WorkExperienceForm({
    workExperienceEntryToEdit,
    setBusyUpdating,
    onClose
}: WorkExperienceFormProps) {
    const dispatch = useAppDispatch();
    const { toast } = useToast();
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
    const [compareText, setCompareText] = useState<CompareTextState>();
    const watchedDescription = formHook.watch('description');
    const watchedCompany = formHook.watch('company');
    const isLoading = useAppSelector((state) => state.loading.isLoading);
    const [improveWorkDescriptionText, { isLoading: isImprovingWorkDescriptionText }] =
        useImproveWorkDescriptionTextMutation();

    function onSubmit(event?: React.BaseSyntheticEvent) {
        const saveValues = async (data: WorkExperienceDetailsFormValues) => {
            try {
                console.log('Set busy adding to true', data);
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
                    title: 'WorkExperienceEntry',
                    description: 'Successfully saved'
                });
            } catch (error) {
                console.error('Error saving work experience', error);
                toast({
                    variant: 'destructive',
                    title: 'WorkExperienceEntry',
                    description: 'Failed to save'
                });
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

    console.log('watchedDescription', watchedDescription);
    return (
        <>
            <Form {...formHook}>
                {/* {busySaving && <OverlaySpinner />} */}
                <form onSubmit={onSubmit} className='flex flex-col bg-white'>
                    <div className='xs:max-w-[400px] max-h-[500px] overflow-auto space-y-4 px-2'>
                        <TextFormField
                            formHook={formHook}
                            label='Company'
                            fieldName='company'
                            placeholder='Company name'
                        />
                        <YearMonthFormField formHook={formHook} label='Start date' fieldName='startDate' />
                        <YearMonthFormField formHook={formHook} label='End date' fieldName='endDate' />
                        <TextFormField
                            formHook={formHook}
                            label='Role'
                            fieldName='role'
                            placeholder='Eg. Intern, Software Engineer'
                        />
                        <TextFormField
                            formHook={formHook}
                            label='Location'
                            fieldName='location'
                            placeholder='Eg. Lagos, Nigeria'
                        />
                        <div className='relative'>
                            <TextareaFormField
                                formHook={formHook}
                                label='Description'
                                fieldName='description'
                                placeholder='Eg. I was responsible for...'
                            />
                            <ImproveWithAIButton
                                disabled={watchedDescription.length === 0 || isImprovingWorkDescriptionText}
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
                    <div className='mt-4 flex justify-end'>
                        <Button type='submit' disabled={isLoading}>
                            Save
                        </Button>
                    </div>
                </form>
            </Form>
            {compareText && <CompareText isOpen={true} setIsOpen={() => setCompareText(undefined)} {...compareText} />}
        </>
    );
}
