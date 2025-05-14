import { useRef } from "react";

export const useSwipe = (onSwipeRight) => {
    const touchStartX = useRef(null);
    const touchStartY = useRef(null);
    const touchStartTime = useRef(null);
    const touchCount = useRef(0);

    const handleTouchStart = (e) => {
        // Track the number of touch points (fingers)
        touchCount.current = e.touches.length;

        // If more than one finger, it's likely a zoom gesture
        if (touchCount.current > 1) {
            // Reset tracking to prevent swipe during multi-touch
            touchStartX.current = null;
            return;
        }

        // Store the start position and time
        touchStartX.current = e.touches[0].clientX;
        touchStartY.current = e.touches[0].clientY;
        touchStartTime.current = Date.now();
    };

    const handleTouchMove = (e) => {
        // Reset if user adds another finger during the movement (starting a zoom)
        if (e.touches.length > touchCount.current) {
            touchCount.current = e.touches.length;
            touchStartX.current = null;
        }
    };

    const handleTouchEnd = (e) => {
        // Ignore if we don't have a valid starting point or if multiple fingers were used
        if (touchStartX.current === null || touchCount.current > 1) {
            return;
        }

        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        const touchEndTime = Date.now();

        // Calculate horizontal and vertical movement
        const diffX = touchStartX.current - touchEndX;
        const diffY = Math.abs(touchStartY.current - touchEndY);

        // Calculate time and speed
        const elapsedTime = touchEndTime - touchStartTime.current;
        const speedX = Math.abs(diffX) / elapsedTime;

        // Conditions for a valid swipe:
        // 1. Movement is primarily horizontal (horizontal > vertical)
        // 2. Swipe is fast enough to be intentional (not slow like a zoom)
        // 3. Minimum distance threshold is met
        // 4. Not too slow (to differentiate from zoom/pan)
        if (
            Math.abs(diffX) > diffY && // More horizontal than vertical
            Math.abs(diffX) > 80 && // Minimum distance
            speedX > 0.3 && // Fast enough to be a swipe
            elapsedTime < 300 && // Not too slow
            diffX < 0 // Right direction
        ) {
            onSwipeRight?.();
        }
    };

    return {
        onTouchStart: handleTouchStart,
        onTouchMove: handleTouchMove,
        onTouchEnd: handleTouchEnd,
    };
};
