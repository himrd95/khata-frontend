import { useRef } from "react";

export const useSwipe = ( onSwipeRight) => {
    const touchStartX = useRef(null);

    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const diffX = touchStartX.current - touchEndX;

         if (diffX < -50) {
            // Swiped right
            onSwipeRight?.();
        }
    };

    return {
        onTouchStart: handleTouchStart,
        onTouchEnd: handleTouchEnd,
    };
};
