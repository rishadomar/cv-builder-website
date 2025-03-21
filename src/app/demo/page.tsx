'use client';
import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ProgressBar } from '@/components/ProgressBar';
import { useAppSelector } from '@/lib/store/hooks';
import { selectHasPromoCode, selectIsPaymentValid } from '@/lib/store/fieldValues/fieldValuesSlice';
import { OverlaySpinner } from '@/components/OverlaySpinner';
import { Steps } from '@/lib/utils/demoStep';
import DemoContactDetailsForm from './contact-details/DemoContactDetails';
import DemoPersonalityDetailsForm from './personality-details/DemoPersonalityDetailsForm';

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
                {currentPage === 'contact-details' && <DemoContactDetailsForm onNext={nextPage} />}

                {currentPage === 'personality-details' && (
                    <DemoPersonalityDetailsForm onNext={nextPage} onPrevious={previousPage} />
                )}

                {/* {currentPage === 'work-experience' && (
                    <DemoWorkExperienceList onNext={nextPage} onPrevious={previousPage} />
                )}

                {currentPage === 'top-skills' && <DemoTopSkillsForm onNext={nextPage} onPrevious={previousPage} />}

                {currentPage === 'select-template' && <DemoSelectTemplate onNext={nextPage} onPrevious={previousPage} />}

                {currentPage === 'download-pdf' && <DemoDownloadPDF onPrevious={previousPage} />} */}
            </div>
        </>
    );
}

// Main component with proper Suspense boundary
export default function BuilderPage() {
    return (
        <Suspense fallback={<OverlaySpinner />}>
            <FormContent />
        </Suspense>
    );
}
