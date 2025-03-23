'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DemoIntroduction from './introduction/DemoIntroduction';
import DemoContactDetailsForm from './contact-details/DemoContactDetails';
import DemoPersonalityDetailsForm from './personality-details/DemoPersonalityDetailsForm';
import DemoTopSkillsForm from './topskills/DemoTopSkillsForm';
import DemoDownloadPDF from './generate-pdf/DemoDownloadPDF';
import { CoachMarkProvider } from '@/contexts/CoachMarkContext';

export default function DemoPage() {
    const [currentStep, setCurrentStep] = useState('introduction');
    const router = useRouter();

    const goToStep = (step: string) => {
        setCurrentStep(step);
    };

    const goToNextStep = () => {
        switch (currentStep) {
            case 'introduction':
                setCurrentStep('contact-details');
                break;
            case 'contact-details':
                setCurrentStep('personality-details');
                break;
            case 'personality-details':
                setCurrentStep('top-skills');
                break;
            case 'top-skills':
                setCurrentStep('download-pdf');
                break;
            case 'download-pdf':
                router.push('/demo?page=contact-details');
                break;
            default:
                router.push('/');
                break;
        }
    };

    const returnToHome = () => {
        router.push('/');
    };

    return (
        <CoachMarkProvider>
            <div className='min-h-screen bg-background'>
                {currentStep === 'introduction' && (
                    <DemoIntroduction onNext={goToNextStep} onReturnToHome={returnToHome} />
                )}

                {currentStep === 'contact-details' && (
                    <DemoContactDetailsForm onNext={goToNextStep} onReturnToHome={returnToHome} />
                )}

                {currentStep === 'personality-details' && (
                    <DemoPersonalityDetailsForm
                        onNext={goToNextStep}
                        onPrevious={() => goToStep('contact-details')}
                        onReturnToHome={returnToHome}
                    />
                )}

                {currentStep === 'top-skills' && (
                    <DemoTopSkillsForm
                        onNext={goToNextStep}
                        onPrevious={() => goToStep('personality-details')}
                        onReturnToHome={returnToHome}
                    />
                )}

                {currentStep === 'download-pdf' && (
                    <DemoDownloadPDF onRestartDemo={() => goToStep('contact-details')} onReturnToHome={returnToHome} />
                )}
            </div>
        </CoachMarkProvider>
    );
}
