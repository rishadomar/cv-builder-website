import { useEffect, useState, useRef, useCallback } from 'react';
import { UseFormReturn } from 'react-hook-form';

type TypewriterOptions = {
    initialDelay?: number; // Delay before typing starts
    typeDelay?: number; // Delay between characters
    fieldDelay?: number; // Delay between fields
    onComplete?: () => void; // Callback when typing completes
};

/**
 * A hook that creates a typewriter effect for filling form fields
 *
 * @param formHook - The react-hook-form useForm hook return value
 * @param data - Object containing the demo data to type (keys must match form field names)
 * @param options - Configuration options for the typewriter effect
 */
export function useTypewriterEffect<
    TFormValues extends Record<string, any>,
    TDemoData extends Partial<Record<keyof TFormValues, string>>
>(formHook: UseFormReturn<TFormValues>, data: TDemoData, options: TypewriterOptions = {}) {
    const { initialDelay = 1000, typeDelay = 50, fieldDelay = 800, onComplete } = options;

    const [typing, setTyping] = useState(false);
    const [completed, setCompleted] = useState(false);

    // Use refs to prevent duplicate executions
    const hasStartedRef = useRef(false);
    const isTypingRef = useRef(false);
    const completedRef = useRef(false);
    // Use NodeJS.Timeout to accommodate both browser and Node environments
    const timeoutsRef = useRef<(NodeJS.Timeout | number)[]>([]);

    // Cleanup function to clear all timeouts
    const clearAllTimeouts = useCallback(() => {
        timeoutsRef.current.forEach((id) => clearTimeout(id as any));
        timeoutsRef.current = [];
    }, []);

    // Start typing after initial delay
    useEffect(() => {
        // Prevent duplicate execution
        if (hasStartedRef.current) return;
        hasStartedRef.current = true;

        const timer = setTimeout(() => {
            setTyping(true);
        }, initialDelay);

        timeoutsRef.current.push(timer);

        return () => clearAllTimeouts();
    }, [initialDelay, clearAllTimeouts]);

    // Handle the typewriter effect
    useEffect(() => {
        if (!typing || isTypingRef.current || completedRef.current) return;

        // Mark that we're now typing to prevent duplicate execution
        isTypingRef.current = true;

        const fields = Object.keys(data) as Array<keyof TDemoData>;

        // Function to type one character at a time for a specific field
        const typeField = (fieldIndex: number, charIndex: number) => {
            // Guard against unmounted component
            if (completedRef.current) return;

            if (fieldIndex >= fields.length) {
                setTyping(false);
                setCompleted(true);
                completedRef.current = true;
                if (onComplete) onComplete();
                return;
            }

            const field = fields[fieldIndex];
            const value = data[field];

            if (typeof value === 'string' && charIndex <= value.length) {
                // Set the partial value for this field
                formHook.setValue(field as any, value.substring(0, charIndex) as any);

                // Schedule the next character
                const charTimeout = setTimeout(() => {
                    typeField(fieldIndex, charIndex + 1);
                }, typeDelay);

                timeoutsRef.current.push(charTimeout);
            } else {
                // This field is complete, move to the next field
                const fieldTimeout = setTimeout(() => {
                    typeField(fieldIndex + 1, 0);
                }, fieldDelay);

                timeoutsRef.current.push(fieldTimeout);
            }
        };

        // Start typing the first field
        typeField(0, 0);

        // Cleanup function
        return () => {
            clearAllTimeouts();
            isTypingRef.current = false;
        };
    }, [typing, formHook, data, typeDelay, fieldDelay, onComplete, clearAllTimeouts]);

    return {
        typing,
        completed,
        reset: useCallback(() => {
            // Reset the hook state to allow restarting the animation
            clearAllTimeouts();
            setTyping(false);
            setCompleted(false);
            hasStartedRef.current = false;
            isTypingRef.current = false;
            completedRef.current = false;
        }, [clearAllTimeouts]),
        activeField: typing && !completed // You can expand this to track the active field name if needed
    };
}
