import { useEffect, useRef } from 'react';

// Global request management
const globalPendingRequests = new Map();
const globalRequestQueue = [];
let isProcessingGlobalQueue = false;

// Process global request queue
const processGlobalQueue = async () => {
    if (isProcessingGlobalQueue || globalRequestQueue.length === 0) {
        return;
    }

    isProcessingGlobalQueue = true;

    while (globalRequestQueue.length > 0) {
        const request = globalRequestQueue.shift();
        try {
            await request.execute();
        } catch (error) {
            console.error("Global queue request failed:", error);
        }
    }

    isProcessingGlobalQueue = false;
};

// Add request to global queue
export const addToGlobalQueue = (request) => {
    return new Promise((resolve, reject) => {
        globalRequestQueue.push({
            execute: async () => {
                try {
                    const result = await request();
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            }
        });
        processGlobalQueue();
    });
};

// Cancel global request
export const cancelGlobalRequest = (key) => {
    const controller = globalPendingRequests.get(key);
    if (controller) {
        controller.abort();
        globalPendingRequests.delete(key);
    }
};

// Execute global request with deduplication
export const executeGlobalRequest = async (method, url, data = null, options = {}) => {
    const requestKey = `${method}:${url}:${JSON.stringify(data)}`;
    
    // Cancel existing request with same key
    cancelGlobalRequest(requestKey);
    
    // Create new abort controller
    const controller = new AbortController();
    globalPendingRequests.set(requestKey, controller);
    
    try {
        const config = {
            ...options,
            signal: controller.signal,
        };
        
        let response;
        switch (method.toLowerCase()) {
            case 'get':
                response = await fetch(url, { ...config, method: 'GET' });
                break;
            case 'post':
                response = await fetch(url, { 
                    ...config, 
                    method: 'POST',
                    body: data instanceof FormData ? data : JSON.stringify(data),
                    headers: data instanceof FormData ? {} : { 'Content-Type': 'application/json' }
                });
                break;
            case 'put':
                response = await fetch(url, { 
                    ...config, 
                    method: 'PUT',
                    body: data instanceof FormData ? data : JSON.stringify(data),
                    headers: data instanceof FormData ? {} : { 'Content-Type': 'application/json' }
                });
                break;
            case 'patch':
                response = await fetch(url, { 
                    ...config, 
                    method: 'PATCH',
                    body: data instanceof FormData ? data : JSON.stringify(data),
                    headers: data instanceof FormData ? {} : { 'Content-Type': 'application/json' }
                });
                break;
            case 'delete':
                response = await fetch(url, { ...config, method: 'DELETE' });
                break;
            default:
                throw new Error(`Unsupported HTTP method: ${method}`);
        }
        
        globalPendingRequests.delete(requestKey);
        return response;
    } catch (error) {
        globalPendingRequests.delete(requestKey);
        if (error.name === 'AbortError') {
            throw new Error('Request was cancelled');
        }
        throw error;
    }
};

// Cleanup all global requests
export const cancelAllGlobalRequests = () => {
    globalPendingRequests.forEach((controller) => {
        controller.abort();
    });
    globalPendingRequests.clear();
    globalRequestQueue.length = 0;
    isProcessingGlobalQueue = false;
};

// Hook for component-level cleanup
const useApiCleanup = () => {
    const cleanupRef = useRef(null);

    useEffect(() => {
        // Store cleanup function reference
        cleanupRef.current = cancelAllGlobalRequests;

        // Return cleanup function
        return () => {
            if (cleanupRef.current) {
                cleanupRef.current();
            }
        };
    }, []);

    return {
        cancelAllGlobalRequests,
        addToGlobalQueue,
        executeGlobalRequest,
        cancelGlobalRequest
    };
};

export default useApiCleanup; 