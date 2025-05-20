import { useState, useEffect, useContext, useCallback } from "react";
import { provider } from "../Context/ContextPovider";

const timeoutDuration = 3000;
const longTimeoutDuration = 10000;

const warningTexts = [
    "This is taking longer than usual.",
    "Still loading.",
    "Still working on it",
    "This is taking longer than expected.",
    "Working on it",
];

const messages = [
    "things are moving slowly",
    "please bear with us",
    "one moment",
    "Please hold on",
];

const useLoadingTimeout = () => {
    const [showLongerApiCallMessage, setShowLongerApiCallMessage] =
        useState(false);
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const { isLoading } = useContext(provider);

    const warningText = useCallback((warningTexts) => {
        const randomNumber = Math.floor(Math.random() * warningTexts.length);
        return warningTexts[randomNumber];
    }, []);

    useEffect(() => {
        let timeoutId;
        let longTimeoutId;
        
        if (isLoading) {
        timeoutId = setTimeout(() => {
            setShowLongerApiCallMessage(true);
            setTitle(warningText(warningTexts));
            setMessage(warningText(messages));
        }, timeoutDuration);

        longTimeoutId = setTimeout(() => {
            setShowLongerApiCallMessage(true);
            setTitle(warningText(warningTexts));
            setMessage(warningText(messages));
        }, longTimeoutDuration);
        } else {
            setShowLongerApiCallMessage(false);
            setTitle("");
            setMessage("");
        }

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            if (longTimeoutId) {
                clearTimeout(longTimeoutId);
            }
        };
    }, [isLoading, warningText]);

    return { showLongerApiCallMessage, title, message };
};

export default useLoadingTimeout;
