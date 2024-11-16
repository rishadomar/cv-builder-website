import { StepButtons } from '../StepButtons';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import * as services from '@/lib/services';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { Icons } from '@/components/icons';

type GeneratePDFProps = {
    onNext?: () => void;
    onPrevious: () => void;
};

export default function GeneratePDF({ onNext, onPrevious }: GeneratePDFProps) {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector((state) => state.loading.isLoading);
    const allFieldValues = useAppSelector((state) => state.fieldValues);

    useEffect(() => {
        if (allFieldValues.pdf_url) {
            const newWindow = window.open('', '_blank');
            if (newWindow) {
                // Set the title of the new window
                newWindow.document.title = 'CV PDF';
                // Redirect to the actual URL
                newWindow.location.href = allFieldValues.pdf_url;
            }
        }
    }, [allFieldValues.pdf_url]);

    const callGeneratePDF = async () => {
        try {
            dispatch(services.generatePDF());
        } catch (error) {
            console.error('Generate PDF error:', error);
        }
    };

    const callDownloadPDF = async () => {
        try {
            dispatch(services.downloadPDF());
        } catch (error) {
            console.error('Generate PDF error:', error);
        }
    };

    return (
        <>
            <div className='mb-4'>
                <div>PDF will now be generated</div>
                <div>You can review the PDF and return here to make any changes</div>
                <div className='flex flex-col space-y-2'>
                    <Button variant='outline' disabled={isLoading} onClick={() => callGeneratePDF()}>
                        <Icons.document className='mr-2 h-5 w-5' />
                        Generate PDF
                    </Button>
                    <div className='text-xs text-gray-500'>
                        Note: This will overwrite the previous PDF that was generated on: ...
                    </div>
                </div>
                <div className='flex flex-col space-y-2 mt-4'>
                    <Button variant='outline' disabled={isLoading} onClick={() => callDownloadPDF()}>
                        <Icons.arrow_down_on_square className='mr-2 h-5 w-5' />
                        Download PDF
                    </Button>
                </div>
            </div>
            <StepButtons asSubmit={false} onNext={onNext} onPrevious={onPrevious} />
        </>
    );
}
