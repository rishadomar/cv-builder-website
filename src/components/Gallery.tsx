'use client';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    CarouselApi
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface galleryEntry {
    content?: string;
    title?: string;
    subTitle?: string;
    description: string;
    image: string;
    imageWidth?: 'full' | 'narrow' | 'auto';
    hasBorder?: boolean; // Add this property
}

interface GalleryProps {
    galleryEntries: galleryEntry[];
    defaultImageWidth?: 'full' | 'narrow' | 'auto';
    defaultHasBorder?: boolean; // Add this property for default border setting
}

export default function Gallery({
    galleryEntries,
    defaultImageWidth = 'full',
    defaultHasBorder = false
}: GalleryProps) {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (!api) return;

        api.on('select', () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    // Function to get image container style based on width preference
    const getImageContainerStyle = (
        width: 'full' | 'narrow' | 'auto' = defaultImageWidth,
        hasBorder: boolean = defaultHasBorder
    ) => {
        let baseClasses = '';

        // Set width classes
        switch (width) {
            case 'narrow':
                baseClasses = 'w-3/4 mx-auto h-full relative'; // 75% width centered
                break;
            case 'auto':
                baseClasses = 'w-auto mx-auto h-full relative'; // Auto width
                break;
            case 'full':
            default:
                baseClasses = 'w-full h-full relative'; // Full width (default)
                break;
        }

        // Add border and shadow if needed
        if (hasBorder) {
            return `${baseClasses} p-4 bg-white rounded-md shadow-lg`;
        }

        return baseClasses;
    };

    // Function for the image fit class remains the same
    const getImageFitClass = (width: 'full' | 'narrow' | 'auto' = defaultImageWidth) => {
        switch (width) {
            case 'full':
                return 'object-cover'; // This will fill the container, potentially cropping the image
            case 'narrow':
            case 'auto':
            default:
                return 'object-contain'; // This preserves aspect ratio
        }
    };

    return (
        <div className='w-full max-w-4xl mx-auto relative'>
            <Carousel className='w-full' setApi={setApi}>
                <CarouselContent>
                    {galleryEntries.map((galleryEntry, index) => (
                        <CarouselItem key={index}>
                            <Card className='relative h-96 md:h-[600px] overflow-hidden'>
                                {/* Use a container div with the appropriate width and border */}
                                <div
                                    className={getImageContainerStyle(
                                        galleryEntry.imageWidth,
                                        galleryEntry.hasBorder !== undefined ? galleryEntry.hasBorder : defaultHasBorder
                                    )}
                                >
                                    <Image
                                        src={galleryEntry.image}
                                        alt={`${galleryEntry.description} gallery entry`}
                                        fill
                                        className={getImageFitClass(galleryEntry.imageWidth)}
                                    />
                                </div>
                                <CardContent className='absolute bottom-0 left-0 right-0 flex flex-col items-center p-2 text-center bg-black/60'>
                                    {galleryEntry.content && (
                                        <p className='text-lg text-white mb-4'>{galleryEntry.content}</p>
                                    )}
                                    <div className='hidden md:block'>
                                        {galleryEntry.title && (
                                            <p className='font-semibold text-white'>{galleryEntry.title}</p>
                                        )}
                                        {galleryEntry.subTitle && (
                                            <p className='text-gray-200 text-sm'>{galleryEntry.subTitle}</p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div className='hidden md:block'>
                    <CarouselPrevious className='absolute left-4 top-1/2 -translate-y-1/2' />
                    <CarouselNext className='absolute right-4 top-1/2 -translate-y-1/2' />
                </div>
            </Carousel>
            <div className='flex justify-center gap-2 mt-4'>
                {galleryEntries.map((_, index) => (
                    <button
                        key={index}
                        className={`w-2 h-2 rounded-full transition-colors ${
                            current === index ? 'bg-gray-900' : 'bg-gray-300'
                        }`}
                        onClick={() => api?.scrollTo(index)}
                    />
                ))}
            </div>
        </div>
    );
}
