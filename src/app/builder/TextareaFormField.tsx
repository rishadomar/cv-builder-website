import React from 'react';
import { FormDescription, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

interface TextareaFormFieldProps {
    formHook: any;
    label?: string;
    fieldName: string;
    description?: string;
    placeholder: string;
    rows?: number;
}
export default function TextareaFormField({
    formHook,
    label,
    fieldName,
    description,
    placeholder,
    rows = 5
}: TextareaFormFieldProps) {
    const error = formHook.formState.errors[fieldName];

    return (
        <FormField
            control={formHook.control}
            name={fieldName}
            render={({ field }) => (
                <FormItem>
                    {label && <FormLabel>{label}</FormLabel>}
                    <FormControl>
                        <Textarea placeholder={placeholder} {...field} rows={rows} className='text-xs'/>
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
