import React, { useEffect, useRef } from 'react';
import { ExternalLink, FileDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardFooter } from '@/components/ui/card';
import { useAppSelector } from '@/lib/store/hooks';
import { StepContainer } from '@/components/StepContainer';
import { useLazyDownloadSamplePDFQuery } from '@/lib/store/api/pdfApiSlice';
import { toast } from '@/hooks/use-toast';
import { getStep } from '@/lib/utils/demoStep';
import { StepButtons } from '../StepButtons';
import { useCoachMarkContext } from '@/contexts/CoachMarkContext';

type DemoDownloadPDFProps = {
    onRestartDemo: () => void;
    onReturnToHome: () => void;
};

export default function DemoDownloadPDF({ onRestartDemo, onReturnToHome }: DemoDownloadPDFProps) {
    const { showCoachMark, hideCoachMark } = useCoachMarkContext();
    const coachMarkShownRef = useRef(false);
    const isLoading = useAppSelector((state) => state.loading.isLoading);
    const step = getStep('download-pdf');
    const [downloadSamplePDFTrigger] = useLazyDownloadSamplePDFQuery();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            showCoachMark(
                'download-pdf-button', // ID of the element to highlight
                <div>
                    <p className='text-xs'>Download a sample PDF</p>
                </div>,
                {
                    position: 'bottom'
                }
            );
        }, 1000);
        return () => {
            clearTimeout(timeoutId);
            hideCoachMark(); // Hide coach mark when navigating away
        };
    }, []);

    const handlePDF = async (action: 'download' | 'open') => {
        try {
            const blob = await downloadSamplePDFTrigger({ download: action === 'download' }).unwrap();

            if (await verifyPDF(blob)) {
                // Create object URL
                const url = window.URL.createObjectURL(blob);

                if (action === 'download') {
                    // Create temporary link for download
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = 'cv-sample.pdf'; // Set desired filename
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                } else {
                    // Open in new tab
                    window.open(url, '_blank');
                }

                // Cleanup
                // For downloads, we can revoke immediately
                // For opening in new tab, we need to delay the cleanup
                if (action === 'download') {
                    window.URL.revokeObjectURL(url);
                } else {
                    // Delay revoking the object URL to ensure the PDF loads in the new tab
                    setTimeout(() => {
                        window.URL.revokeObjectURL(url);
                    }, 1000);
                }

                toast({
                    variant: 'default',
                    title: 'Success',
                    description: `PDF ${action === 'download' ? 'downloaded' : 'opened'} successfully`
                });
            } else {
                throw new Error('Invalid PDF format');
            }
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: error instanceof Error ? error.message : 'An unexpected error occurred'
            });
        }
    };

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

    return (
        <div className='mt-14'>
            <StepContainer step={step}>
                <div className='flex items-center justify-center min-h-[50vh]'>
                    <Card className='w-full max-w-md p-2'>
                        <CardFooter className='flex flex-col'>
                            <Button
                                className='w-full mt-2'
                                variant='secondary'
                                onClick={() => handlePDF('open')}
                                disabled={isLoading}
                            >
                                <ExternalLink className='mr-2 h-4 w-4' />
                                Open Sample PDF in new tab
                            </Button>
                            <span className='text-xs text-muted-foreground mt-2 mb-5'>
                                If opening in a new tab doesn&apos;t work, try downloading the PDF instead.
                            </span>
                            <Button
                                id='download-pdf-button'
                                className='w-full'
                                variant='secondary'
                                onClick={() => handlePDF('download')}
                                disabled={isLoading}
                            >
                                <FileDown className='mr-2 h-4 w-4' />
                                Download Sample PDF
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </StepContainer>

            <StepButtons asSubmit={false} onRestartDemo={onRestartDemo} onReturnToHome={onReturnToHome} />
        </div>
    );
}
