'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useCoachMark } from '@/hooks/useCoachMark';

type CoachMarkContextType = ReturnType<typeof useCoachMark>;

const CoachMarkContext = createContext<CoachMarkContextType | undefined>(undefined);

export function CoachMarkProvider({ children }: { children: ReactNode }) {
    const coachMarkHook = useCoachMark();

    return (
        <CoachMarkContext.Provider value={coachMarkHook}>
            {children}
            {/* Render the CoachMark component here so it's available throughout the app */}
            <coachMarkHook.CoachMark />
        </CoachMarkContext.Provider>
    );
}

export function useCoachMarkContext() {
    const context = useContext(CoachMarkContext);
    if (context === undefined) {
        throw new Error('useCoachMarkContext must be used within a CoachMarkProvider');
    }
    return context;
}
