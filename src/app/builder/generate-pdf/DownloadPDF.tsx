import React from 'react';
import { FileDown, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { StepButtons } from '../StepButtons';
import { useAppSelector } from '@/lib/store/hooks';
import { StepContainer } from '../StepContainer';
import { getStep } from '@/lib/utils/step';
import { useLazyDownloadPDFQuery } from '@/lib/store/api/pdfApiSlice';

type DownloadPDFProps = {
    onPrevious: () => void;
};

export default function DownloadPDF({ onPrevious }: DownloadPDFProps) {
    const isLoading = useAppSelector((state) => state.loading.isLoading);
    const allFieldValues = useAppSelector((state) => state.fieldValues);
    const [pdfUrl, setPdfUrl] = React.useState<string | null>(null);
    const step = getStep('download-pdf');
    const [downloadPDFTrigger, { data: pdfBlob }] = useLazyDownloadPDFQuery();
    //const [trigger, { data: pdfBlob, isLoading }] = downloadPDFQuery();

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

    const verifyPDF = async (blob: Blob): Promise<boolean> => {
        // Read just the first 5 bytes of the blob
        const slice = blob.slice(0, 5);
        const decoder = new TextDecoder();
        const magicNumber = decoder.decode(await slice.arrayBuffer());

        if (magicNumber !== '%PDF-') {
            throw new Error('Invalid PDF format: Missing PDF header');
        }

        return true;
    };

    const handleDownloadPDF = async () => {
        try {
            const blob = await downloadPDFTrigger({ download: true }).unwrap();

            if (await verifyPDF(blob)) {
                // Create object URL
                const url = window.URL.createObjectURL(blob);

                // Create temporary link
                const link = document.createElement('a');
                link.href = url;
                link.download = 'cv.pdf'; // Set desired filename

                // Append to document, click, and cleanup
                document.body.appendChild(link);
                link.click();

                // Cleanup
                window.URL.revokeObjectURL(url);
                document.body.removeChild(link);
            } else {
                new Error('Invalid PDF format');
            }
        } catch (error) {
            console.error('Download failed:', error);
            throw new Error('Failed to download PDF');
        }
    };

    // const handleDebug = async () => {
    //     try {
    //         const blob = await downloadPDFTrigger({ download: true }).unwrap();
    //         // const buffer = await blob.arrayBuffer();
    //         // const array = new Uint8Array(buffer);

    //         console.log('PDF Debug Info:');
    //         console.log('File size:', blob.length, 'bytes');
    //         console.log('Header:', new TextDecoder().decode(array.slice(0, 20)));
    //         console.log(
    //             'First 20 bytes:',
    //             Array.from(array.slice(0, 20))
    //                 .map((b) => b.toString(16).padStart(2, '0'))
    //                 .join(' ')
    //         );
    //         console.log(
    //             'Last 20 bytes:',
    //             Array.from(array.slice(-20))
    //                 .map((b) => b.toString(16).padStart(2, '0'))
    //                 .join(' ')
    //         );
    //     } catch (error) {
    //         console.error('Error debugging PDF:', error);
    //     }
    // };

    // const __handleDownloadPDF = async () => {
    //     try {
    //         const blob = await downloadPDFTrigger().unwrap();
    //         const url = window.URL.createObjectURL(blob);
    //         const a = document.createElement('a');
    //         a.href = url;
    //         a.download = 'cv.pdf';
    //         document.body.appendChild(a);
    //         a.click();
    //         window.URL.revokeObjectURL(url);
    //         document.body.removeChild(a);
    //     } catch (error) {
    //         console.error('Download PDF error:', error);
    //     }
    // };

    return (
        <>
            <StepContainer step={step}>
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
                            <Alert variant='default' className='mt-4'>
                                <AlertCircle className='h-4 w-4' />
                                <AlertDescription>
                                    Your browser&amp;s pop-up blocker may prevent the download. Please allow pop-ups for
                                    this.
                                </AlertDescription>
                            </Alert>
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
                            {/* <Button
                                className='w-full'
                                variant='default'
                                onClick={handleDebug}
                                disabled={isLoading || !allFieldValues.pdf_id}
                            >
                                <FileDown className='mr-2 h-4 w-4' />
                                Debug PDF
                            </Button> */}
                        </CardFooter>
                    </Card>
                </div>
            </StepContainer>

            <StepButtons asSubmit={false} onPrevious={onPrevious} />
        </>
    );
}
