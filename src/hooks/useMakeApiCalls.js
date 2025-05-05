import { useCallback, useContext, useMemo } from "react";
import axios from "axios";
import { getUrl } from "../utils/helpers";
import { useNavigate } from "react-router";
import { provider } from "../Context/ContextPovider";
import { BASE_URL } from "../constants";

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
        async (payload, msg, redirectIfUserExist) => {
            try {
                const url = getUrl();
                setIsModalLoading(true);
                const response = await axios.post(url, payload, headers);

                if (response.status === 200) {
                    redirectIfUserExist(response.data.id);
                } else {
                    setUsers([...response.data]);
                    showSnackbar(msg);
                }
            } catch (error) {
                console.error("POST request failed:", error.message);
                navigate("/error404");
            } finally {
                setIsModalLoading(false);
            }
        },
        [headers, navigate, setIsModalLoading, setUsers, showSnackbar]
    );

    const patchRequest = useCallback(
        async (id, payload) => {
            try {
                setRefreshProfile(true);
                const url = `${BASE_URL}/register/update/${id}`;

                const response = await axios.patch(url, payload);
                console.log(response.data, "response");
                const updatedAdminPannel = {
                    ...adminPannel,
                    admin: response.data,
                };
                setAdminPannel(updatedAdminPannel);
                localStorage.setItem(
                    "khata",
                    JSON.stringify(updatedAdminPannel)
                );
            } catch (error) {
                console.error("PATCH request failed:", error);
                showSnackbar("Something went wrong", "error");
            } finally {
                setRefreshProfile(false);
            }
        },
        [adminPannel, setAdminPannel, setRefreshProfile, showSnackbar]
    );

    const putRequest = useCallback(
        async (id, payload, msg, { shouldPageReload = false }) => {
            try {
                if (shouldPageReload) {
                    setRefreshProfile(true);
                } else {
                    setIsModalLoading(true);
                }

                const url = getUrl(id);
                console.log(id, url);
                const response = await axios.put(url, payload, headers);
                setUsers([...response.data]);
                setCurrentUser(response.data.find((user) => user._id === id));
            } catch (error) {
                console.error("PATCH request failed:", error);
                navigate("/error404");
            } finally {
                if (shouldPageReload) {
                    setRefreshProfile(false);
                } else {
                    setIsModalLoading(false);
                }
                showSnackbar(msg);
            }
        },
        [
            headers,
            navigate,
            setCurrentUser,
            setIsModalLoading,
            setRefreshProfile,
            setUsers,
            showSnackbar,
        ]
    );

    const deleteRequest = useCallback(
        async (id, msg) => {
            try {
                const url = getUrl(id);
                setIsLoading(true);
                const response = await axios.delete(url, headers);

                setUsers([...response.data]);
            } catch (error) {
                console.error("DELETE request failed:", error);
                navigate("/error404");
            } finally {
                setIsLoading(false);
                showSnackbar(msg);
            }
        },
        [headers, navigate, setIsLoading, setUsers, showSnackbar]
    );

    return {
        getRequest,
        postRequest,
        putRequest,
        deleteRequest,
        patchRequest,
    };
};

export default useMakeApiCalls;
