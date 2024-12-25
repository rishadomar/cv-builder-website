import { CollapsibleDescription } from '@/components/CollapsibleDescription';
import { Check } from 'lucide-react';

type CollapseOptions = {
    collapsable: boolean;
    parentRef: React.RefObject<HTMLDivElement>;
};

type FieldValueReviewProps = {
    field?: string;
    value?: string;
    withCheck?: boolean;
    collapseOptions?: CollapseOptions;
    showAsBold?: boolean;
};

export const FieldValueReview: React.FC<FieldValueReviewProps> = ({
    field,
    value = '--no value--',
    withCheck = false,
    collapseOptions,
    showAsBold = false
}) => {
    if (field) {
        return (
            <div key={field} className='grid grid-cols-4 gap-4'>
                <div className='col-span-2 text-sm font-medium text-gray-500'>{field}:</div>

                <div className='col-span-2 text-sm'>
                    {withCheck && <Check className='w-4 h-4 inline-block mr-1' />}
                    {value ?? '--no value--'}
                </div>
            </div>
        );
    } else if (collapseOptions?.collapsable) {
        return <CollapsibleDescription text={value} parentRef={collapseOptions.parentRef}></CollapsibleDescription>;
    } else {
        return <div className={`text-sm whitespace-pre-wrap  ${showAsBold ? 'font-bold' : ''}`}>{value}</div>;
    }
};
