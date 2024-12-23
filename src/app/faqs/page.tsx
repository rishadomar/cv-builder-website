import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircleIcon } from 'lucide-react';
import { BackButton } from '@/components/BackButton';

// FAQ Item Type
interface FAQItem {
    id: string;
    question: string;
    answer: string;
}

// Reusable FAQ Component
const FAQSection: React.FC<{
    title?: string;
    description?: string;
    faqs: FAQItem[];
}> = ({
    title = 'Frequently Asked Questions',
    description = 'Find answers to common questions about our service',
    faqs
}) => {
    return (
        <div className='w-full max-w-2xl mx-auto pt-20 pb-4 px-4'>
            <div className='text-center mb-10'>
                <h1 className='text-3xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3'>
                    <HelpCircleIcon className='w-8 h-8 text-primary' />
                    {title}
                </h1>
                <p className='text-gray-600 max-w-xl mx-auto'>{description}</p>
            </div>

            <Accordion type='single' collapsible className='w-full space-y-4'>
                {faqs.map((faq) => (
                    <AccordionItem key={faq.id} value={faq.id} className='border border-gray-200 rounded-lg'>
                        <AccordionTrigger className='px-6 py-4 hover:bg-gray-50 transition-colors'>
                            {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className='px-6 py-4 text-gray-600'>{faq.answer}</AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
};

// Page Component
const FAQPage = () => {
    // Sample FAQs - replace with your actual content
    const cvBuilderFAQs: FAQItem[] = [
        {
            id: 'payment',
            question: 'How much does the CV builder cost?',
            answer: 'We offer a one-time payment of R59 for a full year of access to our CV management platform.'
        },
        {
            id: 'editing',
            question: 'Can I edit my CV multiple times?',
            answer: 'Yes! You can edit your CV unlimited times during your one-year access period.'
        },
        {
            id: 'templates',
            question: 'How many CV templates are available?',
            answer: 'Currently only a very simple template is offered - over the coming weeks more templates will be added. You will have access to any new templates.'
        },
        {
            id: 'download',
            question: 'Can I download my CV?',
            answer: 'Absolutely! You can download your CV in PDF format as many times as you need.'
        },
        {
            id: 'support',
            question: 'Do you offer customer support?',
            answer: 'Yes, we provide customer support via email. Our team is dedicated to helping you create the perfect CV. Send an email to: techsolns4+support@gmail.com'
        }
    ];

    return (
        <div className='min-h-screen bg-gray-50'>
            <FAQSection
                title='CV Builder FAQs'
                description="Got questions about our CV management platform? We've got answers!"
                faqs={cvBuilderFAQs}
            />
            <BackButton />
        </div>
    );
};

export default FAQPage;
