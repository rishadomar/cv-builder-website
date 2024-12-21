import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

interface PillSelectFormFieldProps {
    formHook: UseFormReturn<any>;
    fieldName: string;
    availablePills: string[];
    selectedPills: string[];
    customPills?: {
        allow: boolean;
        placeholder: string;
    };
    error?: string;
}

export default function PillSelectFormField({
    formHook,
    fieldName,
    availablePills,
    selectedPills,
    customPills = undefined,
    error
}: PillSelectFormFieldProps) {
    const [allAvailablePills, setAllAvailablePills] = useState<Array<string>>([]);
    const [customPill, setCustomPill] = useState('');

    useEffect(() => {
        setAllAvailablePills(availablePills);
        const customSelectedPills: string[] = [];
        selectedPills?.forEach((selectedPill) => {
            if (!availablePills.includes(selectedPill)) {
                customSelectedPills.push(selectedPill);
            }
        });
        setAllAvailablePills((prev) => [...prev, ...customSelectedPills]);
    }, [availablePills, selectedPills]);

    return (
        <FormField
            control={formHook.control}
            name={fieldName}
            render={({ field }) => (
                <>
                    <div id={`pill-${fieldName}`} className='flex flex-wrap gap-2'>
                        {allAvailablePills.map((availablePill) => (
                            <Badge
                                key={availablePill}
                                variant={selectedPills && selectedPills.includes(availablePill) ? 'default' : 'outline'}
                                className='cursor-pointer'
                                onClick={() => {
                                    let newSelectedPills;
                                    if (selectedPills.includes(availablePill)) {
                                        newSelectedPills = selectedPills.filter(
                                            (existingPill: string) => existingPill !== availablePill
                                        );
                                    } else {
                                        newSelectedPills = [...selectedPills, availablePill];
                                    }
                                    field.onChange(newSelectedPills);
                                }}
                            >
                                {availablePill}
                            </Badge>
                        ))}
                        {error && <div className='text-xs col-span-3 text-red-500'>{error}</div>}
                    </div>
                    {customPills && customPills.allow && (
                        <div className='flex gap-2'>
                            <Input
                                placeholder={customPills.placeholder}
                                value={customPill}
                                onChange={(e) => {
                                    setCustomPill(e.target.value);
                                }}
                                className='flex-1'
                            />
                            <Button
                                size='icon'
                                variant='outline'
                                disabled={!customPill.trim()}
                                onClick={() => {
                                    if (customPill.trim()) {
                                        const newPill = customPill.trim();
                                        setAllAvailablePills((prev) => [...prev, newPill]);
                                        const newSelectedPills = [...selectedPills, newPill];
                                        field.onChange(newSelectedPills);
                                        setCustomPill('');
                                    }
                                }}
                            >
                                <Plus className='h-4 w-4' />
                            </Button>
                        </div>
                    )}
                </>
            )}
        />
    );
}
