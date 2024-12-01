import React from 'react';
import { Card } from '@/components/ui/card';
import { WorkExperienceEntry } from '@/lib/type';

const HorizontalTimeline = ({ experiences }: { experiences: WorkExperienceEntry[] }) => {
    // Helper function to convert month/year to Date object
    const toDate = (date: { month: number; year: number }) => {
        return new Date(date.year, date.month - 1);
    };

    const fexperiences = [
        {
            company: 'Company 1',
            startDate: { year: '2010', month: '1' },
            endDate: { year: '2018', month: '1' }
        },
        {
            company: 'Company 2',
            startDate: { year: '2019', month: '1' },
            endDate: { year: '2022', month: '1' }
        },
        {
            company: 'Company 3',
            startDate: { year: '2022', month: '1' },
            endDate: { year: '2023', month: '1' }
        }
    ];

    const uexperiences = fexperiences.map((exp) => {
        return {
            ...exp,
            startDate: exp.startDate
                ? toDate({ year: parseInt(exp.startDate.year!), month: parseInt(exp.startDate.month!) })
                : new Date(),
            endDate: exp.endDate
                ? toDate({ year: parseInt(exp.endDate.year!), month: parseInt(exp.endDate.month!) })
                : new Date()
        };
    });

    console.log('U-experiences', uexperiences);

    // Find the earliest and latest dates
    const dates = uexperiences.flatMap((exp) => [exp.startDate, exp.endDate]);
    const startDate = new Date(Math.min(...dates.map((d) => d.getTime())));
    const endDate = new Date(Math.max(...dates.map((d) => d.getTime())));

    // Calculate total months for scaling
    const totalMonths =
        (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth());

    // Function to calculate position and width percentages
    const getTimelinePosition = (experience: WorkExperienceEntry) => {
        const start = experience.startDate
            ? toDate({ year: parseInt(experience.startDate.year!), month: parseInt(experience.startDate.month!) })
            : new Date();
        const end = experience.endDate
            ? toDate({ year: parseInt(experience.endDate.year!), month: parseInt(experience.endDate.month!) })
            : new Date();

        const startOffset =
            (start.getFullYear() - startDate.getFullYear()) * 12 + (start.getMonth() - startDate.getMonth());
        const duration = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());

        return {
            left: `${(startOffset / totalMonths) * 100}%`,
            width: `${(duration / totalMonths) * 100}%`
        };
    };

    // Generate year markers
    const years = [];
    for (let year = startDate.getFullYear(); year <= endDate.getFullYear(); year++) {
        years.push(year);
    }

    return (
        <Card className='p-6 w-full'>
            <div className='space-y-6'>
                {/* Year markers */}
                <div className='relative h-6 border-b border-gray-200'>
                    {years.map((year) => {
                        const offset = (((year - startDate.getFullYear()) * 12) / totalMonths) * 100;
                        return (
                            <div
                                key={year}
                                className='absolute transform -translate-x-1/2'
                                style={{ left: `${offset}%` }}
                            >
                                <div className='text-sm text-gray-500'>{year}</div>
                            </div>
                        );
                    })}
                </div>

                {/* Timeline bars */}
                <div className='relative space-y-3'>
                    {fexperiences.map((exp, index) => {
                        const position = getTimelinePosition(exp);
                        return (
                            <div key={index} className='relative h-8'>
                                <div
                                    className='absolute h-full rounded-full bg-blue-500 hover:bg-blue-600 transition-colors'
                                    style={{
                                        left: position.left,
                                        width: position.width
                                    }}
                                >
                                    <div className='absolute top-full mt-1 text-xs whitespace-nowrap'>
                                        {exp.company}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Card>
    );
};

export default HorizontalTimeline;
