/**
 * Creates a debounced function that delays invoking func until after wait milliseconds
 * have elapsed since the last time the debounced function was invoked.
 * 
 * @param {Function} func - The function to debounce
 * @param {number} wait - The number of milliseconds to delay
 * @param {boolean} immediate - If true, trigger the function on the leading edge
 * @returns {Function} The debounced function
 */
export const debounce = (func, wait, immediate = false) => {
    let timeout;
    
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        
        const callNow = immediate && !timeout;
        
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        
        if (callNow) func(...args);
    };
};

/**
 * Creates a debounced function that can be cancelled
 * 
 * @param {Function} func - The function to debounce
 * @param {number} wait - The number of milliseconds to delay
 * @returns {Object} Object with debounced function and cancel method
 */
export const createDebouncedFunction = (func, wait) => {
    let timeout;
    
    const debouncedFunc = (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
    
    const cancel = () => {
        clearTimeout(timeout);
    };
    
    return {
        debounced: debouncedFunc,
        cancel
    };
};

/**
 * Creates a throttle function that limits the rate at which a function can fire
 * 
 * @param {Function} func - The function to throttle
 * @param {number} limit - The number of milliseconds to throttle by
 * @returns {Function} The throttled function
 */
export const throttle = (func, limit) => {
    let inThrottle;
    
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}; 