import axios from "axios";
import React, { createContext, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { BASE_URL } from "../constants";

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

    const navigate = useNavigate();

    const getUsers = useCallback(
        (id) => {
            setIsLoading(true);

            let url;
            if (id) url = `${BASE_URL}/users/${id}`;
            else url = `${BASE_URL}/users/`;
            const headers = {
                headers: {
                    Authorization: "Bearer " + adminPannel.token,
                },
            };
            axios
                .get(url, headers)
                .then((res) => {
                    console.log(res.data);
                    if (id) {
                        !res.data && navigate("/error404");
                        setCurrentUser({ ...res.data });
                    } else {
                        setUsers([...res.data]);
                    }
                })
                .catch((e) => navigate("/error404"))
                .finally(() => setIsLoading(false));
        },
        [adminPannel.token, navigate]
    );

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
        getUsers,
    };
    return <provider.Provider value={value}>{children}</provider.Provider>;
};

export default ContextPovider;
