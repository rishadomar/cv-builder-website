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
import StepHeader from '../StepHeader';
import { Loader, LucideIcon, RefreshCw, Sparkles, Wand2 } from 'lucide-react';
import { CompareText, CompareTextState } from '@/components/compareText/CompareText';
import { setFieldValue } from '@/lib/store/fieldValues/fieldValuesSlice';
import TextareaFormField from '../TextareaFormField';
import { Button } from '@/components/ui/button';
import { useGenerateHobbiesTextMutation, useImproveHobbiesTextMutation } from '@/lib/store/api/aiApiSlice';

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

    function onSubmit(event?: React.BaseSyntheticEvent) {
        const submitter = (event?.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;
        const submitterName = submitter?.name;

        const saveValues = (data: unknown) => {
            dispatch(save(data as KeyValuePairArray));
        };

        if (onNext && submitterName === 'next') {
            formHook.handleSubmit((data: HobbyDetailsFormValues) => {
                saveValues(data);
                onNext();
            })();
        } else if (onPrevious && submitterName === 'previous') {
            const data = formHook.getValues();
            saveValues(data);
            onPrevious();
        }

        event?.preventDefault();
    }

    const generateAiText = async () => {
        try {
            const newText = await generateHobbiesText({ hobbies: watchedHobbies }).unwrap();
            if (watchedHobbies && watchedHobbiesText.length > 0) {
                setCompareText({
                    previousText: watchedHobbiesText,
                    newText: newText,
                    onAccept: (acceptedText: string) => {
                        dispatch(setFieldValue({ field: 'hobbiesText', value: acceptedText }));
                        setCompareText(undefined);
                    },
                    onReject: () => {
                        setCompareText(undefined);
                    }
                });
            } else {
                dispatch(setFieldValue({ field: 'hobbiesText', value: newText }));
            }
        } catch {}
    };

    const improveAiText = async () => {
        try {
            const newText = await improveHobbiesText({
                hobbies: watchedHobbies,
                previousText: watchedHobbiesText
            }).unwrap();
            if (watchedHobbies && watchedHobbiesText.length > 0) {
                setCompareText({
                    previousText: watchedHobbiesText,
                    newText: newText,
                    onAccept: (acceptedText: string) => {
                        dispatch(setFieldValue({ field: 'hobbiesText', value: acceptedText }));
                        setCompareText(undefined);
                    },
                    onReject: () => {
                        setCompareText(undefined);
                    }
                });
            } else {
                dispatch(setFieldValue({ field: 'hobbiesText', value: newText }));
            }
        } catch {}
    };

    return (
        <>
            <Form {...formHook}>
                <form onSubmit={onSubmit}>
                    <div className='h-[calc(100vh-theme(spacing.16)-theme(spacing.20))] overflow-y-auto'>
                        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4'>
                            <StepHeader icon={step?.icon as LucideIcon} title={step?.title ?? ''} />
                            <PillSelectFormField
                                fieldName='hobbies'
                                availablePills={Hobbies}
                                selectedPills={watchedHobbies}
                                setSelectedPills={(selectedPills) => {
                                    formHook.setValue('hobbies', selectedPills);
                                }}
                                error={formHook.formState.errors.hobbies?.message}
                                customPills={{
                                    allow: true,
                                    placeholder: 'Add custom hobby'
                                }}
                            />
                            <div className='relative'>
                                <TextareaFormField
                                    formHook={formHook}
                                    fieldName='hobbiesText'
                                    placeholder='AI generated text will appear here'
                                    rows={watchedHobbiesText && watchedHobbiesText.length > 0 ? 10 : 3}
                                />
                                {(isGeneratingHobbiesText || isImprovingHobbiesText) && (
                                    <div className='absolute inset-0 flex items-center justify-center bg-white bg-opacity-75'>
                                        <Loader className='w-6 h-6 animate-spin' />
                                    </div>
                                )}
                            </div>
                            <div className='flex flex-col md:flex-row justify-end gap-2 mt-4'>
                                <Button
                                    variant='outline'
                                    disabled={isGeneratingHobbiesText}
                                    onClick={() => generateAiText()}
                                >
                                    {watchedHobbiesText && watchedHobbiesText.length > 0 ? (
                                        <RefreshCw className='mr-2 h-5 w-5' />
                                    ) : (
                                        <Sparkles className='mr-2 h-5 w-5' />
                                    )}
                                    {watchedHobbiesText && watchedHobbiesText.length > 0
                                        ? 'Generate new text with AI'
                                        : 'Generate text with AI'}
                                </Button>
                                <Button
                                    variant='outline'
                                    disabled={
                                        isImprovingHobbiesText || !watchedHobbiesText || watchedHobbiesText.length === 0
                                    }
                                    onClick={() => improveAiText()}
                                >
                                    <Wand2 className='mr-2 h-5 w-5' />
                                    Improve with AI
                                </Button>
                            </div>{' '}
                        </div>
                    </div>
                    <StepButtons onNext={onNext} onPrevious={onPrevious} />
                </form>
            </Form>
            {compareText && <CompareText isOpen={true} setIsOpen={() => setCompareText(undefined)} {...compareText} />}
        </>
    );
}
