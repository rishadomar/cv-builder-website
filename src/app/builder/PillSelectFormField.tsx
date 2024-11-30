import { Badge } from '@/components/ui/badge';

interface PillSelectFormFieldProps {
    fieldName: string;
    availablePills: string[];
    selectedPills: string[];
    setSelectedPills: (selectedPills: string[]) => void;
    error?: string;
}
export default function PillSelectFormField({
    fieldName,
    availablePills,
    selectedPills,
    setSelectedPills,
    error
}: PillSelectFormFieldProps) {
    return (
        <div id={`pillselectformfield-${fieldName}`} className='grid grid-cols-3 gap-4'>
            {availablePills.map((availablePill) => (
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
    );
}
