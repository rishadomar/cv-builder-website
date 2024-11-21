import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { z } from 'zod';
import { StepButtons } from '../StepButtons';
import TextFormField from '../TextFormField';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { save } from '@/lib/services';
import YesNoFormField from '../YesNoFormField';
import { useEffect } from 'react';
import { KeyValuePairArray } from '@/lib/type';

const locationDetailsFormSchema = z.object({
    country: z
        .string()
        .min(2, {
            message: 'Country must be at least 2 characters.'
        })
        .max(60, {
            message: 'Country must not be longer than 60 characters.'
        })
        .default(''),
    city: z
        .string()
        .min(2, {
            message: 'City must be at least 2 characters.'
        })
        .max(60, {
            message: 'City must not be longer than 60 characters.'
        })
        .default(''),
    province: z
        .string()
        .min(2, {
            message: 'Province must be at least 2 characters.'
        })
        .max(60, {
            message: 'Province must not be longer than 60 characters.'
        })
        .default(''),
    preparedToRelocate: z.enum(['yes', 'no'], {
        required_error: 'You need to select an option.'
    })
});

type LocationDetailsFormValues = z.infer<typeof locationDetailsFormSchema>;

type LocationDetailsFormProps = {
    onNext: () => void;
    onPrevious: () => void;
};

export function LocationDetailsForm({ onNext, onPrevious }: LocationDetailsFormProps) {
    const dispatch = useAppDispatch();
    const allFieldValues = useAppSelector((state) => state.fieldValues);
    const formHook = useForm<LocationDetailsFormValues>({
        resolver: zodResolver(locationDetailsFormSchema)
    });

    useEffect(() => {
        if (allFieldValues) {
            formHook.reset({
                country: allFieldValues.country,
                city: allFieldValues.city,
                province: allFieldValues.province,
                preparedToRelocate: allFieldValues.preparedToRelocate
            });
        }
    }, [allFieldValues, formHook]);

    const onSubmit = async (event?: React.BaseSyntheticEvent) => {
        const submitter = (event?.nativeEvent as SubmitEvent).submitter;
        const submitterName =
            submitter instanceof HTMLButtonElement || submitter instanceof HTMLInputElement
                ? submitter.name
                : undefined;

        const saveValues = (data: unknown) => {
            dispatch(save(data as KeyValuePairArray));
        };

        if (onNext && submitterName === 'next') {
            formHook.handleSubmit((data: LocationDetailsFormValues) => {
                saveValues(data);
                onNext();
            })();
        } else if (onPrevious && submitterName === 'previous') {
            const data = formHook.getValues();
            saveValues(data);
            onPrevious();
        }

        event?.preventDefault();
    };

    return (
        <Form {...formHook}>
            <form onSubmit={onSubmit}>
                <div className='h-[calc(100vh-theme(spacing.16)-theme(spacing.20))] overflow-y-auto'>
                    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6'>
                        <h1>Location details</h1>
                        <TextFormField
                            formHook={formHook}
                            label='Country'
                            fieldName='country'
                            description='This is the country where you are located'
                            placeholder='Your country'
                        />

                        <TextFormField
                            formHook={formHook}
                            label='City'
                            fieldName='city'
                            description='This is the city where you are located'
                            placeholder='Your city'
                        />

                        <TextFormField
                            formHook={formHook}
                            label='Province'
                            fieldName='province'
                            description='This is the province where you are located'
                            placeholder='Your province'
                        />

                        <YesNoFormField
                            formHook={formHook}
                            label='Are you prepared to relocate to another city?'
                            fieldName='preparedToRelocate'
                        />
                    </div>
                </div>

                <StepButtons onPrevious={onPrevious} onNext={onNext} />
            </form>
        </Form>
    );
}
