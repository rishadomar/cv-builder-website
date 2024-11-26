'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ContactDetailsForm from '@/app/builder/contact-details/ContactDetails';
import PersonalDetailsForm from './personal-details/PersonalDetails';
import { LocationDetailsForm } from './location-details/LocationDetailsForm';
import RemoteWorkDetailsForm from '@/app/builder/remote-work-details/RemoteWorkDetails';
import HobbyDetailsForm from '@/app/builder/hobbies/Hobbies';
import WorkExperienceList from '@/app/builder/work-experience/WorkExperienceList';
import PersonalityDetailsForm from '@/app/builder/personality-details/PersonalityDetails';
import Paywall from '@/app/builder/paywall/Paywall';
import ReviewPersonalityDetailsForm from '@/app/builder/review-personality-details/ReviewPersonalityDetails';
import GeneratePDF from '@/app/builder/generate-pdf/GeneratePDF';
import { ProgressBar } from '@/components/ProgressBar';
import { Steps } from '@/components/ProgressSteps';
import { useAuth } from '@/hooks/useAuth';
import { useAppSelector } from '@/lib/store/hooks';
import { selectIsPaymentValid } from '@/lib/store/fieldValues/fieldValuesSlice';
import { OverlaySpinner } from '@/components/OverlaySpinner';

const NumberOfPages = Steps.length;

function FormContent() {
    const searchParams = useSearchParams();
    const [currentPage, setCurrentPage] = useState<string>('contact-details');
    const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
    const isPaymentValid = useAppSelector(selectIsPaymentValid);

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
            if (Steps[index + 1].path === 'paywall' && isPaymentValid) {
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
            if (Steps[index - 1].path === 'paywall' && isPaymentValid) {
                return Steps[index - 2].path;
            }
            return Steps[index - 1].path;
        });
    };

    return (
        <>
            <ProgressBar value={(currentPageNumber / NumberOfPages) * 100} />
            <div className='bg-gray-50 py-16 sm:px-6 lg:px-8'>
                {currentPage === 'contact-details' && <ContactDetailsForm onNext={nextPage} />}
                {currentPage === 'personal-details' && (
                    <PersonalDetailsForm onNext={nextPage} onPrevious={previousPage} />
                )}
                {currentPage === 'location-details' && (
                    <LocationDetailsForm onNext={nextPage} onPrevious={previousPage} />
                )}
                {currentPage === 'remote-work-details' && (
                    <RemoteWorkDetailsForm onNext={nextPage} onPrevious={previousPage} />
                )}
                {currentPage === 'personality-details' && (
                    <PersonalityDetailsForm onNext={nextPage} onPrevious={previousPage} />
                )}
                {currentPage === 'hobbies' && <HobbyDetailsForm onNext={nextPage} onPrevious={previousPage} />}
                {currentPage === 'work-experience' && (
                    <WorkExperienceList onNext={nextPage} onPrevious={previousPage} />
                )}
                {currentPage === 'paywall' && <Paywall onNext={nextPage} onPrevious={previousPage} />}
                {currentPage === 'review-personality-details' && (
                    <ReviewPersonalityDetailsForm onNext={nextPage} onPrevious={previousPage} />
                )}
                {currentPage === 'generate-pdf' && <GeneratePDF onPrevious={previousPage} />}
            </div>
        </>
    );
}

// Main component with proper Suspense boundary
export default function BuilderPage() {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
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
        </Suspense>
    );
}
