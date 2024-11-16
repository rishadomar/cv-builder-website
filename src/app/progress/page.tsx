// src/app/builder/page.tsx
'use client';
import ProgressSteps from '@/components/ProgressSteps';
import withAuth from '@/components/withAuth';

const BuilderPage: React.FC = () => {
    return <ProgressSteps />;
};

export default withAuth(BuilderPage);
