import { useCallback, useContext, useMemo } from "react";
import axios from "axios";
import { getUrl } from "../utils/helpers";
import { useNavigate } from "react-router";
import { provider } from "../Context/ContextPovider";

const useMakeApiCalls = () => {
    const { setIsLoading, setUsers, adminPannel, handleState, setCurrentUser } =
        useContext(provider);
    const navigate = useNavigate();
    const headers = useMemo(
        () => ({
            headers: {
                Authorization: "Bearer " + adminPannel.token,
            },
        }),
        [adminPannel.token]
    );

    const getRequest = useCallback(
        async (id) => {
            try {
                const url = getUrl();
                setIsLoading(true);
                const response = await axios.get(url, headers);

                const data = response?.data;
                !data && navigate("/error404");

                if (id) {
                    const user = data.find((user) => user._id === id);
                    setCurrentUser(user);
                }
                setUsers([...response.data]);
            } catch (error) {
                console.error("GET request failed:", error);
                navigate("/error404");
            } finally {
                setIsLoading(false);
            }
        },
        [headers, navigate, setCurrentUser, setIsLoading, setUsers]
    );

    const postRequest = useCallback(
        async (payload) => {
            try {
                const url = getUrl();
                setIsLoading(true);
                const response = await axios.post(url, payload, headers);
                setUsers([...response.data]);
            } catch (error) {
                console.error("POST request failed:", error);
                navigate("/error404");
            } finally {
                setIsLoading(false);
            }
        },
        [headers, navigate, setIsLoading, setUsers]
    );

    const putRequest = useCallback(
        async (id, payload) => {
            try {
                const url = getUrl(id);
                console.log(id, url);
                const response = await axios.put(url, payload, headers);
                setUsers([...response.data]);
                handleState("User has been successfully updated");
            } catch (error) {
                console.error("PATCH request failed:", error);
                navigate("/error404");
            }
        },
        [handleState, headers, navigate, setUsers]
    );

    const deleteRequest = useCallback(
        async (id) => {
            try {
                const url = getUrl(id);
                setIsLoading(true);
                const response = await axios.delete(url, headers);

                setUsers([...response.data]);
                handleState("User has been successfully deleted");
            } catch (error) {
                console.error("DELETE request failed:", error);
                navigate("/error404");
            } finally {
                setIsLoading(false);
            }
        },
        [handleState, headers, navigate, setIsLoading, setUsers]
    );

    return {
        getRequest,
        postRequest,
        putRequest,
        deleteRequest,
    };
};

export default useMakeApiCalls;
