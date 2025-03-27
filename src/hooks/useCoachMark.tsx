import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

type CoachMarkPosition = 'top' | 'bottom' | 'left' | 'right';
type CoachMarkStyle = 'speech' | 'tooltip' | 'spotlight' | 'pulse';

interface CoachMarkOptions {
    position?: CoachMarkPosition;
    style?: CoachMarkStyle;
    offset?: number;
    autoClose?: number;
    onClose?: () => void;
    showCloseButton?: boolean;
    className?: string;
    zIndex?: number;
    arrow?: boolean;
    maxWidth?: string; // Added option to control max width
}

const defaultOptions: CoachMarkOptions = {
    position: 'top',
    style: 'speech',
    offset: 12,
    showCloseButton: true,
    autoClose: 8000,
    zIndex: 2000,
    arrow: true,
    maxWidth: '280px' // Default max width
};

export function useCoachMark(initialVisible = false) {
    const [isVisible, setIsVisible] = useState(initialVisible);
    const [targetElementId, setTargetElementId] = useState<string | null>(null);
    const [message, setMessage] = useState<React.ReactNode>(null);
    const [options, setOptions] = useState<CoachMarkOptions>(defaultOptions);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Function to clear any existing timeout
    const clearCoachMarkTimeout = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    }, []);

    // Function to show the coachmark
    const showCoachMark = useCallback(
        (elementId: string, content: React.ReactNode, customOptions?: CoachMarkOptions) => {
            clearCoachMarkTimeout();
            setTargetElementId(elementId);
            setMessage(content);
            setOptions((prev) => ({ ...prev, ...(customOptions || {}) }));
            setIsVisible(true);
            
            // Set up auto-close timeout if specified
            const autoCloseDelay = customOptions?.autoClose || options.autoClose;
            if (autoCloseDelay) {
                timeoutRef.current = setTimeout(() => {
                    hideCoachMark();
                }, autoCloseDelay);
            }
        },
        [clearCoachMarkTimeout, options.autoClose]
    );

    // Function to hide the coachmark
    const hideCoachMark = useCallback(() => {
        clearCoachMarkTimeout();
        setIsVisible(false);
        
        // Optional: If you want to completely reset the state after it's hidden
        // setTimeout(() => {
        //     setTargetElementId(null);
        //     setMessage(null);
        // }, 300); // Matches your transition duration
    }, [clearCoachMarkTimeout]);

    // Clean up on unmount
    useEffect(() => {
        return clearCoachMarkTimeout;
    }, [clearCoachMarkTimeout]);

    const CoachMarkComponent = useCallback(() => {
        if (!isVisible || !targetElementId || !message) {
            return null;
        }

        const targetElement = document.getElementById(targetElementId);
        if (!targetElement) {
            console.error(`[CoachMark] Error: Target element with ID "${targetElementId}" not found during render`);
            return null;
        }

        // Calculate position relative to the target element
        const targetRect = targetElement.getBoundingClientRect();
        const { position, offset, showCloseButton, zIndex, arrow, maxWidth } = options;

        // Get viewport dimensions
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Determine if we're on a mobile device (viewport width less than 640px)
        const isMobile = viewportWidth < 640;

        // Padding from edges - increase for mobile devices
        const edgePadding = isMobile ? 12 : 16;

        let positionStyle: React.CSSProperties = {};
        let arrowStyle: React.CSSProperties = {};

        // Default coachmark dimensions - adjust for mobile
        const effectiveMaxWidth = isMobile
            ? Math.min(parseInt(maxWidth || '280', 10), viewportWidth - edgePadding * 2)
            : parseInt(maxWidth || '280', 10);

        const coachMarkWidth = Math.min(effectiveMaxWidth, viewportWidth - edgePadding * 2);
        const coachMarkHalfWidth = coachMarkWidth / 2;

        // Calculate position based on the specified position and handle edge cases
        switch (position) {
            case 'top': {
                // Calculate initial position
                let leftPos = targetRect.left + targetRect.width / 2;

                // For mobile devices, if the element is near the right edge,
                // try to position coach mark more to the left
                if (isMobile && targetRect.right > viewportWidth - 80) {
                    leftPos = Math.max(
                        coachMarkHalfWidth + edgePadding,
                        Math.min(leftPos, viewportWidth - coachMarkHalfWidth - edgePadding)
                    );
                }
                // For mobile devices, if the element is near the left edge,
                // try to position coach mark more to the right
                else if (isMobile && targetRect.left < 80) {
                    leftPos = Math.max(
                        coachMarkHalfWidth + edgePadding,
                        Math.min(viewportWidth - coachMarkHalfWidth - edgePadding, leftPos)
                    );
                }
                // Standard edge adjustment
                else {
                    if (leftPos - coachMarkHalfWidth < edgePadding) {
                        // Too close to left edge
                        leftPos = edgePadding + coachMarkHalfWidth;
                    } else if (leftPos + coachMarkHalfWidth > viewportWidth - edgePadding) {
                        // Too close to right edge
                        leftPos = viewportWidth - edgePadding - coachMarkHalfWidth;
                    }
                }

                positionStyle = {
                    bottom: window.innerHeight - targetRect.top + (offset || 0),
                    left: leftPos,
                    transform: 'translateX(-50%)',
                    maxWidth: `${effectiveMaxWidth}px`
                };

                // Adjust arrow to point to the button even when coach mark is shifted
                const arrowLeftOffset = ((targetRect.left + targetRect.width / 2 - leftPos) / coachMarkWidth) * 100;
                arrowStyle = {
                    bottom: -8,
                    left: `calc(50% + ${arrowLeftOffset}%)`,
                    transform: 'translateX(-50%) rotate(45deg)',
                    backgroundColor: 'var(--coachmark-bg, hsl(var(--primary)))'
                };
                break;
            }
            case 'bottom': {
                // Calculate initial position
                let leftPos = targetRect.left + targetRect.width / 2;

                // For mobile devices, if the element is near the right edge,
                // try to position coach mark more to the left
                if (isMobile && targetRect.right > viewportWidth - 80) {
                    leftPos = Math.max(coachMarkHalfWidth + edgePadding, Math.min(viewportWidth / 2, leftPos));
                }
                // For mobile devices, if the element is near the left edge,
                // try to position coach mark more to the right
                else if (isMobile && targetRect.left < 80) {
                    leftPos = Math.max(coachMarkHalfWidth + edgePadding, Math.min(viewportWidth / 2, leftPos + 40));
                }
                // Standard edge adjustment
                else {
                    if (leftPos - coachMarkHalfWidth < edgePadding) {
                        // Too close to left edge
                        leftPos = edgePadding + coachMarkHalfWidth;
                    } else if (leftPos + coachMarkHalfWidth > viewportWidth - edgePadding) {
                        // Too close to right edge
                        leftPos = viewportWidth - edgePadding - coachMarkHalfWidth;
                    }
                }

                positionStyle = {
                    top: targetRect.bottom + (offset || 0),
                    left: leftPos,
                    transform: 'translateX(-50%)',
                    maxWidth: `${effectiveMaxWidth}px`
                };

                // Adjust arrow to point to the button even when coach mark is shifted
                const arrowLeftOffset = ((targetRect.left + targetRect.width / 2 - leftPos) / coachMarkWidth) * 100;
                // Clamp the arrow offset to make sure it stays within the coach mark
                const clampedArrowOffset = Math.max(-40, Math.min(40, arrowLeftOffset));

                arrowStyle = {
                    top: -8,
                    left: `calc(50% + ${clampedArrowOffset}%)`,
                    transform: 'translateX(-50%) rotate(45deg)',
                    backgroundColor: 'var(--coachmark-bg, hsl(var(--primary)))'
                };
                break;
            }
            case 'left': {
                // Calculate vertical center alignment
                let topPos = targetRect.top + targetRect.height / 2;

                // Handle potential overflow on small screens
                if (isMobile) {
                    // Calculate coach mark height (approximation)
                    const estimatedHeight = 80; // Minimal approximation
                    const coachMarkHalfHeight = estimatedHeight / 2;

                    // Adjust when close to top or bottom edges
                    if (topPos - coachMarkHalfHeight < edgePadding) {
                        topPos = edgePadding + coachMarkHalfHeight;
                    } else if (topPos + coachMarkHalfHeight > viewportHeight - edgePadding) {
                        topPos = viewportHeight - edgePadding - coachMarkHalfHeight;
                    }
                }

                positionStyle = {
                    top: topPos,
                    right: viewportWidth - targetRect.left + (offset || 0),
                    transform: 'translateY(-50%)',
                    maxWidth: `${effectiveMaxWidth}px`
                };

                // Arrow positioning
                const arrowTopOffset = ((targetRect.top + targetRect.height / 2 - topPos) / coachMarkWidth) * 100;
                // Clamp the arrow offset to make sure it stays within the coach mark
                const clampedArrowOffset = Math.max(-40, Math.min(40, arrowTopOffset));

                arrowStyle = {
                    right: -8,
                    top: `calc(50% + ${clampedArrowOffset}%)`,
                    transform: 'translateY(-50%) rotate(45deg)',
                    backgroundColor: 'var(--coachmark-bg, hsl(var(--primary)))'
                };
                break;
            }
            case 'right': {
                // Calculate vertical center alignment
                let topPos = targetRect.top + targetRect.height / 2;

                // Handle potential overflow on small screens
                if (isMobile) {
                    // Calculate coach mark height (approximation)
                    const estimatedHeight = 80; // Minimal approximation
                    const coachMarkHalfHeight = estimatedHeight / 2;

                    // Adjust when close to top or bottom edges
                    if (topPos - coachMarkHalfHeight < edgePadding) {
                        topPos = edgePadding + coachMarkHalfHeight;
                    } else if (topPos + coachMarkHalfHeight > viewportHeight - edgePadding) {
                        topPos = viewportHeight - edgePadding - coachMarkHalfHeight;
                    }
                }

                positionStyle = {
                    top: topPos,
                    left: targetRect.right + (offset || 0),
                    transform: 'translateY(-50%)',
                    maxWidth: `${effectiveMaxWidth}px`
                };

                // Arrow positioning
                const arrowTopOffset = ((targetRect.top + targetRect.height / 2 - topPos) / coachMarkWidth) * 100;
                // Clamp the arrow offset to make sure it stays within the coach mark
                const clampedArrowOffset = Math.max(-40, Math.min(40, arrowTopOffset));

                arrowStyle = {
                    left: -8,
                    top: `calc(50% + ${clampedArrowOffset}%)`,
                    transform: 'translateY(-50%) rotate(45deg)',
                    backgroundColor: 'var(--coachmark-bg, hsl(var(--primary)))'
                };
                break;
            }
        }

        // For speech bubble and tooltip styles
        return createPortal(
            <div
                className={`fixed z-[1000] ${options.className || ''}`}
                style={{
                    ...positionStyle,
                    backgroundColor: 'var(--coachmark-bg, hsl(var(--primary)))',
                    color: 'var(--coachmark-text, white)',
                    padding: '0.75rem 1rem',
                    borderRadius: '0.375rem',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    zIndex: zIndex || 1000,
                    minWidth: isMobile ? `${coachMarkWidth}px` : 'auto',
                    width: isMobile ? `${coachMarkWidth}px` : 'fit-content'
                }}
            >
                {arrow && <div className='absolute w-4 h-4' style={arrowStyle} />}
                {showCloseButton && (
                    <button
                        className='absolute top-2 right-2 text-white/80 hover:text-white'
                        onClick={() => {
                            hideCoachMark();
                            if (options.onClose) options.onClose();
                        }}
                    >
                        <X size={16} />
                    </button>
                )}
                <div className={showCloseButton ? 'pr-6' : ''}>{message}</div>
            </div>,
            document.body
        );
    }, [isVisible, targetElementId, message, options, hideCoachMark]);

    // Add a window resize handler to reposition the coachmark
    useEffect(() => {
        const handleResize = () => {
            if (isVisible) {
                // Trigger a re-render by updating options slightly
                setOptions((prev) => ({ ...prev }));
            }
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [isVisible]);

    return {
        isVisible,
        showCoachMark,
        hideCoachMark,
        CoachMark: CoachMarkComponent
    };
}
