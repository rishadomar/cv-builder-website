import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface YesNoFormFieldProps {
    formHook: any;
    label: string;
    fieldName: string;
}
export default function YesNoFormField({ formHook, label, fieldName }: YesNoFormFieldProps) {
    const error = formHook.formState.errors[fieldName];
    const options = [
        {
            label: 'Yes',
            value: 'yes'
        },
        {
            label: 'No',
            value: 'no'
        }
    ];

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
                            {options.map((option) => (
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
