import React from 'react';
import { FileText, FileDown, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { StepButtons } from '../StepButtons';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import * as services from '@/lib/services';
import { OverlaySpinner } from '@/components/OverlaySpinner';
import { formatDateTime } from '@/lib/utils';
import { toast } from 'react-toastify';

type GeneratePDFProps = {
    onNext?: () => void;
    onPrevious: () => void;
};

export default function GeneratePDF({ onNext, onPrevious }: GeneratePDFProps) {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector((state) => state.loading.isLoading);
    const allFieldValues = useAppSelector((state) => state.fieldValues);
    const { isLoading: busyGenerating } = useAppSelector((state) => state.loading);
    const [pdfUrl, setPdfUrl] = React.useState<string | null>(null);

    console.log('allFieldValues', allFieldValues);

    React.useEffect(() => {
        if (pdfUrl) {
            const newWindow = window.open('', '_blank');
            if (newWindow) {
                newWindow.document.title = 'CV PDF';
                newWindow.location.href = pdfUrl;
            }
        }
    }, [pdfUrl]);

    const handleGeneratePDF = async () => {
        try {
            await dispatch(services.generatePDF());
            toast.success('PDF generated successfully. Ready to be downloaded.');
        } catch (error) {
            console.error('Generate PDF error:', error);
        } finally {
        }
    };

    const handleDownloadPDF = async () => {
        try {
            const pdf_url = await dispatch(services.downloadPDF());
            setPdfUrl(pdf_url);
        } catch (error) {
            console.error('Download PDF error:', error);
        }
    };

    return (
        <div className='min-h-[calc(100vh-theme(spacing.16)-theme(spacing.20))] flex flex-col'>
            <div className='flex-1 max-w-3xl mx-auto w-full px-4 py-6 space-y-6'>
                <Alert>
                    <AlertCircle className='h-4 w-4' />
                    <AlertDescription>You can review the PDF and return here to make any changes</AlertDescription>
                </Alert>

                <div className='grid gap-6 md:grid-cols-2'>
                    {busyGenerating && <OverlaySpinner />}
                    <Card>
                        <CardHeader>
                            <CardTitle className='flex items-center space-x-2'>
                                <FileText className='h-5 w-5' />
                                <span>Generate PDF</span>
                            </CardTitle>
                            <CardDescription>Create a new PDF version of your CV</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className='text-sm text-muted-foreground'>
                                This will create a professionally formatted PDF version of your CV using the information
                                you&apos;ve provided.
                            </p>
                        </CardContent>
                        <CardFooter className='flex flex-col items-start space-y-2'>
                            <Button className='w-full' onClick={handleGeneratePDF} disabled={isLoading}>
                                <FileText className='mr-2 h-4 w-4' />
                                Generate New PDF
                            </Button>
                            {allFieldValues.pdf_generated_date && (
                                <p className='text-xs text-muted-foreground'>
                                    Last generated: {formatDateTime(new Date(allFieldValues.pdf_generated_date))}
                                </p>
                            )}
                        </CardFooter>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className='flex items-center space-x-2'>
                                <FileDown className='h-5 w-5' />
                                <span>Download PDF</span>
                            </CardTitle>
                            <CardDescription>Download your generated CV</CardDescription>
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
                                variant='secondary'
                                onClick={handleDownloadPDF}
                                disabled={isLoading || !allFieldValues.pdf_id}
                            >
                                <FileDown className='mr-2 h-4 w-4' />
                                Download PDF
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>

            <div className='mt-auto'>
                <StepButtons asSubmit={false} onNext={onNext} onPrevious={onPrevious} />
            </div>
        </div>
    );
}
