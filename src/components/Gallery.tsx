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

interface Testimonial {
    content: string;
    author: string;
    role: string;
    image: string;
}

interface GalleryProps {
    testimonials: Testimonial[];
}

export default function Gallery({ testimonials }: GalleryProps) {
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
                    {testimonials.map((testimonial, index) => (
                        <CarouselItem key={index}>
                            <Card className='relative h-96 md:h-[600px] overflow-hidden'>
                                <Image
                                    src={testimonial.image}
                                    alt={`${testimonial.author}'s testimonial`}
                                    fill
                                    className='object-cover'
                                />
                                <CardContent className='absolute bottom-0 left-0 right-0 flex flex-col items-center p-2 text-center bg-black/60'>
                                    <p className='text-lg text-white mb-4'>{testimonial.content}</p>
                                    <div className='hidden md:block'>
                                        <p className='font-semibold text-white'>{testimonial.author}</p>
                                        <p className='text-gray-200 text-sm'>{testimonial.role}</p>
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
                {testimonials.map((_, index) => (
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
