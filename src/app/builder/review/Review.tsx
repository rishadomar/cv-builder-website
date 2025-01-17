import { getStep } from '@/lib/utils/step';
import { StepButtons } from '../StepButtons';
import { ContactDetailsReview } from '../contact-details/ContactDetailsReview';
import { LocationDetailsReview } from '../location-details/LocationDetailsReview';
import { RemoteWorkDetailsReview } from '../remote-work-details/RemoteWorkDetailsReview';
import { PersonalityDetailsReview } from '../personality-details/PersonalityDetailsReview';
import { HobbiesReview } from '../hobbies/HobbiesReview';
import { EducationReview } from '../education/EducationReview';
import { WorkExperienceReview } from '../work-experience/WorkExperienceReview';
import { StepContainer } from '../StepContainer';
import { SocialLinksReview } from '../social-links/SocialLinksReview';
import { TopSkillsReview } from '../top-skills/TopSkillsReview';

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
                <LocationDetailsReview />
                <hr />
                <RemoteWorkDetailsReview />
                <hr />
                <PersonalityDetailsReview />
                <hr />
                <HobbiesReview />
                <hr />
                <SocialLinksReview />
                <hr />
                <EducationReview />
                <hr />
                <TopSkillsReview />
                <hr />
                <WorkExperienceReview />
            </StepContainer>
            <StepButtons asSubmit={false} onNext={onNext} onPrevious={onPrevious} />
        </>
    );
};
