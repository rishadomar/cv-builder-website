import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import TextFormField from '@/app/builder/TextFormField';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { addEducation, updateEducation } from '@/lib/services';
import { EducationEntry } from '@/lib/type';
import YearMonthFormField from '@/app/builder/YearMonthFormField';
import { Button } from '@/components/ui/button';
import TextareaFormField from '@/app/builder/TextareaFormField';
import { ConfirmCloseDialog } from '@/components/ConfirmCloseDialog';
import { useState } from 'react';
import { OverlaySpinner } from '@/components/OverlaySpinner';
import ImproveWithAIButton from '@/components/ImproveWithAIButton';
import { CompareText, CompareTextState } from '@/components/compareText/CompareText';
import { useImproveEducationCommentMutation } from '@/lib/store/api/aiApiSlice';
import { toast } from '@/hooks/use-toast';
import { CustomError } from '@/lib/utils/customError';

const educationDetailsFormSchema = z.object({
    description: z
        .string()
        .min(2, {
            message: 'Description must be at least 2 characters.'
        })
        .default(''),
    institution: z
        .string()
        .min(2, {
            message: 'Institute must be at least 2 characters.'
        })
        .default(''),
    graduationDate: z
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
    subjects: z
        .string()
        .min(2, {
            message: 'Subjects must be at least 2 characters.'
        })
        .default(''),
    comment: z
        .string()
        .min(2, {
            message: 'Description must be at least 2 characters.'
        })
        .default('')
});

type EducationDetailsFormValues = z.infer<typeof educationDetailsFormSchema>;

interface EducationFormProps {
    educationEntryToEdit?: EducationEntry;
    busyUpdating: boolean;
    setBusyUpdating: (v: boolean) => void;
    onClose: () => void;
}

export default function EducationForm({
    educationEntryToEdit,
    busyUpdating,
    setBusyUpdating,
    onClose
}: EducationFormProps) {
    const dispatch = useAppDispatch();
    const defaultValues: Partial<EducationDetailsFormValues> = {
        description: educationEntryToEdit?.description || '',
        subjects: educationEntryToEdit?.subjects || '',
        institution: educationEntryToEdit?.institution || '',
        graduationDate: educationEntryToEdit?.graduationDate || undefined,
        location: educationEntryToEdit?.location || '',
        comment: educationEntryToEdit?.comment || ''
    };
    const formHook = useForm<EducationDetailsFormValues>({
        resolver: zodResolver(educationDetailsFormSchema),
        defaultValues
    });
    const { isDirty } = formHook.formState;
    const watchedDescription = formHook.watch('description');
    const watchedComment = formHook.watch('comment');
    const watchedInstitution = formHook.watch('institution');
    const [confirmClose, setConfirmClose] = useState(false);
    const [compareText, setCompareText] = useState<CompareTextState>();
    const isLoading = useAppSelector((state) => state.loading.isLoading);
    const [improveEducationComment, { isLoading: isImprovingEducationComment }] = useImproveEducationCommentMutation();

    function onSubmit(event?: React.BaseSyntheticEvent) {
        const saveValues = async (data: EducationDetailsFormValues) => {
            try {
                setBusyUpdating(true);
                if (educationEntryToEdit) {
                    await dispatch(updateEducation({ ...(data as EducationEntry), id: educationEntryToEdit.id }));
                } else {
                    await dispatch(addEducation(data as EducationEntry));
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
                setBusyUpdating(false);
            }
        };

        formHook.handleSubmit((data: EducationDetailsFormValues) => {
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
                            label='Description'
                            fieldName='description'
                            placeholder='Eg. Matric or Bachelor of Arts'
                        />
                        <TextFormField
                            formHook={formHook}
                            label='Institution'
                            fieldName='institution'
                            placeholder='School/College/University name'
                            fieldLayout='compact'
                        />
                        <YearMonthFormField
                            formHook={formHook}
                            label='Graduation date'
                            fieldName='graduationDate'
                            fieldLayout='compact'
                        />
                        <TextFormField
                            formHook={formHook}
                            label='Location'
                            fieldName='location'
                            placeholder='Eg. Lagos, Nigeria'
                            fieldLayout='compact'
                        />
                        <TextareaFormField
                            formHook={formHook}
                            label='Subjects'
                            fieldName='subjects'
                            placeholder='Eg. Mathematics, English, Physics'
                        />
                        <div className='relative'>
                            <TextareaFormField
                                formHook={formHook}
                                label='Comment'
                                fieldName='comment'
                                placeholder='Passed with distinction or Learned a lot about the economy'
                            />
                            <ImproveWithAIButton
                                isBusyImproving={isImprovingEducationComment}
                                isDirty={isDirty}
                                disabled={
                                    watchedDescription?.length === 0 ||
                                    watchedInstitution?.length === 0 ||
                                    watchedComment?.length === 0
                                }
                                onClick={async () => {
                                    const newDescription = await improveEducationComment({
                                        educationDetails: {
                                            description: watchedDescription,
                                            institution: watchedInstitution
                                        },
                                        previousText: watchedComment
                                    }).unwrap();
                                    setCompareText({
                                        previousText: watchedComment,
                                        newText: newDescription,
                                        onAccept: (acceptedText: string) => {
                                            formHook.setValue('comment', acceptedText, {
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
                            type='button'
                            variant='secondary'
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
                    console.log('on close');
                    setConfirmClose(false);
                    onClose();
                }}
            />
            {compareText && <CompareText isOpen={true} setIsOpen={() => setCompareText(undefined)} {...compareText} />}
        </>
    );
}
