import React from 'react';
import { FileDown, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { StepButtons } from '../StepButtons';
import { useAppSelector } from '@/lib/store/hooks';
import { StepContainer } from '../StepContainer';
import { getStep } from '@/lib/utils/step';
import { useDownloadPDFMutation } from '@/lib/store/api/pdfApiSlice';

type DownloadPDFProps = {
    onPrevious: () => void;
};

export default function DownloadPDF({ onPrevious }: DownloadPDFProps) {
    const isLoading = useAppSelector((state) => state.loading.isLoading);
    const allFieldValues = useAppSelector((state) => state.fieldValues);
    const [pdfUrl, setPdfUrl] = React.useState<string | null>(null);
    const step = getStep('download-pdf');
    const [downloadPDF] = useDownloadPDFMutation();

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
            const { url } = await downloadPDF().unwrap();
            setPdfUrl(url);
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
