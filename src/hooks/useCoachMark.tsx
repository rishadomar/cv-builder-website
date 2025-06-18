import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

type CoachMarkPosition = 'top' | 'bottom' | 'left' | 'right';
type CoachMarkStyle = 'speech' | 'tooltip' | 'spotlight' | 'pulse';

interface CoachMarkOptions {
    position?: CoachMarkPosition;
    style?: CoachMarkStyle;
    offset?: number;
    autoClose?: number | false;
    onClose?: () => void;
    showCloseButton?: boolean;
    className?: string;
    zIndex?: number;
    arrow?: boolean;
    maxWidth?: string;
}

const defaultOptions: CoachMarkOptions = {
    position: 'top',
    style: 'speech',
    offset: 12,
    showCloseButton: true,
    autoClose: 8000,
    zIndex: 2000,
    arrow: true,
    maxWidth: '280px'
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

            const autoCloseDelay = customOptions?.hasOwnProperty('autoClose')
                ? customOptions.autoClose
                : options.autoClose;

            if (autoCloseDelay !== false && typeof autoCloseDelay === 'number') {
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

        // Improved responsive breakpoints and width calculation
        const getResponsiveConfig = () => {
            if (viewportWidth < 640) {
                // Mobile
                return {
                    isMobile: true,
                    edgePadding: 12,
                    maxWidthPx: Math.min(320, viewportWidth - 24),
                    widthPercentage: 0.9
                };
            } else if (viewportWidth < 768) {
                // Small tablet
                return {
                    isMobile: false,
                    edgePadding: 16,
                    maxWidthPx: Math.min(360, viewportWidth * 0.8),
                    widthPercentage: 0.8
                };
            } else if (viewportWidth < 1024) {
                // Medium screens (including 808px) - keep similar to mobile
                return {
                    isMobile: false,
                    edgePadding: 20,
                    maxWidthPx: Math.min(360, viewportWidth - 40), // Fixed width similar to mobile
                    widthPercentage: 0.6
                };
            } else {
                // Large screens
                return {
                    isMobile: false,
                    edgePadding: 24,
                    maxWidthPx: parseInt(maxWidth || '280', 10),
                    widthPercentage: 0.5
                };
            }
        };

        const config = getResponsiveConfig();
        const { isMobile, edgePadding, maxWidthPx } = config;

        let positionStyle: React.CSSProperties = {};
        let arrowStyle: React.CSSProperties = {};

        // Calculate effective width based on screen size and content
        const baseWidth = Math.min(maxWidthPx, viewportWidth - edgePadding * 2);
        const coachMarkWidth = Math.max(200, baseWidth); // Minimum width of 200px
        const coachMarkHalfWidth = coachMarkWidth / 2;

        // Calculate position based on the specified position and handle edge cases
        switch (position) {
            case 'top': {
                let leftPos = targetRect.left + targetRect.width / 2;

                // Improved edge detection and positioning
                const minLeft = edgePadding + coachMarkHalfWidth;
                const maxLeft = viewportWidth - edgePadding - coachMarkHalfWidth;

                // Special handling for elements near edges
                if (targetRect.left < edgePadding) {
                    leftPos = minLeft;
                } else if (targetRect.right > viewportWidth - edgePadding) {
                    leftPos = maxLeft;
                } else {
                    // Clamp to safe bounds
                    leftPos = Math.max(minLeft, Math.min(maxLeft, leftPos));
                }

                positionStyle = {
                    bottom: window.innerHeight - targetRect.top + (offset || 0),
                    left: leftPos,
                    transform: 'translateX(-50%)',
                    width: `${coachMarkWidth}px`,
                    maxWidth: `${coachMarkWidth}px`
                };

                // Calculate arrow position relative to target
                const targetCenter = targetRect.left + targetRect.width / 2;
                const arrowLeftOffset = ((targetCenter - leftPos) / coachMarkWidth) * 100;
                const clampedArrowOffset = Math.max(-40, Math.min(40, arrowLeftOffset));

                arrowStyle = {
                    bottom: -8,
                    left: `calc(50% + ${clampedArrowOffset}%)`,
                    transform: 'translateX(-50%) rotate(45deg)',
                    backgroundColor: 'var(--coachmark-bg, hsl(var(--primary)))'
                };
                break;
            }
            case 'bottom': {
                let leftPos = targetRect.left + targetRect.width / 2;

                // Improved edge detection and positioning
                const minLeft = edgePadding + coachMarkHalfWidth;
                const maxLeft = viewportWidth - edgePadding - coachMarkHalfWidth;

                // Special handling for elements near edges
                if (targetRect.left < edgePadding) {
                    leftPos = minLeft;
                } else if (targetRect.right > viewportWidth - edgePadding) {
                    leftPos = maxLeft;
                } else {
                    // Clamp to safe bounds
                    leftPos = Math.max(minLeft, Math.min(maxLeft, leftPos));
                }

                positionStyle = {
                    top: targetRect.bottom + (offset || 0),
                    left: leftPos,
                    transform: 'translateX(-50%)',
                    width: `${coachMarkWidth}px`,
                    maxWidth: `${coachMarkWidth}px`
                };

                // Calculate arrow position relative to target
                const targetCenter = targetRect.left + targetRect.width / 2;
                const arrowLeftOffset = ((targetCenter - leftPos) / coachMarkWidth) * 100;
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
                let topPos = targetRect.top + targetRect.height / 2;

                // Estimate coachmark height for vertical positioning
                const estimatedHeight = 100;
                const coachMarkHalfHeight = estimatedHeight / 2;

                const minTop = edgePadding + coachMarkHalfHeight;
                const maxTop = viewportHeight - edgePadding - coachMarkHalfHeight;

                topPos = Math.max(minTop, Math.min(maxTop, topPos));

                positionStyle = {
                    top: topPos,
                    right: viewportWidth - targetRect.left + (offset || 0),
                    transform: 'translateY(-50%)',
                    width: `${coachMarkWidth}px`,
                    maxWidth: `${coachMarkWidth}px`
                };

                const targetCenter = targetRect.top + targetRect.height / 2;
                const arrowTopOffset = ((targetCenter - topPos) / estimatedHeight) * 100;
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
                let topPos = targetRect.top + targetRect.height / 2;

                // Estimate coachmark height for vertical positioning
                const estimatedHeight = 100;
                const coachMarkHalfHeight = estimatedHeight / 2;

                const minTop = edgePadding + coachMarkHalfHeight;
                const maxTop = viewportHeight - edgePadding - coachMarkHalfHeight;

                topPos = Math.max(minTop, Math.min(maxTop, topPos));

                positionStyle = {
                    top: topPos,
                    left: targetRect.right + (offset || 0),
                    transform: 'translateY(-50%)',
                    width: `${coachMarkWidth}px`,
                    maxWidth: `${coachMarkWidth}px`
                };

                const targetCenter = targetRect.top + targetRect.height / 2;
                const arrowTopOffset = ((targetCenter - topPos) / estimatedHeight) * 100;
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

        return createPortal(
            <div
                className={`fixed z-[1000] ${options.className || ''}`}
                style={{
                    ...positionStyle,
                    backgroundColor: 'var(--coachmark-bg, hsl(var(--primary)))',
                    color: 'var(--coachmark-text, white)',
                    padding: '0.75rem 1rem',
                    borderRadius: '0.375rem',
                    boxShadow: '0 10px 15px -3px var(--coachmark-shadow), 0 4px 6px -2px var(--coachmark-shadow)',
                    border: '1px solid var(--coachmark-border)',
                    zIndex: zIndex || 1000,
                    // Ensure consistent sizing
                    boxSizing: 'border-box'
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
