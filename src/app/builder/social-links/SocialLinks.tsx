import React, { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { StepButtons } from '../StepButtons';
import TextFormField from '../TextFormField';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { save } from '@/lib/services';
import { KeyValuePairArray, SocialLinkTypes } from '@/lib/type';
import { getStep } from '@/lib/utils/step';
import { StepContainer } from '../StepContainer';
import RadioFormField from '../RadioFormField';

const socialLinksFormSchema = z.object({
    linkedIn: z.string().default('').optional(),
    github: z.string().default('').optional(),
    twitter: z.string().default('').optional(),
    portfolio: z.string().default('').optional(),
    primaryLink: z.enum(['linkedIn', 'github', 'twitter', 'portfolio']).nullable().default(null).optional()
});

type SocialLinksFormValues = z.infer<typeof socialLinksFormSchema>;

type SocialLinksFormProps = {
    onNext?: () => void;
    onPrevious: () => void;
};

export default function SocialLinksForm({ onNext, onPrevious }: SocialLinksFormProps) {
    const dispatch = useAppDispatch();
    const allFieldValues = useAppSelector((state) => state.fieldValues);
    const formHook = useForm<SocialLinksFormValues>({
        resolver: zodResolver(socialLinksFormSchema)
    });
    const isValidLink = (value?: SocialLinkTypes) => {
        return ['linkedIn', 'github', 'twitter', 'portfolio'].includes(value as string);
    };
    const socialLinkOptions = [
        { label: 'LinkedIn', value: 'linkedIn' },
        { label: 'GitHub', value: 'github' },
        { label: 'Twitter', value: 'twitter' },
        { label: 'Portfolio', value: 'portfolio' }
    ];
    const { isDirty } = formHook.formState;
    const step = getStep('social-links');

    useEffect(() => {
        if (allFieldValues.socialLinks) {
            formHook.reset({
                linkedIn: allFieldValues.socialLinks.linkedIn || '',
                github: allFieldValues.socialLinks.github || '',
                twitter: allFieldValues.socialLinks.twitter || '',
                portfolio: allFieldValues.socialLinks.portfolio || '',
                primaryLink: isValidLink(allFieldValues.socialLinks.primaryLink)
                    ? (allFieldValues.socialLinks.primaryLink as 'linkedIn' | 'github' | 'twitter' | 'portfolio')
                    : null
            });
        }
    }, [allFieldValues.socialLinks, formHook]);

    useEffect(() => {
        const subscription = formHook.watch((value, { name }) => {
            if (name && value[name as keyof SocialLinksFormValues] === '') {
                const currentPrimaryLink = formHook.getValues('primaryLink');
                if (currentPrimaryLink === name) {
                    formHook.setValue('primaryLink', null, {
                        shouldValidate: true,
                        shouldDirty: true
                    });
                }
            }
        });
        return () => subscription.unsubscribe();
    }, [formHook]);

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

    const shouldShowOption = (value: string) => {
        const linkValue = formHook.watch(value as keyof SocialLinksFormValues);
        return !!linkValue;
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
                            placeholder='https://linkedin.com/in/your-username'
                        />
                        <TextFormField
                            formHook={formHook}
                            label='GitHub'
                            fieldName='github'
                            placeholder='https://github.com/your-username'
                        />
                        <TextFormField
                            formHook={formHook}
                            label='Twitter'
                            fieldName='twitter'
                            placeholder='https://twitter.com/your-username'
                        />
                        <TextFormField formHook={formHook} label='Portfolio' fieldName='portfolio' placeholder='' />
                        <RadioFormField
                            formHook={formHook}
                            label='Primary Link for CV'
                            fieldName='primaryLink'
                            options={socialLinkOptions}
                            showOption={shouldShowOption}
                        />
                    </StepContainer>
                    <StepButtons onNext={onNext} onPrevious={onPrevious} />
                </form>
            </Form>
        </>
    );
}
