'use client';

import React, { useState, useEffect } from 'react';
import { useGetJobStatusQuery } from '@/lib/store/api/audioApiSlice';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useDispatch } from 'react-redux';
import { databaseApiSlice } from '@/lib/store/api/databaseApiSlice';
import { toast } from '@/hooks/use-toast';

// Update interface to receive jobId
interface TriggerGenerateConversationProps {
    jobId: string;
    onBack?: () => void;
    onComplete?: () => void;
}

export const PollConversationGeneration: React.FC<TriggerGenerateConversationProps> = ({
    jobId,
    onBack,
    onComplete
}) => {
    const dispatch = useDispatch();
    const [audioKey, setAudioKey] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [pollingEnabled, setPollingEnabled] = useState(true); // Start polling immediately

    // Query hook for polling job status (skip if no jobId)
    const { data: jobStatus } = useGetJobStatusQuery(
        { jobId },
        {
            skip: !pollingEnabled || !jobId,
            pollingInterval: 3000 // Poll every 3 seconds
        }
    );

    // Monitor job status changes
    useEffect(() => {
        if (!jobStatus) return;

        if (jobStatus.status === 'COMPLETED' && jobStatus.result) {
            setAudioKey(jobStatus.result);
            setPollingEnabled(false);
            toast({
                variant: 'default',
                title: 'Success',
                description: 'Conversation audio has been generated successfully.'
            });

            // Invalidate readRecord query to trigger a refetch
            dispatch(databaseApiSlice.util.invalidateTags(['FieldValues']));

            // If you have an onComplete callback, trigger it
            if (onComplete) onComplete();
        } else if (jobStatus.status === 'FAILED') {
            setErrorMessage(jobStatus.error || 'Generation failed. Please try again.');
            setPollingEnabled(false);

            // Invalidate readRecord query to trigger a refetch
            dispatch(databaseApiSlice.util.invalidateTags(['FieldValues']));
        }
    }, [jobStatus, dispatch, onComplete]);

    // Render based on current state
    return (
        <Card className='w-full'>
            <CardHeader>
                <div className='flex items-center justify-between'>
                    <CardTitle>TopSkills Conversation</CardTitle>
                    {jobStatus?.status && (
                        <Badge
                            variant={
                                jobStatus.status === 'COMPLETED'
                                    ? 'default'
                                    : jobStatus.status === 'FAILED'
                                    ? 'destructive'
                                    : 'outline'
                            }
                        >
                            {jobStatus.status}
                        </Badge>
                    )}
                </div>
                <CardDescription>Hear an interviewer discuss your top skills</CardDescription>
            </CardHeader>

            <CardContent>
                {/* Loading States */}
                {!audioKey && !errorMessage && (
                    <div className='space-y-4 py-4'>
                        <div className='flex items-center space-x-4'>
                            <div className='w-full space-y-2'>
                                <p className='text-sm'>
                                    {jobStatus?.status === 'QUEUED' ? 'In queue...' : 'Generating your audio...'}
                                </p>
                                <Progress value={jobStatus?.progress || 0} className='w-full' />
                            </div>
                        </div>
                        <p className='text-xs text-muted-foreground'>This may take up to 2 minutes to complete.</p>
                        <p className='text-xs text-muted-foreground'>
                            You may safely close this dialog and return to check the status.
                        </p>
                    </div>
                )}

                {/* Error State */}
                {errorMessage && (
                    <div className='flex items-center space-x-2 text-destructive py-4'>
                        <AlertCircle className='h-5 w-5' />
                        <div>
                            <p className='font-medium'>Error</p>
                            <p className='text-sm'>{errorMessage}</p>
                        </div>
                    </div>
                )}
            </CardContent>

            <CardFooter className='flex justify-between space-x-2'>
                {/* Back button always available until audio is ready */}
                {onBack && !audioKey && (
                    <Button variant='outline' onClick={onBack}>
                        Back
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
};
