import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { StepButtons } from '../StepButtons';
import { useAppSelector } from '@/lib/store/hooks';
import { useEffect, useState } from 'react';
import PillSelectFormField from '../PillSelectFormField';
import { KeyValuePairArray } from '@/lib/type';
import { getStep } from '@/lib/utils/step';
import { CompareText, CompareTextState } from '@/components/compareText/CompareText';
import TextareaFormField from '../TextareaFormField';
import { Button } from '@/components/ui/button';
import { useGenerateHobbiesTextMutation, useImproveHobbiesTextMutation } from '@/lib/store/api/aiApiSlice';
import { StepContainer } from '@/components/StepContainer';
import { useSaveDataMutation } from '@/lib/store/api/databaseApiSlice';
import { AIIcon } from '@/components/AIIcon';
import { TextImprovementDrawer } from '@/components/TextImprovementDrawer';

const hobbyDetailsFormSchema = z.object({
    hobbies: z.array(z.string()).default([]),
    hobbiesText: z.string().default('')
});

type HobbyDetailsFormValues = z.infer<typeof hobbyDetailsFormSchema>;

type HobbyDetailsFormProps = {
    onNext: () => void;
    onPrevious: () => void;
};

const Hobbies = [
    'Sport',
    'Music',
    'Reading',
    'Cooking',
    'Gardening',
    'Crafting',
    'Photography',
    'Painting',
    'Drawing',
    'Writing',
    'Dancing',
    'Singing',
    'Acting',
    'Traveling',
    'Gaming',
    'Volunteering',
    'Collecting',
    'Fishing'
];

export default function HobbyDetailsForm({ onNext, onPrevious }: HobbyDetailsFormProps) {
    const allFieldValues = useAppSelector((state) => state.fieldValues);
    const formHook = useForm<HobbyDetailsFormValues>({
        resolver: zodResolver(hobbyDetailsFormSchema)
    });
    const watchedHobbies = formHook.watch('hobbies');
    const watchedHobbiesText = formHook.watch('hobbiesText');
    const { isDirty } = formHook.formState;
    const step = getStep('hobbies');
    const [compareText, setCompareText] = useState<CompareTextState>();
    const [generateHobbiesText, { isLoading: isGeneratingHobbiesText }] = useGenerateHobbiesTextMutation();
    const [improveHobbiesText] = useImproveHobbiesTextMutation();
    const [saveData] = useSaveDataMutation();

    useEffect(() => {
        if (allFieldValues) {
            formHook.reset({
                hobbies: allFieldValues.hobbies || [],
                hobbiesText: allFieldValues.hobbiesText || ''
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
            formHook.handleSubmit(async (data: HobbyDetailsFormValues) => {
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

    const generateAiText = async () => {
        const newText = await generateHobbiesText({ hobbies: watchedHobbies }).unwrap();
        formHook.setValue('hobbiesText', newText, {
            shouldValidate: true,
            shouldDirty: true
        });
    };

    return (
        <>
            <Form {...formHook}>
                <form onSubmit={onSubmit}>
                    <StepContainer step={step}>
                        <PillSelectFormField
                            formHook={formHook}
                            fieldName='hobbies'
                            availablePills={Hobbies}
                            selectedPills={watchedHobbies}
                            error={formHook.formState.errors.hobbies?.message}
                            customPills={{
                                allow: true,
                                placeholder: 'Add custom hobby'
                            }}
                        />
                        {watchedHobbies?.length === 0 && (
                            <small className='text-gray-500'>
                                Select the hobbies you enjoy. You can also add custom hobbies. AI will generate a text
                                based on your hobbies.
                            </small>
                        )}
                        {watchedHobbiesText?.length === 0 && (
                            <div className='flex flex-col md:flex-row justify-end gap-2 mt-4'>
                                <Button
                                    variant='outline'
                                    disabled={watchedHobbies?.length === 0 || isGeneratingHobbiesText}
                                    onClick={() => generateAiText()}
                                >
                                    <AIIcon />
                                    Generate text with AI
                                </Button>
                            </div>
                        )}
                        <div className='relative'>
                            <TextareaFormField
                                formHook={formHook}
                                fieldName='hobbiesText'
                                placeholder='AI generated text will appear here'
                                rows={watchedHobbiesText?.length > 0 ? 10 : 3}
                            />
                            {watchedHobbiesText && watchedHobbiesText.length > 0 && (
                                <TextImprovementDrawer
                                    originalText={watchedHobbiesText || ''}
                                    onSubmit={(userInput: string, originalText: string) => {
                                        return new Promise<string>(async (resolve, reject) => {
                                            try {
                                                const newText = await improveHobbiesText({
                                                    hobbies: watchedHobbies,
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
                                        formHook.setValue('hobbiesText', text, {
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
