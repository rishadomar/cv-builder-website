'use client';
import { useState } from 'react';
// import { ProgressBar } from './ProgressBar';
import { ContactDetailsForm } from '@/app/builder/ContactDetailsForm';
import { PersonalDetailsForm } from './PersonalDetailsForm';
import { LocationDetailsForm } from './LocationDetailsForm';
import { RemoteWorkDetailsForm } from './RemoteWorkDetailsForm';
// import { HobbyDetailsForm } from './HobbiesDetailsForm';
// import WorkExperienceList from './workExperience/WorkExperienceList';
// import { MilestoneCaptureData } from './MilestoneCaptureData';
// import { ReviewPersonalityDetailsForm } from './ReviewPersonalityDetailsForm';
// import { GeneratePDF } from './GeneratePDF';
import { useAppSelector } from '@/lib/store/hooks';
import { selectIsLoggedIn } from '@/lib/store/authentication/authenticationSlice';
import { PersonalityDetailsForm } from './PersonalityDetailsForm';

const NumberOfPages = 10;

export default function BuilderPage() {
    const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);

    const nextPage = () => {
        setCurrentPageNumber((pageNumber) => {
            const newPageNumber = pageNumber + 1;
            if (newPageNumber > NumberOfPages) {
                return NumberOfPages;
            }
            return newPageNumber;
        });
    };

    const previousPage = () => {
        setCurrentPageNumber((pageNumber) => {
            const newPageNumber = pageNumber - 1;
            if (newPageNumber < 1) {
                return 1;
            }
            return newPageNumber;
        });
    };

    return (
        <div className='flex flex-col space-y-4 mt-4'>
            {/* <ProgressBar value={(currentPageNumber / NumberOfPages) * 100} /> */}
            <div className='flex items-center justify-center min-h-[calc(80vh-20rem)] bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
                <div className='w-full max-w-md'>
                    {currentPageNumber === 1 && <ContactDetailsForm onNext={nextPage} />}
                    {currentPageNumber === 2 && <PersonalDetailsForm onNext={nextPage} onPrevious={previousPage} />}
                    {currentPageNumber === 3 && <LocationDetailsForm onNext={nextPage} onPrevious={previousPage} />}
                    {currentPageNumber === 4 && <RemoteWorkDetailsForm onNext={nextPage} onPrevious={previousPage} />}
                    {currentPageNumber === 5 && <PersonalityDetailsForm onNext={nextPage} onPrevious={previousPage} />}
                    {/* {currentPageNumber === 6 && <HobbyDetailsForm onNext={nextPage} onPrevious={previousPage} />}
                    {currentPageNumber === 7 && <WorkExperienceList onNext={nextPage} onPrevious={previousPage} />}
                    {currentPageNumber === 8 && <MilestoneCaptureData onNext={nextPage} onPrevious={previousPage} />}
                    {currentPageNumber === 9 && (
                        <ReviewPersonalityDetailsForm onNext={nextPage} onPrevious={previousPage} />
                    )}
                    {currentPageNumber === 10 && <GeneratePDF onNext={nextPage} onPrevious={previousPage} />} */}
                    {(currentPageNumber < 0 || currentPageNumber > NumberOfPages) && <div>Unknown page</div>}
                </div>
            </div>
        </div>
    );
}

// export default function Builder() {
//     const isLoggedIn = useAppSelector(selectIsLoggedIn);
//     return <>{isLoggedIn ? <div>Logged in</div> : <div>Not logged in</div>}</>;
// }
