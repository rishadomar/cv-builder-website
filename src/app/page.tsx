import React from 'react';
import Image from 'next/image';
import { Check } from 'lucide-react';
import CallToAction from '@/components/CallToAction';

export default function Home() {
    return (
        <div className='min-h-screen bg-gray-50'>
            {/* Hero Section - Mobile First */}
            <div className='container mx-auto px-4 py-12 lg:py-24 flex flex-col-reverse lg:flex-row items-center'>
                {/* Mobile: Swap image and content order */}
                <div className='w-full lg:w-1/2 mt-8 lg:mt-0 lg:mr-6 flex justify-center'>
                    <Image
                        src='/images/Designer.png'
                        alt='CV Builder Hero'
                        width={500}
                        height={400}
                        className='rounded-xl shadow-lg w-full max-w-md'
                    />
                </div>

                {/* Content */}
                <div className='w-full lg:w-1/2 space-y-6 text-center lg:text-left'>
                    <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight'>
                        Build Your Perfect CV in Minutes
                    </h1>

                    <p className='text-base md:text-lg text-gray-600'>
                        Struggling with CV writing? Our AI-powered CV Builder transforms the most challenging part of
                        job hunting into a simple, stress-free experience.
                    </p>

                    {/* Pricing Highlighted */}
                    <div className='bg-blue-100 inline-block px-4 py-2 rounded-lg'>
                        <span className='text-blue-800 font-bold text-xl'>Only R59</span>
                        <span className='text-gray-600 ml-2 text-sm'>One-time payment</span>
                    </div>

                    <div className='flex justify-center lg:justify-start space-x-4'>
                        <CallToAction label='Start Building Your CV' color='white' withArrow />
                    </div>
                </div>
            </div>

            {/* Mobile-Friendly Pain Points Section */}
            <div className='bg-white py-12'>
                <div className='container mx-auto px-4'>
                    <h2 className='text-2xl md:text-3xl font-bold text-center mb-10'>
                        Why CV Writing is So Challenging
                    </h2>

                    <div className='grid md:grid-cols-3 gap-6'>
                        {[
                            {
                                title: 'Time-Consuming',
                                description:
                                    'Crafting the perfect CV can take hours of meticulous work, researching formats and writing compelling descriptions.'
                            },
                            {
                                title: 'Complex Formatting',
                                description:
                                    'Choosing the right layout, font, and structure that makes your CV stand out is a complex art.'
                            },
                            {
                                title: 'Content Creation',
                                description:
                                    "Articulating your achievements and skills in a way that captures an employer's attention is incredibly difficult."
                            }
                        ].map((point, index) => (
                            <div key={index} className='bg-gray-100 p-5 rounded-lg text-center'>
                                <h3 className='text-lg font-semibold mb-3'>{point.title}</h3>
                                <p className='text-gray-600 text-sm'>{point.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CV Extracts Section - Mobile Responsive */}
            <div className='container mx-auto px-4 py-12'>
                <h2 className='text-2xl md:text-3xl font-bold text-center mb-10'>See the Magic of AI-Generated CVs</h2>

                <div className='grid md:grid-cols-3 gap-6'>
                    {[
                        { src: 'young-graduate.jpeg', width: 400, height: 300, alt: 'Professional CV Extract' },
                        { src: 'young-person-at-new-job.jpeg', width: 400, height: 300, alt: 'Creative CV Design' },
                        { src: 'construction-foreman.jpeg', width: 400, height: 300, alt: 'Modern CV Layout' }
                    ].map((img, index) => (
                        <div key={index} className='rounded-xl overflow-hidden shadow-lg'>
                            <Image
                                src={`/images/${img.src}`}
                                alt={img.alt}
                                width={img.width}
                                height={img.height}
                                className='w-full object-cover'
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Mobile-Friendly Features Section */}
            <div className='bg-gray-100 py-12'>
                <div className='container mx-auto px-4'>
                    <h2 className='text-2xl md:text-3xl font-bold text-center mb-10'>What You Get</h2>

                    <div className='grid md:grid-cols-2 gap-6'>
                        <div className='bg-white p-6 rounded-lg'>
                            <div className='flex items-center mb-4'>
                                <Check className='text-green-500 mr-3' />
                                <h3 className='text-lg font-semibold'>AI-Powered Content</h3>
                            </div>
                            <p className='text-gray-600 text-sm'>
                                Intelligent content generation that highlights your skills and achievements
                            </p>
                        </div>

                        <div className='bg-white p-6 rounded-lg'>
                            <div className='flex items-center mb-4'>
                                <Check className='text-green-500 mr-3' />
                                <h3 className='text-lg font-semibold'>Professional Formatting</h3>
                            </div>
                            <p className='text-gray-600 text-sm'>
                                Sleek, modern design that catches recruiters&quote; attention
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Call to Action - Mobile Optimized */}
            <div className='bg-blue-600 text-white py-12 text-center'>
                <h2 className='text-2xl md:text-4xl font-bold mb-4 px-4'>Ready to Supercharge Your Job Application?</h2>
                <p className='text-base md:text-xl mb-6 px-4'>
                    Build a professional CV for just R59 and take the first step towards your dream job
                </p>
                <CallToAction label='Get Started Now' color='blue' withArrow={false} />
            </div>
        </div>
    );
}
