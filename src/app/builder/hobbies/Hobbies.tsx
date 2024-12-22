import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { save } from '@/lib/services';
import { StepButtons } from '../StepButtons';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { useEffect, useState } from 'react';
import PillSelectFormField from '../PillSelectFormField';
import { KeyValuePairArray } from '@/lib/type';
import { getStep } from '@/lib/utils/step';
import { Sparkles } from 'lucide-react';
import { CompareText, CompareTextState } from '@/components/compareText/CompareText';
import { setFieldValue } from '@/lib/store/fieldValues/fieldValuesSlice';
import TextareaFormField from '../TextareaFormField';
import { Button } from '@/components/ui/button';
import { useGenerateHobbiesTextMutation, useImproveHobbiesTextMutation } from '@/lib/store/api/aiApiSlice';
import { StepContainer } from '../StepContainer';
import ImproveWithAIButton from '@/components/ImproveWithAIButton';

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
    const dispatch = useAppDispatch();
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
    const [improveHobbiesText, { isLoading: isImprovingHobbiesText }] = useImproveHobbiesTextMutation();

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
                await dispatch(save(data as KeyValuePairArray));
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
        dispatch(setFieldValue({ field: 'hobbiesText', value: newText }));
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
                        <small className='text-gray-500'>
                            Select the hobbies you enjoy. You can also add custom hobbies. The AI will generate a text
                            based on your hobbies.
                        </small>
                        {watchedHobbiesText?.length === 0 && (
                            <div className='flex flex-col md:flex-row justify-end gap-2 mt-4'>
                                <Button
                                    variant='outline'
                                    disabled={watchedHobbies?.length === 0 || isGeneratingHobbiesText}
                                    onClick={() => generateAiText()}
                                >
                                    <Sparkles className='mr-2 h-5 w-5' />
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
                            <ImproveWithAIButton
                                isBusyImproving={isGeneratingHobbiesText || isImprovingHobbiesText}
                                disabled={!watchedHobbiesText || watchedHobbiesText.length === 0}
                                isDirty={isDirty}
                                onClick={async () => {
                                    const newText = await improveHobbiesText({
                                        hobbies: watchedHobbies,
                                        previousText: watchedHobbiesText
                                    }).unwrap();
                                    setCompareText({
                                        previousText: watchedHobbiesText,
                                        newText,
                                        onAccept: (acceptedText: string) => {
                                            formHook.setValue('hobbiesText', acceptedText, {
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
