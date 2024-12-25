import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Check, X } from 'lucide-react';
import { validateEmail } from '@/lib/utils/email';
import { Label } from '@/components/ui/label';

interface EmailFieldProps {
    value: string;
    onChange: (value: string) => void;
    isLoading?: boolean;
    showValidity?: boolean;
}

export interface EmailFieldRef {
    isValid: () => boolean;
    focus: () => void;
}

const EmailField = forwardRef<EmailFieldRef, EmailFieldProps>(
    ({ value, onChange, isLoading = false, showValidity }, ref) => {
        const inputRef = useRef<HTMLInputElement>(null);
        const isValid = validateEmail(value);

        useImperativeHandle(ref, () => ({
            isValid: () => validateEmail(value),
            focus: () => inputRef.current?.focus()
        }));

        return (
            <div className='grid gap-1 mb-2'>
                <Label className='sr-only' htmlFor='email'>
                    Email
                </Label>
                <div className='relative'>
                    <Input
                        id='email'
                        type='email'
                        placeholder='Email address'
                        autoCapitalize='none'
                        autoComplete='email'
                        autoCorrect='off'
                        disabled={isLoading}
                        value={value}
                        onChange={(event) => onChange(event.target.value)}
                        ref={inputRef}
                    />
                    {showValidity && value && (
                        <>
                            {isValid ? (
                                <Check className='absolute right-2 top-2 h-4 w-4 text-green-500' />
                            ) : (
                                <X className='absolute right-2 top-2 h-4 w-4 text-red-500' />
                            )}
                        </>
                    )}
                </div>
            </div>
        );
    }
);

EmailField.displayName = 'EmailField';

export default EmailField;
