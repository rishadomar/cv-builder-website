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
import { StepContainer } from '../StepContainer';

type ReviewProps = {
    onNext?: () => void;
    onPrevious: () => void;
};

export const Review: React.FC<ReviewProps> = ({ onNext, onPrevious }) => {
    const step = getStep('review');

    return (
        <>
            <StepContainer step={step}>
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
            </StepContainer>
            <StepButtons asSubmit={false} onNext={onNext} onPrevious={onPrevious} />
        </>
    );
};
