import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { Check, CircleChevronRight, LucideIcon } from 'lucide-react';
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
import { Steps } from '@/lib/utils/step';

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
                                    icon={step.icon as LucideIcon}
                                    iconColor={getStatus(step) === 'complete' ? 'done' : 'todo'}
                                    title={step.title}
                                    renderInContents
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
                                router.replace(`/builder?page=review`);
                            } else {
                                router.replace(`/billing`);
                            }
                        }}
                        className='w-full'
                        variant='default'
                    >
                        Review
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default ProgressSteps;
