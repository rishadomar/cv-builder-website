import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import {
    Bike,
    BookText,
    Check,
    CircleChevronRight,
    CreditCard,
    Download,
    Globe,
    GraduationCap,
    Heart,
    Mail,
    MapPinHouse,
    User
} from 'lucide-react';
import {
    selectIsContactDetailsPopulated,
    selectIsEducationPopulated,
    selectIsHobbiesPopulated,
    selectIsLocationDetailsPopulated,
    selectIsPaymentValid,
    selectIsPersonalDetailsPopulated,
    selectIsRemoteWorkPopulated,
    selectIsReviewPersonalityDetailsPopulated,
    selectIsWorkExperiencePopulated
} from '@/lib/store/fieldValues/fieldValuesSlice';
import { useAppSelector } from '@/lib/store/hooks';
import { Button } from './ui/button';
import StepHeader from '@/app/builder/StepHeader';

export type StepPath =
    | 'contact-details'
    | 'personal-details'
    | 'location-details'
    | 'remote-work-details'
    | 'personality-details'
    | 'hobbies'
    | 'education'
    | 'work-experience'
    | 'paywall'
    | 'preview'
    | 'generate-pdf';

export const Steps = [
    {
        id: 1,
        title: 'Contact',
        icon: Mail,
        description: 'Provide contact details',
        completed: true,
        path: 'contact-details',
        showInSections: true,
        paymentRequired: false
    },
    {
        id: 2,
        title: 'Personal',
        icon: User,
        description: 'Enter details about yourself',
        completed: true,
        path: 'personal-details',
        showInSections: true,
        paymentRequired: false
    },
    {
        id: 3,
        title: 'Your location',
        icon: MapPinHouse,
        description: 'Provide your current location',
        completed: false,
        path: 'location-details',
        showInSections: true,
        paymentRequired: false
    },
    {
        id: 4,
        title: 'Remote work preferences',
        icon: Globe,
        description: 'Select remote work preferences',
        completed: false,
        path: 'remote-work-details',
        showInSections: true,
        paymentRequired: false
    },
    {
        id: 5,
        title: 'Personality',
        icon: Heart,
        description: 'Dive deeper into your personality',
        completed: false,
        path: 'personality-details',
        showInSections: true,
        paymentRequired: false
    },
    {
        id: 6,
        title: 'Paywall capture',
        icon: CreditCard,
        description: 'Pay please to continue',
        completed: false,
        path: 'paywall',
        showInSections: false
    },
    {
        id: 7,
        title: 'Hobbies',
        icon: Bike,
        description: 'What do you enjoy doing to accomplish a life/work balance',
        completed: false,
        path: 'hobbies',
        showInSections: true,
        paymentRequired: true
    },
    {
        id: 8,
        title: 'Education',
        icon: GraduationCap,
        description: 'Educational background',
        completed: false,
        path: 'education',
        showInSections: true,
        paymentRequired: true
    },
    {
        id: 9,
        title: 'Work experience',
        icon: BookText,
        description: 'Professional experience',
        completed: false,
        path: 'work-experience',
        showInSections: true,
        paymentRequired: true
    },
    {
        id: 10,
        title: 'Preview',
        icon: Download,
        description: 'Preview your CV',
        completed: false,
        path: 'preview',
        showInSections: false,
        paymentRequired: true
    },
    {
        id: 11,
        title: 'Generate & download CV',
        icon: Download,
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
    const isHobbiesPopulated = useAppSelector(selectIsHobbiesPopulated);
    const isEducationPopulated = useAppSelector(selectIsEducationPopulated);
    const isWorkExperiencePopulated = useAppSelector(selectIsWorkExperiencePopulated);
    const isReviewPersonalityDetailsPopulated = useAppSelector(selectIsReviewPersonalityDetailsPopulated);
    const isPaymentValid = useAppSelector(selectIsPaymentValid);

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
                return isReviewPersonalityDetailsPopulated ? 'complete' : 'incomplete';
            case 'hobbies':
                return isHobbiesPopulated ? 'complete' : 'incomplete';
            case 'education':
                return isEducationPopulated ? 'complete' : 'incomplete';
            case 'work-experience':
                return isWorkExperiencePopulated ? 'complete' : 'incomplete';
            default:
                return 'unknown';
        }
    };

    return (
        <Card className='mx-2'>
            <CardContent className='mt-3'>
                <ol className='space-y-2'>
                    {Steps.filter((step) => step.showInSections).map((step, index) => (
                        <li
                            key={step.id}
                            className='group cursor-pointer flex items-center space-x-4 px-2 hover:bg-gray-50 rounded-lg transition-colors'
                            onClick={() => {
                                if (!step.paymentRequired || isPaymentValid) {
                                    onSelect();
                                    router.replace(`/builder?page=${step.path}`);
                                } else {
                                    onSelect();
                                    router.replace(`/billing`);
                                }
                            }}
                        >
                            <div className='flex-grow'>
                                <StepHeader
                                    icon={step.icon}
                                    iconColor={getStatus(step) === 'complete' ? 'done' : 'todo'}
                                    title={step.title}
                                />
                            </div>

                            {index < Steps.length - 1 && getStatus(step) === 'complete' ? (
                                <Check
                                    className='h-5 w-5 text-green-500 group-hover:text-green-700 transition-colors'
                                    aria-hidden='true'
                                />
                            ) : (
                                <CircleChevronRight
                                    className='h-5 w-5 text-gray-300 group-hover:text-gray-500 transition-colors'
                                    aria-hidden='true'
                                />
                            )}
                        </li>
                    ))}
                </ol>

                <div className='mt-6'>
                    <Button
                        onClick={() => {
                            onSelect();
                            if (isPaymentValid) {
                                router.replace(`/builder?page=generate-pdf`);
                            } else {
                                router.replace(`/billing`);
                            }
                        }}
                        className='w-full'
                        variant='default'
                    >
                        Generate PDF
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default ProgressSteps;
