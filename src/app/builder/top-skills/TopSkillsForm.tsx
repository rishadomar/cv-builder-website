import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { StepButtons } from '../StepButtons';
import { useAppSelector } from '@/lib/store/hooks';
import { KeyValuePairArray } from '@/lib/type';
import { getStep } from '@/lib/utils/step';
import { StepContainer } from '@/components/StepContainer';
import { CompareText, CompareTextState } from '@/components/compareText/CompareText';
import { useExtractTopSkillsMutation, useImproveTopSkillsMutation } from '@/lib/store/api/aiApiSlice';
import { Button } from '@/components/ui/button';
import TextareaFormField from '../TextareaFormField';
import { useSaveDataMutation } from '@/lib/store/api/databaseApiSlice';
import { AIIcon } from '@/components/AIIcon';
import { TextImprovementDrawer } from '@/components/TextImprovementDrawer';

const topSkillsFormSchema = z.object({
    topSkills: z.string().default('')
});

type TopSkillsFormValues = z.infer<typeof topSkillsFormSchema>;

type TopSkillsFormProps = {
    onNext?: () => void;
    onPrevious: () => void;
};

export default function TopSkillsForm({ onNext, onPrevious }: TopSkillsFormProps) {
    const [saveData] = useSaveDataMutation();
    const allFieldValues = useAppSelector((state) => state.fieldValues);
    const workExperienceEntries = useAppSelector((state) => state.fieldValues.workExperiences);
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
    const step = getStep('top-skills');
    const [extractTopSkills] = useExtractTopSkillsMutation();
    const [improveTopSkills] = useImproveTopSkillsMutation();
    const [busyGeneratingTopSkills, setBusyGeneratingTopSkills] = useState(false);

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
                await saveData({ data: data as KeyValuePairArray }).unwrap();
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
                        {watchedTopSkills?.length === 0 && (
                            <div className='flex flex-col md:flex-row justify-end gap-2 mt-4'>
                                <Button
                                    variant='outline'
                                    disabled={workExperienceEntries?.length === 0 || busyGeneratingTopSkills}
                                    onClick={async () => {
                                        try {
                                            setBusyGeneratingTopSkills(true);
                                            const topSkills = await extractTopSkills({
                                                previousText: watchedTopSkills ?? ''
                                            }).unwrap();
                                            formHook.setValue('topSkills', topSkills, {
                                                shouldValidate: true,
                                                shouldDirty: true
                                            });
                                        } finally {
                                            setBusyGeneratingTopSkills(false);
                                        }
                                    }}
                                >
                                    <AIIcon />
                                    Generate your Top skills using AI
                                </Button>
                            </div>
                        )}

                        <div className='relative'>
                            <TextareaFormField
                                formHook={formHook}
                                fieldName='topSkills'
                                placeholder='AI generated text will appear here'
                                rows={watchedTopSkills?.length > 0 ? 20 : 3}
                            />
                            {watchedTopSkills?.length > 0 && (
                                <TextImprovementDrawer
                                    originalText={watchedTopSkills || ''}
                                    onSubmit={(userInput: string, originalText: string) => {
                                        return new Promise<string>(async (resolve, reject) => {
                                            try {
                                                const newText = await improveTopSkills({
                                                    previousText: originalText,
                                                    userInput: userInput
                                                }).unwrap();
                                                resolve(newText);
                                            } catch (error) {
                                                reject(error);
                                            }
                                        });
                                    }}
                                    onSave={(text: string) => {
                                        formHook.setValue('topSkills', text, {
                                            shouldValidate: true,
                                            shouldDirty: true
                                        });
                                    }}
                                    triggerButtonText='Improve with AI'
                                />
                            )}
                        </div>
                    </StepContainer>
                    <StepButtons onNext={onNext} onPrevious={onPrevious} />
                </form>
            </Form>
            {compareText && <CompareText isOpen={true} setIsOpen={() => setCompareText(undefined)} {...compareText} />}
        </>
    );
}
