import React, { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { StepButtons } from '../StepButtons';
import TextFormField from '../TextFormField';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { save } from '@/lib/services';
import { KeyValuePairArray } from '@/lib/type';
import { getStep } from '@/lib/utils/step';
import { StepContainer } from '../StepContainer';

const socialLinksFormSchema = z.object({
    linkedIn: z.string().default('').optional(),
    github: z.string().default('').optional(),
    twitter: z.string().default('').optional(),
    portfolio: z.string().default('').optional()
});

type SocialLinksFormValues = z.infer<typeof socialLinksFormSchema>;

type SocialLinksFormProps = {
    onNext?: () => void;
    onPrevious: () => void;
};

export default function SocialLinksForm({ onNext, onPrevious }: SocialLinksFormProps) {
    const dispatch = useAppDispatch();
    const allFieldValues = useAppSelector((state) => state.fieldValues);
    const defaultValues: Partial<SocialLinksFormValues> = {
        linkedIn: '',
        github: '',
        twitter: '',
        portfolio: ''
    };
    const formHook = useForm<SocialLinksFormValues>({
        resolver: zodResolver(socialLinksFormSchema),
        defaultValues
    });
    const { isDirty } = formHook.formState;
    const step = getStep('social-links');

    useEffect(() => {
        if (allFieldValues.socialLinks) {
            formHook.reset({
                linkedIn: allFieldValues.socialLinks.linkedIn || '',
                github: allFieldValues.socialLinks.github || '',
                twitter: allFieldValues.socialLinks.twitter || '',
                portfolio: allFieldValues.socialLinks.portfolio || ''
            });
        }
    }, [allFieldValues.socialLinks, formHook]);

    const onSubmit = async (event?: React.BaseSyntheticEvent) => {
        const submitter = (event?.nativeEvent as SubmitEvent).submitter;
        const submitterName =
            submitter instanceof HTMLButtonElement || submitter instanceof HTMLInputElement
                ? submitter.name
                : undefined;

        const saveValues = (data: unknown) => {
            if (isDirty) {
                dispatch(save(data as KeyValuePairArray));
            }
        };

        if (onNext && submitterName === 'next') {
            formHook.handleSubmit((data: SocialLinksFormValues) => {
                saveValues({ socialLinks: data });
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
        <>
            <Form {...formHook}>
                <form onSubmit={onSubmit}>
                    <StepContainer step={step}>
                        <TextFormField
                            formHook={formHook}
                            label='LinkedIn'
                            fieldName='linkedIn'
                            placeholder='https://linkedin.com/in/your-profile'
                        />
                        <TextFormField formHook={formHook} label='GitHub' fieldName='github' placeholder='' />
                        <TextFormField formHook={formHook} label='Twitter' fieldName='twitter' placeholder='' />
                        <TextFormField formHook={formHook} label='Portfolio' fieldName='portfolio' placeholder='' />
                    </StepContainer>
                    <StepButtons onNext={onNext} onPrevious={onPrevious} />
                </form>
            </Form>
        </>
    );
}
