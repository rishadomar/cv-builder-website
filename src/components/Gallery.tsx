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
}

interface GalleryProps {
    galleryEntries: galleryEntry[];
}

export default function Gallery({ galleryEntries }: GalleryProps) {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (!api) return;

        api.on('select', () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    return (
        <div className='w-full max-w-4xl mx-auto relative'>
            <Carousel className='w-full' setApi={setApi}>
                <CarouselContent>
                    {galleryEntries.map((galleryEntry, index) => (
                        <CarouselItem key={index}>
                            <Card className='relative h-96 md:h-[600px] overflow-hidden'>
                                <Image
                                    src={galleryEntry.image}
                                    alt={`${galleryEntry.description} gallery entry`}
                                    fill
                                    className='object-cover'
                                />
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
