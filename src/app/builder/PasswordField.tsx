import React from 'react';
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
    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    return (
        <div className='grid gap-1 mb-4'>
            <Label className='sr-only' htmlFor='email'>
                Password
            </Label>
            <div className='relative'>
                <Input
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Password'
                    autoCapitalize='none'
                    disabled={isLoading}
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                />
                {showPassword ? (
                    <Icons.eye
                        className='absolute right-2 top-2 h-4 w-4 text-muted-foreground'
                        onClick={() => setShowPassword(!showPassword)}
                    />
                ) : (
                    <Icons.eyeSlash
                        className='absolute right-2 top-2 h-4 w-4 text-muted-foreground'
                        onClick={() => setShowPassword(!showPassword)}
                    />
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
