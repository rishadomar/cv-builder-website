import React from 'react';
import { FileDown, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { StepButtons } from '../StepButtons';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import * as services from '@/lib/services';
import { StepContainer } from '../StepContainer';
import { getStep } from '@/lib/utils/step';

type DownloadPDFProps = {
    onPrevious: () => void;
};

export default function DownloadPDF({ onPrevious }: DownloadPDFProps) {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector((state) => state.loading.isLoading);
    const allFieldValues = useAppSelector((state) => state.fieldValues);
    const [pdfUrl, setPdfUrl] = React.useState<string | null>(null);
    const step = getStep('download-pdf');

    React.useEffect(() => {
        if (pdfUrl) {
            const link = document.createElement('a');
            link.href = pdfUrl;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.click();

            // Get the newly opened window
            const newWindow = window.open('', link.target);
            if (newWindow) {
                newWindow.document.title = 'cv.pdf';
            }

            // Remove the link
            link.remove();
        }
    }, [pdfUrl]);

    const handleDownloadPDF = async () => {
        try {
            const pdf_url = await dispatch(services.downloadPDF());
            setPdfUrl(pdf_url);
        } catch (error) {
            console.error('Download PDF error:', error);
        }
    };

    return (
        <>
            <StepContainer step={step}>
                <Alert>
                    <AlertCircle className='h-4 w-4' />
                    <AlertDescription>You can review the PDF and return here to make any changes</AlertDescription>
                </Alert>

                <div className='grid gap-6 md:grid-cols-2'>
                    <Card>
                        <CardHeader>
                            <CardTitle className='flex items-center space-x-2'>
                                <FileDown className='h-5 w-5' />
                                <span>Download PDF</span>
                            </CardTitle>
                            <CardDescription>Download your CV</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className='text-sm text-muted-foreground'>
                                Download the latest version of your CV to your device. You can then share it with
                                potential employers.
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Button
                                className='w-full'
                                variant='default'
                                onClick={handleDownloadPDF}
                                disabled={isLoading || !allFieldValues.pdf_id}
                            >
                                <FileDown className='mr-2 h-4 w-4' />
                                Download PDF
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </StepContainer>

            <StepButtons asSubmit={false} onPrevious={onPrevious} />
        </>
    );
}
