import React from 'react';
import { FormDescription, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

interface TextareaFormFieldProps {
    formHook: any;
    label: string;
    fieldName: string;
    description?: string;
    placeholder: string;
}
export default function TextareaFormField({
    formHook,
    label,
    fieldName,
    description,
    placeholder
}: TextareaFormFieldProps) {
    const error = formHook.formState.errors[fieldName];

    return (
        <FormField
            control={formHook.control}
            name={fieldName}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Textarea placeholder={placeholder} {...field} />
                    </FormControl>
                    {description && <FormDescription>{description}</FormDescription>}
                    {error && (
                        <FormMessage className='text-xs text-red-500'>{error.message as React.ReactNode}</FormMessage>
                    )}
                </FormItem>
            )}
        />
    );
}
