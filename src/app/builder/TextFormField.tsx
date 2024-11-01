import React from 'react';
import { FormDescription, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface TextFormFieldProps {
    formHook: any;
    label: string;
    fieldName: string;
    description?: string;
    placeholder?: string;
}

export default function TextFormField({ formHook, label, fieldName, description, placeholder }: TextFormFieldProps) {
    const error = formHook.formState.errors[fieldName];

    return (
        <FormField
            control={formHook.control}
            name={fieldName}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input placeholder={placeholder || ''} {...field} value={field.value ?? ''} />
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
