'use client';

import React from 'react';
import { StepButtons } from '@/app/demo/StepButtons';
import { StepContainer } from '@/components/StepContainer';
import { getStep } from '@/lib/utils/demoStep';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, PlayCircle, MousePointer, Sparkles } from 'lucide-react';

type DemoIntroductionProps = {
    onNext: () => void;
    onReturnToHome: () => void;
};

export default function DemoIntroduction({ onNext, onReturnToHome }: DemoIntroductionProps) {
    const step = getStep('introduction');

    const onSubmit = async (event?: React.BaseSyntheticEvent) => {
        event?.preventDefault(); // Prevent form submission immediately

        const submitter = (event?.nativeEvent as SubmitEvent).submitter;
        const submitterName =
            submitter instanceof HTMLButtonElement || submitter instanceof HTMLInputElement
                ? submitter.name
                : undefined;

        if (onNext && submitterName === 'next') {
            onNext();
        }

        event?.preventDefault();
    };

    return (
        <form onSubmit={onSubmit}>
            <StepContainer step={step}>
                <div className='max-w-3xl mx-auto space-y-6'>
                    <Card>
                        <CardHeader>
                            <CardTitle className='text-2xl font-bold text-center'>
                                Welcome to the CV Builder Demo
                            </CardTitle>
                            <CardDescription className='text-center text-base'>
                                Experience how easily you can create a professional CV in minutes
                            </CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-6'>
                            <p className='text-muted-foreground'>
                                This interactive demo showcases key features of our CV Builder. Watch as the system:
                            </p>

                            <div className='space-y-4'>
                                <div className='flex items-start gap-3'>
                                    <PlayCircle className='h-6 w-6 text-primary shrink-0 mt-0.5' />
                                    <div>
                                        <h3 className='font-medium'>Guided Walkthrough</h3>
                                        <p className='text-sm text-muted-foreground'>
                                            We'll guide you through several carefully selected steps that demonstrate
                                            the core functionality of our CV builder.
                                        </p>
                                    </div>
                                </div>

                                <div className='flex items-start gap-3'>
                                    <Sparkles className='h-6 w-6 text-primary shrink-0 mt-0.5' />
                                    <div>
                                        <h3 className='font-medium'>Auto-filling Magic</h3>
                                        <p className='text-sm text-muted-foreground'>
                                            Watch as forms populate automatically with sample data, showing you how
                                            quick and seamless the experience can be with your own information.
                                        </p>
                                    </div>
                                </div>

                                <div className='flex items-start gap-3'>
                                    <MousePointer className='h-6 w-6 text-primary shrink-0 mt-0.5' />
                                    <div>
                                        <h3 className='font-medium'>Interactive Elements</h3>
                                        <p className='text-sm text-muted-foreground'>
                                            At certain points, you'll be prompted to interact with the form. Clear
                                            instructions will guide you on what to do next.
                                        </p>
                                    </div>
                                </div>

                                <div className='flex items-start gap-3'>
                                    <CheckCircle className='h-6 w-6 text-primary shrink-0 mt-0.5' />
                                    <div>
                                        <h3 className='font-medium'>Just a Taste</h3>
                                        <p className='text-sm text-muted-foreground'>
                                            This is just a preview of what our full CV builder offers. The complete
                                            version includes many more sections and customization options.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className='bg-muted p-4 rounded-md border border-muted-foreground/20'>
                                <p className='text-sm font-medium'>Ready to begin?</p>
                                <p className='text-sm text-muted-foreground'>
                                    Click the "Next" button below to start the demo and see how effortlessly you can
                                    create a professional CV with our tool.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <StepButtons onNext={onNext} typing={false} completed={true} onReturnToHome={onReturnToHome} />
            </StepContainer>
        </form>
    );
}
