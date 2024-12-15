import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';

interface PillSelectFormFieldProps {
    fieldName: string;
    availablePills: string[];
    selectedPills: string[];
    setSelectedPills: (selectedPills: string[]) => void;
    customPills?: {
        allow: boolean;
        placeholder: string;
    };
    error?: string;
}

export default function PillSelectFormField({
    fieldName,
    availablePills,
    selectedPills,
    setSelectedPills,
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
        <div className='space-y-4'>
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
                            setSelectedPills(newSelectedPills);
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
                                setAllAvailablePills((prev) => [...prev, customPill.trim()]);
                                setSelectedPills([...selectedPills, customPill.trim()]);
                                setCustomPill('');
                            }
                        }}
                    >
                        <Plus className='h-4 w-4' />
                    </Button>
                </div>
            )}
        </div>
    );
}
