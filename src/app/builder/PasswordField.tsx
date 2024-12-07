import React, { forwardRef, useImperativeHandle, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { EyeIcon, EyeOff, Check, X } from 'lucide-react';

interface PasswordFieldProps {
    value: string;
    onChange: (value: string) => void;
    isLoading: boolean;
    withHelp: boolean;
}

export interface PasswordFieldRef {
    isValid: () => boolean;
    focus: () => void;
    validate: () => {
        isValid: boolean;
        hasMinLength: boolean;
        hasNumber: boolean;
        hasLowerCase: boolean;
    };
}

const validatePassword = (password: string) => {
    const hasMinLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasLowerCase = /[a-z]/.test(password);

    return {
        hasMinLength,
        hasNumber,
        hasLowerCase,
        isValid: hasMinLength && hasNumber && hasLowerCase
    };
};

const PasswordField = forwardRef<PasswordFieldRef, PasswordFieldProps>(
    ({ value, onChange, isLoading, withHelp }, ref) => {
        const [showPassword, setShowPassword] = React.useState<boolean>(false);
        const inputRef = useRef<HTMLInputElement>(null);
        const validation = validatePassword(value);

        useImperativeHandle(ref, () => ({
            isValid: () => validatePassword(value).isValid,
            focus: () => inputRef.current?.focus(),
            validate: () => validatePassword(value)
        }));

        useEffect(() => {
            if (showPassword) {
                setTimeout(() => {
                    if (inputRef.current) {
                        inputRef.current.focus();
                        const length = inputRef.current.value.length;
                        inputRef.current.setSelectionRange(length, length);
                    }
                }, 0);
            }
        }, [showPassword]);

        return (
            <div className='grid gap-1 mb-2'>
                <Label className='sr-only' htmlFor='password'>
                    Password
                </Label>
                <div
                    className='relative'
                    onBlur={() => {
                        setShowPassword(false);
                    }}
                >
                    <Input
                        id='password'
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Password'
                        autoCapitalize='none'
                        disabled={isLoading}
                        value={value}
                        onChange={(event) => onChange(event.target.value)}
                        ref={inputRef}
                    />
                    <div className='absolute right-2 top-2 flex gap-2'>
                        {value && (
                            <>
                                {validation.isValid ? (
                                    <Check className='h-4 w-4 text-green-500' />
                                ) : (
                                    <X className='h-4 w-4 text-red-500' />
                                )}
                            </>
                        )}
                        {showPassword ? (
                            <EyeIcon
                                className='h-4 w-4 text-muted-foreground cursor-pointer'
                                onClick={() => setShowPassword(false)}
                            />
                        ) : (
                            <EyeOff
                                className='h-4 w-4 text-muted-foreground cursor-pointer'
                                onClick={() => setShowPassword(true)}
                            />
                        )}
                    </div>
                </div>
                {withHelp && (
                    <div className='flex flex-col'>
                        <span
                            className={`text-xs ${
                                validation.hasMinLength ? 'text-green-500' : 'text-muted-foreground'
                            }`}
                        >
                            ✓ Must be at least 8 characters long
                        </span>
                        <span
                            className={`text-xs ${validation.hasNumber ? 'text-green-500' : 'text-muted-foreground'}`}
                        >
                            ✓ Must contain at least 1 number
                        </span>
                        <span
                            className={`text-xs ${
                                validation.hasLowerCase ? 'text-green-500' : 'text-muted-foreground'
                            }`}
                        >
                            ✓ Must contain at least 1 lowercase letter
                        </span>
                    </div>
                )}
            </div>
        );
    }
);

PasswordField.displayName = 'PasswordField';

export default PasswordField;
