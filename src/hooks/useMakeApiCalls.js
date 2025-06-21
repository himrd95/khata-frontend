import { useCallback, useContext, useMemo, useRef } from "react";
import axios from "axios";
import { getUrl, isEmpty } from "../utils/helpers";
import { useNavigate } from "react-router";
import { provider } from "../Context/ContextPovider";
import { BASE_URL } from "../constants";

// Global request lock to ensure only one request at a time
let isRequestInProgress = false;
let currentRequestController = null;
let requestQueue = [];
let isProcessingQueue = false;
let lastRequestKey = null;
let lastRequestTime = 0;
let requestCounter = 0;
let activeRequests = new Set();

const useMakeApiCalls = () => {
    const {
        setIsLoading,
        setUsers,
        adminPannel,
        setAdminPannel,
        setCurrentUser,
        showSnackbar,
        setIsModalLoading,
        setRefreshProfile,
    } = useContext(provider);

    const navigate = useNavigate();
    
    const headers = useMemo(
        () => ({
            headers: {
                Authorization: "Bearer " + adminPannel.token,
            },
        }),
        [adminPannel.token]
    );

    // Generate request key for deduplication
    const getRequestKey = useCallback((method, url, data = null) => {
        const dataStr = data instanceof FormData ? 'FormData' : JSON.stringify(data);
        return `${method}:${url}:${dataStr}`;
    }, []);

    // Check if request should be skipped (cooldown + deduplication)
    const shouldSkipRequest = useCallback((requestKey) => {
        const now = Date.now();
        const timeSinceLastRequest = now - lastRequestTime;
        
        // Skip if same request within 500ms
        if (requestKey && requestKey === lastRequestKey && timeSinceLastRequest < 500) {
            console.log(`Skipping request: same request within cooldown period (${timeSinceLastRequest}ms)`);
            return true;
        }
        
        // Skip if any request within 100ms (general cooldown)
        if (timeSinceLastRequest < 100) {
            console.log(`Skipping request: general cooldown period (${timeSinceLastRequest}ms)`);
            return true;
        }
        
        return false;
    }, []);

    // Process the request queue
    const processQueue = useCallback(async () => {
        if (isProcessingQueue || requestQueue.length === 0 || isRequestInProgress) {
            console.log(`Queue processing skipped: isProcessing=${isProcessingQueue}, queueLength=${requestQueue.length}, inProgress=${isRequestInProgress}`);
            return;
        }

        console.log(`Starting queue processing. Queue length: ${requestQueue.length}`);
        isProcessingQueue = true;

        while (requestQueue.length > 0 && !isRequestInProgress) {
            const request = requestQueue.shift();
            console.log(`Processing request from queue. Remaining: ${requestQueue.length}`);
            try {
                await request.execute();
            } catch (error) {
                console.error("Queue request failed:", error);
            }
        }

        isProcessingQueue = false;
        console.log("Queue processing completed");
    }, []);

    // Add request to global queue with deduplication
    const addToQueue = useCallback((request, requestKey = null) => {
        const requestId = ++requestCounter;
        console.log(`Adding request to queue. ID: ${requestId}, Key: ${requestKey}, LastKey: ${lastRequestKey}`);
        
        // Check if request should be skipped
        if (shouldSkipRequest(requestKey)) {
            console.log(`Request skipped due to cooldown/deduplication. ID: ${requestId}`);
            return Promise.resolve();
        }

        return new Promise((resolve, reject) => {
            requestQueue.push({
                id: requestId,
                execute: async () => {
                    try {
                        console.log(`Executing queued request. ID: ${requestId}`);
                        lastRequestKey = requestKey;
                        lastRequestTime = Date.now();
                        activeRequests.add(requestId);
                        const result = await request();
                        activeRequests.delete(requestId);
                        lastRequestKey = null;
                        console.log(`Queued request completed. ID: ${requestId}`);
                        resolve(result);
                    } catch (error) {
                        activeRequests.delete(requestId);
                        lastRequestKey = null;
                        console.error(`Queued request failed. ID: ${requestId}`, error);
                        reject(error);
                    }
                }
            });
            console.log(`Request added to queue. ID: ${requestId}, Queue length: ${requestQueue.length}`);
            processQueue();
        });
    }, [processQueue, shouldSkipRequest]);

    // Execute a single request with global lock
    const executeRequest = useCallback(async (method, url, data = null, options = {}) => {
        const requestId = ++requestCounter;
        console.log(`executeRequest called. ID: ${requestId}, Method: ${method}, URL: ${url}, InProgress: ${isRequestInProgress}`);
        
        // If a request is already in progress, wait for it to complete
        if (isRequestInProgress) {
            console.log(`Request in progress, waiting... ID: ${requestId}`);
            return new Promise((resolve, reject) => {
                const checkInterval = setInterval(() => {
                    if (!isRequestInProgress) {
                        clearInterval(checkInterval);
                        console.log(`Previous request completed, executing new request. ID: ${requestId}`);
                        executeRequest(method, url, data, options)
                            .then(resolve)
                            .catch(reject);
                    }
                }, 100);
            });
        }

        // Set global lock
        isRequestInProgress = true;
        console.log(`Global lock acquired. ID: ${requestId}`);
        
        // Create abort controller for this request
        const controller = new AbortController();
        currentRequestController = controller;
        
        try {
            const config = {
                ...options,
                signal: controller.signal,
                ...headers
            };
            
            console.log(`Executing ${method.toUpperCase()} request to ${url}. ID: ${requestId}`);
            
            let response;
            switch (method.toLowerCase()) {
                case 'get':
                    response = await axios.get(url, config);
                    break;
                case 'post':
                    response = await axios.post(url, data, config);
                    break;
                case 'put':
                    response = await axios.put(url, data, config);
                    break;
                case 'patch':
                    response = await axios.patch(url, data, config);
                    break;
                case 'delete':
                    response = await axios.delete(url, config);
                    break;
                default:
                    throw new Error(`Unsupported HTTP method: ${method}`);
            }
            
            console.log(`${method.toUpperCase()} request completed successfully. ID: ${requestId}`);
            return response;
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log(`Request was cancelled. ID: ${requestId}`);
                throw new Error('Request was cancelled');
            }
            console.error(`${method.toUpperCase()} request failed. ID: ${requestId}`, error);
            throw error;
        } finally {
            // Release global lock
            isRequestInProgress = false;
            currentRequestController = null;
            console.log(`Global lock released. ID: ${requestId}`);
            
            // Process next request in queue
            setTimeout(() => {
                processQueue();
            }, 0);
        }
    }, [headers, processQueue]);

    const getRequest = useCallback(
        async (id) => {
            const requestId = ++requestCounter;
            console.log(`getRequest called. ID: ${requestId}, UserID: ${id}`);
            
            const url = getUrl();
            const requestKey = getRequestKey('GET', url, id);
            
            // Check if request should be skipped
            if (shouldSkipRequest(requestKey)) {
                console.log(`getRequest skipped due to cooldown/deduplication. ID: ${requestId}`);
                return Promise.resolve();
            }
            
            return addToQueue(async () => {
                try {
                    setIsLoading(true);
                    const response = await executeRequest('GET', url);

                    const data = response?.data;
                    !data && navigate("/error404");

                    if (id) {
                        const user = data.find((user) => user._id === id);
                        setCurrentUser(user);
                    }
                    setUsers([...response.data]);
                    return response;
                } catch (error) {
                    console.error("GET request failed:", error);
                    navigate("/error404");
                    throw error;
                } finally {
                    setIsLoading(false);
                }
            }, requestKey);
        },
        [addToQueue, executeRequest, navigate, setCurrentUser, setIsLoading, setUsers, getRequestKey, shouldSkipRequest]
    );

    const postRequest = useCallback(
        async (payload, msg, redirectIfUserExist) => {
            const requestId = ++requestCounter;
            console.log(`postRequest called. ID: ${requestId}`);
            
            const url = getUrl();
            const requestKey = getRequestKey('POST', url, payload);
            
            return addToQueue(async () => {
                try {
                    setIsModalLoading(true);
                    const response = await executeRequest('POST', url, payload);

                    if (response.status === 200) {
                        redirectIfUserExist(response.data.id);
                    } else {
                        setUsers([...response.data]);
                        showSnackbar(msg);
                    }
                    return response;
                } catch (error) {
                    console.error("POST request failed:", error.message);
                    navigate("/error404");
                    throw error;
                } finally {
                    setIsModalLoading(false);
                }
            }, requestKey);
        },
        [addToQueue, executeRequest, navigate, setIsModalLoading, setUsers, showSnackbar, getRequestKey]
    );

    const patchRequest = useCallback(
        async (id, payload) => {
            const requestId = ++requestCounter;
            console.log(`patchRequest called. ID: ${requestId}, UserID: ${id}`);
            
            const url = `${BASE_URL}/register/update/${id}`;
            const requestKey = getRequestKey('PATCH', url, payload);
            
            return addToQueue(async () => {
                try {
                    setRefreshProfile(true);
                    const response = await executeRequest('PATCH', url, payload);
                    if (!isEmpty(response.data.user)) {
                        const updatedAdminPannel = {
                            ...adminPannel,
                            admin: response.data.user,
                        };
                        setAdminPannel({ ...updatedAdminPannel });
                        localStorage.setItem(
                            "khata-2.0",
                            JSON.stringify(updatedAdminPannel)
                        );
                    }
                    return response;
                } catch (error) {
                    console.error("PATCH request failed:", error);
                    showSnackbar("Something went wrong", "error");
                    throw error;
                } finally {
                    setRefreshProfile(false);
                }
            }, requestKey);
        },
        [addToQueue, executeRequest, adminPannel, setAdminPannel, setRefreshProfile, showSnackbar, getRequestKey]
    );

    const putRequest = useCallback(
        async (id, payload, msg, { shouldPageReload = false } = {}) => {
            const requestId = ++requestCounter;
            console.log(`putRequest called. ID: ${requestId}, UserID: ${id}`);
            
            const url = getUrl(id);
            const requestKey = getRequestKey('PATCH', url, payload);
            
            return addToQueue(async () => {
                try {
                    if (shouldPageReload) {
                        setRefreshProfile(true);
                    } else {
                        setIsModalLoading(true);
                    }

                    console.log(id, url);
                    const response = await executeRequest('PATCH', url, payload);
                    setUsers([...response.data]);
                    setCurrentUser(response.data.find((user) => user._id === id));
                    return response;
                } catch (error) {
                    console.error("PATCH request failed:", error);
                    navigate("/error404");
                    throw error;
                } finally {
                    if (shouldPageReload) {
                        setRefreshProfile(false);
                    } else {
                        setIsModalLoading(false);
                    }
                    showSnackbar(msg);
                }
            }, requestKey);
        },
        [
            addToQueue,
            executeRequest,
            navigate,
            setCurrentUser,
            setIsModalLoading,
            setRefreshProfile,
            setUsers,
            showSnackbar,
            getRequestKey
        ]
    );

    const deleteRequest = useCallback(
        async (id, msg) => {
            const requestId = ++requestCounter;
            console.log(`deleteRequest called. ID: ${requestId}, UserID: ${id}`);
            
            const url = getUrl(id);
            const requestKey = getRequestKey('DELETE', url, id);
            
            return addToQueue(async () => {
                try {
                    setIsLoading(true);
                    const response = await executeRequest('DELETE', url);

                    setUsers([...response.data]);
                    return response;
                } catch (error) {
                    console.error("DELETE request failed:", error);
                    navigate("/error404");
                    throw error;
                } finally {
                    setIsLoading(false);
                    showSnackbar(msg);
                }
            }, requestKey);
        },
        [addToQueue, executeRequest, navigate, setIsLoading, setUsers, showSnackbar, getRequestKey]
    );

    // Cleanup function to cancel all pending requests
    const cancelAllRequests = useCallback(() => {
        console.log("Cancelling all requests...");
        if (currentRequestController) {
            currentRequestController.abort();
            currentRequestController = null;
        }
        isRequestInProgress = false;
        requestQueue = [];
        isProcessingQueue = false;
        lastRequestKey = null;
        lastRequestTime = 0;
        activeRequests.clear();
        console.log("All requests cancelled");
    }, []);

    return {
        getRequest,
        postRequest,
        putRequest,
        deleteRequest,
        patchRequest,
        cancelAllRequests,
    };
};

export default useMakeApiCalls;
