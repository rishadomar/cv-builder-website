import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { StepButtons } from '../StepButtons';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { save } from '@/lib/services';
import { useEffect } from 'react';
import PillSelectFormField from '../PillSelectFormField';
import TextFormField from '../TextFormField';
import { KeyValuePairArray } from '@/lib/type';

const hobbyDetailsFormSchema = z.object({
    hobbies: z.array(z.string()).default([]),
    otherHobbies: z.string().default('')
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

    useEffect(() => {
        if (allFieldValues) {
            formHook.reset({
                hobbies: allFieldValues.hobbies || [],
                otherHobbies: allFieldValues.otherHobbies || ''
            });
        }
    }, [allFieldValues, formHook]);

    function onSubmit(event?: React.BaseSyntheticEvent) {
        const submitter = (event?.nativeEvent as SubmitEvent).submitter;
        const submitterName =
            submitter instanceof HTMLButtonElement || submitter instanceof HTMLInputElement
                ? submitter.name
                : undefined;

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

    return (
        <Form {...formHook}>
            <form onSubmit={onSubmit} className='flex flex-col space-y-4'>
                <div className='h-[500px] overflow-auto space-y-4 px-2'>
                    <PillSelectFormField
                        label='Hobbies'
                        fieldName='hobbies'
                        availablePills={Hobbies}
                        selectedPills={formHook.getValues().hobbies}
                        setSelectedPills={(selectedPills) => {
                            formHook.reset({
                                hobbies: selectedPills
                            });
                        }}
                        error={formHook.formState.errors.hobbies?.message}
                    />
                    <TextFormField
                        formHook={formHook}
                        label='Other hobbies'
                        fieldName='otherHobbies'
                        description='Any other hobbies'
                    />
                </div>
                <StepButtons onNext={onNext} onPrevious={onPrevious} />
            </form>
        </Form>
    );
}
