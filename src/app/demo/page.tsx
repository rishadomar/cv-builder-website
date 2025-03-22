'use client';
import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ProgressBar } from '@/components/ProgressBar';
import { useAppSelector } from '@/lib/store/hooks';
import { selectHasPromoCode, selectIsPaymentValid } from '@/lib/store/fieldValues/fieldValuesSlice';
import { OverlaySpinner } from '@/components/OverlaySpinner';
import { DemoSteps } from '@/lib/utils/demoStep';
import DemoContactDetailsForm from './contact-details/DemoContactDetails';
import DemoPersonalityDetailsForm from './personality-details/DemoPersonalityDetailsForm';

const NumberOfPages = DemoSteps.length;

function FormContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pageParam = searchParams.get('page');
    const [currentPage, setCurrentPage] = useState<string>(pageParam ?? 'contact-details'); // Set default value here
    const isPaymentValid = useAppSelector(selectIsPaymentValid);
    const hasPromoCode = useAppSelector(selectHasPromoCode);

    // Track initial load to avoid URL updates during initialization
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    // Combined effect to handle URL parameters, page validation, and URL updates
    useEffect(() => {
        // First, handle search params

        // Determine the current page based on URL or use default
        let newPage = pageParam || 'contact-details';

        // Validate that the page is valid
        const pageStep = DemoSteps.find((step) => step.path === newPage);
        if (!pageStep) {
            newPage = 'contact-details';
        }

        // Update state with validated values
        setCurrentPage(newPage);

        // Only update the URL if this isn't the initial load and if the page has changed
        if (!isInitialLoad && pageParam !== newPage) {
            router.push(`?page=${newPage}`);
        }

        // Mark initial load as completed
        if (isInitialLoad) {
            setIsInitialLoad(false);
        }
    }, [searchParams, router, isInitialLoad]);

    const nextPage = () => {
        setCurrentPage((prevPage) => {
            const p = DemoSteps.find((step) => step.path === prevPage);
            if (!p) {
                return 'contact-details';
            }
            const index = DemoSteps.indexOf(p);
            if (index + 1 >= DemoSteps.length) {
                return 'contact-details';
            }
            if (DemoSteps[index + 1].path === 'paywall' && isPaymentValid && !hasPromoCode) {
                return DemoSteps[index + 2].path;
            }
            return DemoSteps[index + 1].path;
        });
    };

    const previousPage = () => {
        setCurrentPage((prevPage) => {
            const p = DemoSteps.find((step) => step.path === prevPage);
            if (!p) {
                return 'contact-details';
            }
            const index = DemoSteps.indexOf(p);
            if (index - 1 < 0) {
                return 'contact-details';
            }
            if (DemoSteps[index - 1].path === 'paywall' && isPaymentValid && !hasPromoCode) {
                return DemoSteps[index - 2].path;
            }
            return DemoSteps[index - 1].path;
        });
    };

    // Add an effect to update URL when currentPage changes from navigation
    useEffect(() => {
        if (!isInitialLoad) {
            router.push(`?page=${currentPage}`);
        }
    }, [currentPage, router, isInitialLoad]);

    return (
        <>
            <div className='bg-gray-50 py-12 sm:px-6 lg:px-8'>
                {currentPage === 'contact-details' && <DemoContactDetailsForm onNext={nextPage} />}

                {currentPage === 'personality-details' && (
                    <DemoPersonalityDetailsForm onNext={nextPage} onPrevious={previousPage} />
                )}

                {/* Other pages */}
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
