import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { Circle, CircleCheckBig, CircleChevronRight } from 'lucide-react';
import {
    selectIsContactDetailsPopulated,
    selectIsHobbiesPopulated,
    selectIsLocationDetailsPopulated,
    selectIsPaymentComplete,
    selectIsPersonalDetailsPopulated,
    selectIsPersonalityDetailsPopulated,
    selectIsRemoteWorkPopulated,
    selectIsReviewPersonalityDetailsPopulated,
    selectIsWorkExperiencePopulated
} from '@/lib/store/fieldValues/fieldValuesSlice';
import { useAppSelector } from '@/lib/store/hooks';

export type StepPath =
    | 'contact-details'
    | 'personal-details'
    | 'location-details'
    | 'remote-work-details'
    | 'personality-details'
    | 'hobbies'
    | 'work-experience'
    | 'paywall'
    | 'review-personality-details'
    | 'generate-pdf';

export const Steps = [
    {
        id: 1,
        title: 'Contact',
        description: 'Provide contact details',
        completed: true,
        path: 'contact-details',
        showInSections: true,
        paymentRequired: false
    },
    {
        id: 2,
        title: 'Personal',
        description: 'Enter details about yourself',
        completed: true,
        path: 'personal-details',
        showInSections: true,
        paymentRequired: false
    },
    {
        id: 3,
        title: 'Your location',
        description: 'Provide your current location',
        completed: false,
        path: 'location-details',
        showInSections: true,
        paymentRequired: false
    },
    {
        id: 4,
        title: 'Remote work preferences',
        description: 'Select remote work preferences',
        completed: false,
        path: 'remote-work-details',
        showInSections: true,
        paymentRequired: false
    },
    {
        id: 5,
        title: 'Personality',
        description: 'Dive deeper into your personality',
        completed: false,
        path: 'personality-details',
        showInSections: true,
        paymentRequired: false
    },
    {
        id: 6,
        title: 'Hobbies',
        description: 'What do you enjoy doing to accomplish a life/work balance',
        completed: false,
        path: 'hobbies',
        showInSections: true,
        paymentRequired: false
    },
    {
        id: 7,
        title: 'Work experience',
        description: 'Professional experience',
        completed: false,
        path: 'work-experience',
        showInSections: true,
        paymentRequired: false
    },
    {
        id: 8,
        title: 'Paywall capture',
        description: 'Pay please to continue',
        completed: false,
        path: 'paywall',
        showInSections: false
    },
    {
        id: 9,
        title: 'Review personality',
        description: 'Let AI guide you to describe your personality',
        completed: false,
        path: 'review-personality-details',
        showInSections: true,
        paymentRequired: true
    },
    {
        id: 10,
        title: 'Generate & download CV',
        description: 'A PDF will be generated which you can download for keeps',
        completed: false,
        path: 'generate-pdf',
        showInSections: false,
        paymentRequired: true
    }
];

type ProgressStepsProps = {
    onSelect: () => void;
};

const ProgressSteps: React.FC<ProgressStepsProps> = ({ onSelect }) => {
    const router = useRouter();
    const isRemoteWorkPopulated = useAppSelector(selectIsRemoteWorkPopulated);
    const isContactDetailsPopulated = useAppSelector(selectIsContactDetailsPopulated);
    const isPersonalDetailsPopulated = useAppSelector(selectIsPersonalDetailsPopulated);
    const isLocationDetailsPopulated = useAppSelector(selectIsLocationDetailsPopulated);
    const isPersonalityDetailsPopulated = useAppSelector(selectIsPersonalityDetailsPopulated);
    const isHobbiesPopulated = useAppSelector(selectIsHobbiesPopulated);
    const isWorkExperiencePopulated = useAppSelector(selectIsWorkExperiencePopulated);
    const isReviewPersonalityDetailsPopulated = useAppSelector(selectIsReviewPersonalityDetailsPopulated);
    const isPaymentComplete = useAppSelector(selectIsPaymentComplete);

    console.log('Is payment complete ' + isPaymentComplete);
    const getStatus = (step: (typeof Steps)[0]) => {
        switch (step.path) {
            case 'contact-details':
                return isContactDetailsPopulated ? 'complete' : 'incomplete';
            case 'personal-details':
                return isPersonalDetailsPopulated ? 'complete' : 'incomplete';
            case 'remote-work-details':
                return isRemoteWorkPopulated ? 'complete' : 'incomplete';
            case 'location-details':
                return isLocationDetailsPopulated ? 'complete' : 'incomplete';
            case 'personality-details':
                return isPersonalityDetailsPopulated ? 'complete' : 'incomplete';
            case 'hobbies':
                return isHobbiesPopulated ? 'complete' : 'incomplete';
            case 'work-experience':
                return isWorkExperiencePopulated ? 'complete' : 'incomplete';
            case 'review-personality-details':
                return isReviewPersonalityDetailsPopulated ? 'complete' : 'incomplete';
            default:
                return 'unknown';
        }
    };

    return (
        <Card className='w-full max-w-md'>
            <CardHeader className='hidden sm:block'>
                <CardTitle>Build your CV</CardTitle>
                <CardDescription>Complete these steps to complete your CV</CardDescription>
            </CardHeader>
            <CardContent className='mt-3'>
                <ol className='space-y-4'>
                    {Steps.filter((step) => step.showInSections).map((step, index) => (
                        <li
                            key={step.id}
                            className='flex items-center space-x-4'
                            onClick={() => {
                                if (!step.paymentRequired || isPaymentComplete) {
                                    onSelect();
                                    router.replace(`/builder?page=${step.path}`);
                                } else {
                                    onSelect();
                                    router.replace(`/billing`);
                                }
                            }}
                        >
                            <div className='flex h-8 w-8 items-center justify-center rounded-full' aria-hidden='true'>
                                {getStatus(step) === 'complete' ? (
                                    <CircleCheckBig className='h-5 w-5 text-green-400' />
                                ) : (
                                    <Circle className='h-5 w-5 text-gray-400' />
                                )}
                            </div>
                            <div className='flex-1'>
                                <h3
                                    className={`text-sm ${
                                        !step.paymentRequired || isPaymentComplete ? 'font-semibold' : 'text-gray-200'
                                    }`}
                                >
                                    {step.title}
                                </h3>
                            </div>
                            {index < Steps.length - 1 && (
                                <CircleChevronRight className='h-5 w-5 text-gray-400' aria-hidden='true' />
                            )}
                        </li>
                    ))}
                </ol>
            </CardContent>
        </Card>
    );
};

export default ProgressSteps;
