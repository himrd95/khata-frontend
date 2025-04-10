import React, { createContext, useEffect, useState } from "react";
import { calculateTotal } from "../utils/helpers";

export const provider = createContext();

const preToken = JSON.parse(localStorage.getItem("khata")) || {
    token: "",
    admin: {},
    voice: false,
};
const ContextPovider = ({ children }) => {
    const [state, setState] = useState(false);
    const [users, setUsers] = React.useState([]);
    const [message, setMessage] = useState("");
    const [error, setError] = useState({ message: "", open: false });
    const [loginPopup, setLoginPopup] = useState(false);
    const [adminPannel, setAdminPannel] = useState(preToken);
    const [isLoading, setIsLoading] = React.useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [addTransaction, setAddTransaction] = useState(false);
    const [shouldFetchUsers, setShouldFetchUsers] = useState(false);
    const [totalAmount, setTotalAmount] = useState({ given: 0, taken: 0 });

    useEffect(() => {
        localStorage.setItem("khata", JSON.stringify(adminPannel));
    }, [adminPannel]);

    const handleState = (msg) => {
        setState(!state);
        setMessage(msg);
    };

    React.useEffect(() => {
        setTimeout(() => {
            setLoginPopup(false);
        }, 1000);
    }, [loginPopup]);

    useEffect(() => {
        if (currentUser) {
            setTotalAmount({
                given: calculateTotal(currentUser.given),
                taken: calculateTotal(currentUser.taken),
            });
        }
    }, [currentUser, currentUser.given, currentUser.taken]);

    const value = {
        state,
        handleState,
        message,
        setMessage,
        adminPannel,
        setAdminPannel,
        loginPopup,
        setLoginPopup,
        isLoading,
        setIsLoading,
        error,
        setError,
        currentUser,
        setCurrentUser,
        addTransaction,
        setAddTransaction,
        users,
        setUsers,
        shouldFetchUsers,
        setShouldFetchUsers,
        totalAmount,
        setTotalAmount,
    };
    return <provider.Provider value={value}>{children}</provider.Provider>;
};

export default ContextPovider;
