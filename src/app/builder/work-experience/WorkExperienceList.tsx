import { StepButtons } from '../StepButtons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import AddWorkExperienceDialog from './AddWorkExperienceDialog';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { getStep } from '@/lib/utils/step';
import { WorkExperienceItem } from './WorkExperienceItem';
import { StepContainer } from '../StepContainer';
import { Button } from '@/components/ui/button';
import { useExtractTopSkillsMutation } from '@/lib/store/api/aiApiSlice';
import { save } from '@/lib/services';
import { KeyValuePairArray } from '@/lib/type';
import { Sparkles } from 'lucide-react';
import TextareaFormField from '../TextareaFormField';
import ImproveWithAIButton from '@/components/ImproveWithAIButton';
import { CompareText, CompareTextState } from '@/components/compareText/CompareText';

const topSkillsFormSchema = z.object({
    topSkills: z.string().default('')
});

type TopSkillsFormValues = z.infer<typeof topSkillsFormSchema>;

type WorkExperienceListProps = {
    onNext: () => void;
    onPrevious: () => void;
};

export default function WorkExperienceList({ onNext, onPrevious }: WorkExperienceListProps) {
    const dispatch = useAppDispatch();
    const allFieldValues = useAppSelector((state) => state.fieldValues);
    const [compareText, setCompareText] = useState<CompareTextState>();
    const defaultValues: Partial<TopSkillsFormValues> = {
        topSkills: ''
    };
    const formHook = useForm<TopSkillsFormValues>({
        resolver: zodResolver(topSkillsFormSchema),
        defaultValues
    });
    const watchedTopSkills = formHook.watch('topSkills');
    const { isDirty } = formHook.formState;

    const workExperienceEntries = useAppSelector((state) => state.fieldValues.workExperiences);
    const [busyUpdatingList, setBusyUpdatingList] = useState(false);
    const step = getStep('work-experience');
    const [extractTopSkills] = useExtractTopSkillsMutation();

    useEffect(() => {
        if (allFieldValues) {
            formHook.reset({
                topSkills: allFieldValues.topSkills || ''
            });
        }
    }, [allFieldValues, formHook]);

    async function onSubmit(event?: React.BaseSyntheticEvent) {
        event?.preventDefault(); // Prevent form submission immediately

        const submitter = (event?.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;
        const submitterName = submitter?.name;

        const saveValues = async (data: unknown) => {
            if (isDirty) {
                await dispatch(save(data as KeyValuePairArray));
            }
        };

        if (onNext && submitterName === 'next') {
            formHook.handleSubmit(async (data: TopSkillsFormValues) => {
                await saveValues(data);
                onNext();
            })();
        } else if (onPrevious && submitterName === 'previous') {
            const data = formHook.getValues();
            await saveValues(data);
            onPrevious();
        }

        event?.preventDefault();
    }

    return (
        <>
            <Form {...formHook}>
                <form onSubmit={onSubmit}>
                    <StepContainer step={step}>
                        {workExperienceEntries &&
                            workExperienceEntries.map((workExperienceEntry, index) => (
                                <WorkExperienceItem
                                    key={index}
                                    workExperienceEntry={workExperienceEntry}
                                    busyUpdatingList={busyUpdatingList}
                                    setBusyUpdatingList={setBusyUpdatingList}
                                    collapseDescription={true}
                                    editable={true}
                                />
                            ))}

                        <div className='flex justify-center my-4'>
                            <AddWorkExperienceDialog
                                busyUpdating={busyUpdatingList}
                                setBusyUpdating={(v) => setBusyUpdatingList(v)}
                            />
                        </div>

                        {!watchedTopSkills ||
                            (watchedTopSkills.length === 0 && (
                                <small className='text-gray-500'>
                                    Add work experiences and ask AI to help identify your Top skills.
                                </small>
                            ))}

                        {watchedTopSkills?.length === 0 && (
                            <div className='flex flex-col md:flex-row justify-end gap-2 mt-4'>
                                <Button
                                    variant='outline'
                                    disabled={workExperienceEntries?.length === 0}
                                    onClick={async () => {
                                        const topSkills = await extractTopSkills({
                                            previousText: watchedTopSkills ?? ''
                                        }).unwrap();
                                        formHook.setValue('topSkills', topSkills, {
                                            shouldValidate: true,
                                            shouldDirty: true
                                        });
                                    }}
                                >
                                    <Sparkles className='mr-2 h-5 w-5' />
                                    Generate your Top skills using AI
                                </Button>
                            </div>
                        )}

                        <div className='relative'>
                            <TextareaFormField
                                formHook={formHook}
                                fieldName='topSkills'
                                label='Top skills'
                                placeholder='AI generated text will appear here'
                                rows={watchedTopSkills?.length > 0 ? 10 : 3}
                            />
                            <ImproveWithAIButton
                                isBusyImproving={false}
                                disabled={!watchedTopSkills || watchedTopSkills.length === 0}
                                isDirty={isDirty}
                                onClick={async () => {
                                    const newDescription = await extractTopSkills({
                                        previousText: watchedTopSkills
                                    }).unwrap();
                                    setCompareText({
                                        previousText: watchedTopSkills,
                                        newText: newDescription,
                                        onAccept: (acceptedText: string) => {
                                            formHook.setValue('topSkills', acceptedText, {
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
                    </StepContainer>

                    <StepButtons onNext={onNext} onPrevious={onPrevious} />
                </form>
            </Form>
            {compareText && <CompareText isOpen={true} setIsOpen={() => setCompareText(undefined)} {...compareText} />}
        </>
    );
}
