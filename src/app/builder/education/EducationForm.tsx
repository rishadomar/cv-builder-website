import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import TextFormField from '@/app/builder/TextFormField';
import { useAppSelector } from '@/lib/store/hooks';
import { useUpdateEducationMutation, useAddEducationMutation } from '@/lib/store/api/educationApiSlice';
import { EducationEntry, YearMonth } from '@/lib/type';
import YearMonthFormField from '@/app/builder/YearMonthFormField';
import { Button } from '@/components/ui/button';
import TextareaFormField from '@/app/builder/TextareaFormField';
import { ConfirmCloseDialog } from '@/components/ConfirmCloseDialog';
import { useEffect, useState } from 'react';
import { OverlaySpinner } from '@/components/OverlaySpinner';
import ImproveWithAIButton from '@/components/ImproveWithAIButton';
import { CompareText, CompareTextState } from '@/components/compareText/CompareText';
import { useImproveEducationCommentMutation } from '@/lib/store/api/aiApiSlice';
import { toast } from '@/hooks/use-toast';

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
            year: z.string().optional(),
            month: z.string().optional()
        })
        .default({ year: '', month: '' }),
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
    const formHook = useForm<EducationDetailsFormValues>({
        resolver: zodResolver(educationDetailsFormSchema),
        defaultValues: {
            description: '',
            institution: '',
            graduationDate: { year: '', month: '' },
            location: '',
            subjects: '',
            comment: ''
        }
    });
    const { isDirty } = formHook.formState;
    const watchedDescription = formHook.watch('description');
    const watchedComment = formHook.watch('comment');
    const watchedInstitution = formHook.watch('institution');
    const [confirmClose, setConfirmClose] = useState(false);
    const [compareText, setCompareText] = useState<CompareTextState>();
    const isLoading = useAppSelector((state) => state.loading.isLoading);
    const [improveEducationComment, { isLoading: isImprovingEducationComment }] = useImproveEducationCommentMutation();
    const [updateEducation] = useUpdateEducationMutation();
    const [addEducation] = useAddEducationMutation();

    useEffect(() => {
        if (!educationEntryToEdit) return;
        const graduationDateValue = {
            year: educationEntryToEdit.graduationDate?.year.toString() || '',
            month: educationEntryToEdit.graduationDate?.month.toString() || ''
        };
        const setupData = () => {
            formHook.reset({
                description: educationEntryToEdit.description,
                institution: educationEntryToEdit.institution,
                graduationDate: graduationDateValue,
                location: educationEntryToEdit.location,
                subjects: educationEntryToEdit.subjects,
                comment: educationEntryToEdit.comment
            });
        };

        setTimeout(() => setupData(), 0);
    }, [educationEntryToEdit]);

    function onSubmit(event?: React.BaseSyntheticEvent) {
        const saveValues = async (data: EducationDetailsFormValues) => {
            setBusyUpdating(true);
            let graduationDateValue: YearMonth | undefined = undefined;
            if (
                data.graduationDate?.year &&
                Number(data.graduationDate?.year) > 0 &&
                data.graduationDate?.month &&
                Number(data.graduationDate?.month) >= 0
            ) {
                graduationDateValue = {
                    year: 0,
                    month: 0
                };
                graduationDateValue.year = Number(data.graduationDate.year);
                graduationDateValue.month = Number(data.graduationDate.month);
            }

            const newEducationEntry: EducationEntry = {
                id: educationEntryToEdit?.id || 0,
                description: data.description,
                institution: data.institution,
                graduationDate: graduationDateValue,
                location: data.location,
                subjects: data.subjects,
                comment: data.comment
            };

            if (educationEntryToEdit) {
                await updateEducation({ educationEntry: newEducationEntry }).unwrap();
            } else {
                await addEducation({ educationEntry: newEducationEntry }).unwrap();
            }
            setBusyUpdating(false);
            onClose();
            toast({
                variant: 'default',
                title: 'Success',
                description: 'Successfully saved'
            });
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
                            allowReset
                            description='Leave empty if still studying'
                        />
                        <TextFormField
                            formHook={formHook}
                            label='Location'
                            fieldName='location'
                            placeholder='Eg. Cape Town, South Africa'
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
