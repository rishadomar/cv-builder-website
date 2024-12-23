import React from 'react';
import { TermsSection } from '../terms/TermsSection';

const PrivacyStatement: React.FC = () => (
    <div className='space-y-4 text-sm sm:text-base leading-relaxed'>
        <h1 className='text-2xl font-bold mb-3'>Privacy Statement</h1>
        <h2>Effective Date: 1 December 2024 </h2>
        <TermsSection title='1. Your privacy' description='Your privacy is important to us.' />
        <TermsSection
            title='2. Data collection'
            description='We collect personal information when you use our service. This information is used to provide you with the service you requested.'
        />
        <TermsSection
            title='3. Data storage'
            lines={[
                'We only retain collected information for as long as necessary to provide you with your requested service.',
                'What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.'
            ]}
        />
        <TermsSection
            title='4. Data sharing'
            lines={[
                'We don’t share any personally identifying information publicly or with third-parties, except when required to by law.',
                'Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.'
            ]}
        />

        <TermsSection
            title='5. Data retention'
            lines={[
                'When you cancel your account, we will delete all personal information we have stored about you. Currently, there is no automated method to do this. Contact me via email to do this.'
            ]}
        />

        <TermsSection
            title='6. Use of external sites'
            lines={[
                'Our website may link to external sites that are not operated by us.',
                'Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.'
            ]}
        />

        <TermsSection
            title='7. Your rights'
            lines={[
                'You have the right to request access to the personal information we store about you, with the understanding that we may be unable to provide you with some of your desired services.'
            ]}
        />

        <TermsSection
            title='8. Changes to this policy'
            lines={[
                'We reserve the right to make changes to this policy at any time. You are encouraged to review this policy regularly.'
            ]}
        />

        <TermsSection
            title='9. Acceptance of this policy'
            lines={[
                'Your continued use of our website will be regarded as acceptance of our practices around privacy and personal information.'
            ]}
        />
    </div>
);

export default PrivacyStatement;
