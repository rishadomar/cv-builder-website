import React from 'react';
import { FormDescription, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FieldLayout } from '@/lib/type';

interface TextFormFieldProps {
    formHook: any;
    label: string;
    fieldName: string;
    description?: string;
    placeholder?: string;
    fieldLayout?: FieldLayout;
    onFocus?: () => void;
}

export default function TextFormField({
    formHook,
    label,
    fieldName,
    description,
    placeholder,
    fieldLayout = 'default',
    onFocus
}: TextFormFieldProps) {
    const error = formHook.formState.errors[fieldName];

    const renderField = (field: any) => {
        return (
            <>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                    <Input onFocus={onFocus} className='text-sm' placeholder={placeholder || ''} {...field} value={field.value ?? ''} />
                </FormControl>
            </>
        );
    };

    return (
        <FormField
            control={formHook.control}
            name={fieldName}
            render={({ field }) => (
                <FormItem>
                    {fieldLayout === 'default' ? (
                        renderField(field)
                    ) : (
                        <div className={'flex flex-row gap-3 items-center'}>{renderField(field)}</div>
                    )}

                    {description && <FormDescription>{description}</FormDescription>}
                    {error && (
                        <FormMessage className='text-xs text-red-500'>{error.message as React.ReactNode}</FormMessage>
                    )}
                </FormItem>
            )}
        />
    );
}
