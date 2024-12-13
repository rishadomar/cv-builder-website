import { getStep } from '@/lib/utils/step';
import { StepButtons } from '../StepButtons';
import StepHeader from '../StepHeader';
import { ContactDetailsReview } from '../contact-details/ContactDetailsReview';
import { PersonalDetailsReview } from '../personal-details/PersonalDetailsReview';
import { LocationDetailsReview } from '../location-details/LocationDetailsReview';
import { RemoteWorkDetailsReview } from '../remote-work-details/RemoteWorkDetailsReview';
import { PersonalityDetailsReview } from '../personality-details/PersonalityDetailsReview';
import { HobbiesReview } from '../hobbies/HobbiesReview';
import { EducationReview } from '../education/EducationReview';
import { WorkExperienceReview } from '../work-experience/WorkExperienceReview';

type ReviewProps = {
    onNext?: () => void;
    onPrevious: () => void;
};

export const Review: React.FC<ReviewProps> = ({ onNext, onPrevious }) => {
    const step = getStep('review');

    return (
        <>
            <div className='h-[calc(100vh-theme(spacing.16)-theme(spacing.20))] overflow-y-auto'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6'>
                    <StepHeader title={step.title} />
                    <ContactDetailsReview />
                    <hr />
                    <PersonalDetailsReview />
                    <hr />
                    <LocationDetailsReview />
                    <hr />
                    <RemoteWorkDetailsReview />
                    <hr />
                    <PersonalityDetailsReview />
                    <hr />
                    <HobbiesReview />
                    <hr />
                    <EducationReview />
                    <hr />
                    <WorkExperienceReview />
                </div>
            </div>
            <StepButtons asSubmit={false} onNext={onNext} onPrevious={onPrevious} />
        </>
    );
};
