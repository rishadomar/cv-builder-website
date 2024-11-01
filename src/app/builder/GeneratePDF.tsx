import { StepButtons } from './StepButtons';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import * as services from '@/lib/services';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { Icons } from '@/components/icons';

type GeneratePDFProps = {
    onNext?: () => void;
    onPrevious: () => void;
};

export function GeneratePDF({ onNext, onPrevious }: GeneratePDFProps) {
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
            <div>PDF will now be generated</div>
            <div>You can review the PDF and make any changes</div>
            <Button variant='outline' disabled={isLoading} onClick={() => callGeneratePDF()}>
                <Icons.document className='mr-2' />
                Generate PDF
            </Button>
            <Button variant='outline' disabled={isLoading} onClick={() => callDownloadPDF()}>
                <Icons.arrow_down_on_square className='mr-2' />
                Download PDF
            </Button>
            <StepButtons onNext={onNext} onPrevious={onPrevious} />
        </>
    );
}
