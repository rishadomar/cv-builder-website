import Pill from '@/components/core/Pill';

interface PillSelectFormFieldProps {
    label: string;
    fieldName: string;
    availablePills: string[];
    selectedPills: string[];
    setSelectedPills: (selectedPills: string[]) => void;
    error?: string;
}
export default function PillSelectFormField({
    label,
    fieldName,
    availablePills,
    selectedPills,
    setSelectedPills,
    error
}: PillSelectFormFieldProps) {
    return (
        <>
            <h2>{label}</h2>
            <div id={`pillselectformfield-${fieldName}`} className='grid grid-cols-3 gap-4'>
                {availablePills.map((availablePill) => (
                    <div key={availablePill} className='flex items-center space-x-2'>
                        <Pill
                            variant={selectedPills && selectedPills.includes(availablePill) ? 'selected' : 'outline'}
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
                        </Pill>
                    </div>
                ))}
                {error && <div className='text-xs col-span-3 text-red-500'>{error}</div>}
            </div>
        </>
    );
}
