'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ContactDetailsForm from '@/app/builder/contact-details/page';
import PersonalDetailsForm from './personal-details/page';
import { LocationDetailsForm } from './LocationDetailsForm';
import RemoteWorkDetailsForm from '@/app/builder/remote-work-details/page';
import HobbyDetailsForm from '@/app/builder/hobbies/page';
import WorkExperienceList from '@/app/builder/work-experience/page';
import PersonalityDetailsForm from '@/app/builder/personality-details/page';
import MilestoneCaptureData from '@/app/builder/milestone-capture-data/page';
import ReviewPersonalityDetailsForm from '@/app/builder/review-personality-details/page';
import GeneratePDF from '@/app/builder/generate-pdf/page';
import { ProgressBar } from '@/components/ProgressBar';
import { Steps } from '@/components/ProgressSteps';

const NumberOfPages = Steps.length;

export default function BuilderPage() {
    const searchParams = useSearchParams();
    const [currentPage, setCurrentPage] = useState<string>('contact-details');
    const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);

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
            return Steps[index - 1].path;
        });
    };

    return (
        <div className='h-full w-full max-w-md'>
            <ProgressBar value={(currentPageNumber / NumberOfPages) * 100} />
            <div className='bg-gray-50 py-6 sm:px-6 lg:px-8'>
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
                {currentPage === 'milestone-capture-data' && (
                    <MilestoneCaptureData onNext={nextPage} onPrevious={previousPage} />
                )}
                {currentPage === 'review-personality-details' && (
                    <ReviewPersonalityDetailsForm onNext={nextPage} onPrevious={previousPage} />
                )}
                {currentPage === 'generate-pdf' && <GeneratePDF onPrevious={previousPage} />}
            </div>
        </div>
    );
}
