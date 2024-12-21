import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface RadioOption {
    label: string;
    value: string;
}

interface RadioFormFieldProps {
    formHook: any;
    label: string;
    fieldName: string;
    options: RadioOption[];
    showOption?: (value: string) => boolean; // Optional function to determine if an option should be shown
}

export default function RadioFormField({
    formHook,
    label,
    fieldName,
    options,
    showOption = () => true // Default to showing all options
}: RadioFormFieldProps) {
    const error = formHook.formState.errors[fieldName];

    return (
        <FormField
            control={formHook.control}
            name={fieldName}
            render={({ field }) => (
                <FormItem className='space-y-3 border border-gray-300 p-4 rounded-md'>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className='flex flex-col space-y-1'
                        >
                            {options
                                .filter((option) => showOption(option.value))
                                .map((option) => (
                                    <FormItem key={option.value} className='flex items-center space-x-3 space-y-0'>
                                        <FormControl>
                                            <RadioGroupItem
                                                id={`${fieldName}-${option.value}`}
                                                value={option.value}
                                                checked={option.value === field.value}
                                            />
                                        </FormControl>
                                        <FormLabel
                                            htmlFor={`${fieldName}-${option.value}`}
                                            className='font-normal cursor-pointer'
                                        >
                                            {option.label}
                                        </FormLabel>
                                    </FormItem>
                                ))}
                        </RadioGroup>
                    </FormControl>
                    {error && (
                        <FormMessage className='text-xs text-red-500'>{error.message as React.ReactNode}</FormMessage>
                    )}
                </FormItem>
            )}
        />
    );
}
