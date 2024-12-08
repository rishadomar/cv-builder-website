import React, { forwardRef, useImperativeHandle, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { EyeIcon, EyeOff, Check, X } from 'lucide-react';

interface PasswordFieldProps {
    value: string;
    onChange: (value: string) => void;
    isLoading: boolean;
    withHelp: boolean;
    autoComplete?: 'off' | 'on';
    autoHide?: boolean;
    match?: string;
}

export interface PasswordFieldRef {
    isValid: () => boolean;
    focus: () => void;
    validate: () => {
        isValid: boolean;
        hasMinLength: boolean;
        hasNumber: boolean;
        hasLowerCase: boolean;
        isMatching: boolean;
    };
}

const validatePassword = (password: string, match?: string) => {
    const hasMinLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    // Only check matching if this is a confirmation field (match prop exists)
    const isMatching = match === undefined ? true : password.length > 0 && password === match;

    return {
        hasMinLength,
        hasNumber,
        hasLowerCase,
        isMatching,
        // For confirmation field, only check matching. For regular field, check all criteria
        isValid: match === undefined ? hasMinLength && hasNumber && hasLowerCase : isMatching
    };
};

const PasswordField = forwardRef<PasswordFieldRef, PasswordFieldProps>(
    ({ value, onChange, isLoading, withHelp, autoComplete = 'on', autoHide = true, match }, ref) => {
        const [showPassword, setShowPassword] = React.useState<boolean>(false);
        const inputRef = useRef<HTMLInputElement>(null);
        const validation = validatePassword(value, match);

        useImperativeHandle(ref, () => ({
            isValid: () => validatePassword(value, match).isValid,
            focus: () => inputRef.current?.focus(),
            validate: () => validatePassword(value, match)
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
                        if (autoHide) {
                            setShowPassword(false);
                        }
                    }}
                >
                    <Input
                        id={`password${match ? '-confirm' : ''}`}
                        type={showPassword ? 'text' : 'password'}
                        placeholder={match ? 'Confirm password' : 'Password'}
                        autoCapitalize='none'
                        disabled={isLoading}
                        value={value}
                        onChange={(event) => onChange(event.target.value)}
                        ref={inputRef}
                        autoComplete={autoComplete}
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
                        {match === undefined && (
                            <>
                                <span
                                    className={`text-xs ${
                                        validation.hasMinLength ? 'text-green-500' : 'text-muted-foreground'
                                    }`}
                                >
                                    ✓ Must be at least 8 characters long
                                </span>
                                <span
                                    className={`text-xs ${
                                        validation.hasNumber ? 'text-green-500' : 'text-muted-foreground'
                                    }`}
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
                            </>
                        )}
                        {match !== undefined && (
                            <span
                                className={`text-xs ${
                                    validation.isMatching ? 'text-green-500' : 'text-muted-foreground'
                                }`}
                            >
                                ✓ Passwords match
                            </span>
                        )}
                    </div>
                )}
            </div>
        );
    }
);

PasswordField.displayName = 'PasswordField';

export default PasswordField;
