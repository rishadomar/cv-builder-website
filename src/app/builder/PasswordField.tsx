import React, { useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { Icons } from '@/components/icons';

interface PasswordFieldProps {
    value: string;
    onChange: (value: string) => void;
    isLoading: boolean;
    withHelp: boolean;
}

export default function PasswordField({ value, onChange, isLoading, withHelp }: PasswordFieldProps) {
    const [showPassword, setShowPassword] = React.useState<boolean | undefined>(undefined);
    const inputRef = React.useRef<HTMLInputElement>(null);

    useEffect(() => {
        // focus on the input field and move cursor to end
        if (showPassword === undefined) {
            return;
        }
        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.focus();
                const length = inputRef.current.value.length;
                inputRef.current.setSelectionRange(length, length);
            }
        }, 0);
    }, [showPassword]);

    return (
        <div className='grid gap-1 mb-4'>
            <Label className='sr-only' htmlFor='email'>
                Password
            </Label>
            <div
                className='relative'
                onBlur={() => {
                    console.log('on blur in show password');
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
                {showPassword ? (
                    <>
                        <Icons.eye
                            className='absolute right-2 top-2 h-4 w-4 text-muted-foreground'
                            onClick={() => {
                                setShowPassword(!showPassword);
                            }}
                        />
                    </>
                ) : (
                    <>
                        <Icons.eyeSlash
                            className='absolute right-2 top-2 h-4 w-4 text-muted-foreground'
                            onClick={() => {
                                setShowPassword(!showPassword);
                            }}
                        />
                    </>
                )}
            </div>
            {withHelp && (
                <div className='flex flex-col'>
                    <span className='text-xs text-muted-foreground'>
                        The password must be atleast 8 characters long.
                    </span>
                    <span className='text-xs text-muted-foreground'> Contain 1 number and 1 lowercase letter.</span>
                </div>
            )}
        </div>
    );
}
