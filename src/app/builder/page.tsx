'use client';
import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ContactDetailsForm from '@/app/builder/contact-details/ContactDetails';
import { LocationDetailsForm } from './location-details/LocationDetailsForm';
import RemoteWorkDetailsForm from '@/app/builder/remote-work-details/RemoteWorkDetails';
import HobbyDetailsForm from '@/app/builder/hobbies/Hobbies';
import WorkExperienceList from '@/app/builder/work-experience/WorkExperienceList';
import Paywall from '@/app/builder/paywall/Paywall';
import PersonalityDetailsForm from '@/app/builder/personality-details/PersonalityDetailsForm';
import DownloadPDF from '@/app/builder/generate-pdf/DownloadPDF';
import { ProgressBar } from '@/components/ProgressBar';
import { useAuth } from '@/hooks/useAuth';
import { useAppSelector } from '@/lib/store/hooks';
import { selectHasPromoCode, selectIsPaymentValid } from '@/lib/store/fieldValues/fieldValuesSlice';
import { OverlaySpinner } from '@/components/OverlaySpinner';
import EducationList from './education/EducationList';
import { Review } from './review/Review';
import { Steps } from '@/lib/utils/step';
import SocialLinksForm from './social-links/SocialLinks';
import TopSkillsForm from './top-skills/TopSkillsForm';
import SelectTemplate from './generate-pdf/SelectTemplate';
import TopSkillsDiscussion from './top-skills/TopSkillsDiscussion';

const NumberOfPages = Steps.length;

function FormContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [currentPage, setCurrentPage] = useState<string>('contact-details');
    const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
    const isPaymentValid = useAppSelector(selectIsPaymentValid);
    const hasPromoCode = useAppSelector(selectHasPromoCode);

    useEffect(() => {
        const page = searchParams.get('page');
        if (page) {
            setCurrentPage(page);
        } else {
            setCurrentPage('contact-details');
        }
    }, [searchParams]);

    useEffect(() => {
        const p = Steps.find((step) => step.path === currentPage);
        if (!p) {
            setCurrentPageNumber(1);
        } else {
            setCurrentPageNumber(Steps.indexOf(p) + 1);
        }
    }, [currentPage]);

    useEffect(() => {
        router.push(`?page=${currentPage}`);
    }, [currentPage, router]);

    const nextPage = () => {
        setCurrentPage((currentPage) => {
            const p = Steps.find((step) => step.path === currentPage);
            if (!p) {
                return 'contact-details';
            }
            const index = Steps.indexOf(p);
            if (index + 1 >= Steps.length) {
                return 'contact-details';
            }
            if (Steps[index + 1].path === 'paywall' && isPaymentValid && !hasPromoCode) {
                return Steps[index + 2].path;
            }
            return Steps[index + 1].path;
        });
    };

    const previousPage = () => {
        setCurrentPage((currentPage) => {
            const p = Steps.find((step) => step.path === currentPage);
            if (!p) {
                return 'contact-details';
            }
            const index = Steps.indexOf(p);
            if (index - 1 < 0) {
                return 'contact-details';
            }
            if (Steps[index - 1].path === 'paywall' && isPaymentValid && !hasPromoCode) {
                return Steps[index - 2].path;
            }
            return Steps[index - 1].path;
        });
    };

    return (
        <>
            <ProgressBar value={(currentPageNumber / NumberOfPages) * 100} />
            <div className='bg-gray-50 py-12 sm:px-6 lg:px-8'>
                {currentPage === 'contact-details' && <ContactDetailsForm onNext={nextPage} />}

                {currentPage === 'location-details' && (
                    <LocationDetailsForm onNext={nextPage} onPrevious={previousPage} />
                )}

                {currentPage === 'remote-work-details' && (
                    <RemoteWorkDetailsForm onNext={nextPage} onPrevious={previousPage} />
                )}

                {currentPage === 'personality-details' && (
                    <PersonalityDetailsForm onNext={nextPage} onPrevious={previousPage} />
                )}

                {currentPage === 'social-links' && <SocialLinksForm onNext={nextPage} onPrevious={previousPage} />}

                {currentPage === 'hobbies' && <HobbyDetailsForm onNext={nextPage} onPrevious={previousPage} />}

                {currentPage === 'education' && <EducationList onNext={nextPage} onPrevious={previousPage} />}

                {currentPage === 'work-experience' && (
                    <WorkExperienceList onNext={nextPage} onPrevious={previousPage} />
                )}

                {currentPage === 'top-skills' && <TopSkillsForm onNext={nextPage} onPrevious={previousPage} />}

                {currentPage === 'top-skills-discussion' && (
                    <TopSkillsDiscussion onNext={nextPage} onPrevious={previousPage} />
                )}

                {currentPage === 'review' && <Review onNext={nextPage} onPrevious={previousPage} />}

                {currentPage === 'paywall' && <Paywall onNext={nextPage} onPrevious={previousPage} />}

                {currentPage === 'select-template' && <SelectTemplate onNext={nextPage} onPrevious={previousPage} />}

                {currentPage === 'download-pdf' && <DownloadPDF onPrevious={previousPage} />}
            </div>
        </>
    );
}

// Main component with proper Suspense boundary
export default function BuilderPage() {
    const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
    const isReading = useAppSelector((state) => state.loading.isReading);

    if (isAuthLoading) {
        return (
            <div className='flex items-center justify-center h-screen'>
                <OverlaySpinner />
            </div>
        );
    }

    if (!isAuthenticated) {
        return null; // or loading state
    }

    return (
        <Suspense fallback={<OverlaySpinner />}>
            <FormContent />
            {isReading && <OverlaySpinner />}
        </Suspense>
    );
}
