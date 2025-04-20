import React, {
    useContext,
    useEffect,
    useCallback,
    useState,
    memo,
} from "react";

import "./Dashboard.css";
import { provider } from "../../Context/ContextPovider";
import { EVENTS } from "../../constants";

import UserDetailsCard from "../UserDetails/UserDetailsCard";
import NewUser from "../Table/NewUser";
import eventBus from "../../utils/eventBus";
import useMakeApiCalls from "../../hooks/useMakeApiCalls";
import SimpleDialog from "../Modal";
import Shimmer from "../Shimmer/Shimmer";
import { capitalize } from "../../utils/helpers";

const Dashboard = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogContent, setDialogContent] = useState("");

    const { getRequest, postRequest } = useMakeApiCalls();

    const {
        setMessage,
        handleState,
        users,
        getUsers,
        isLoading,
        setCurrentUser,
        showSnackbar,
    } = useContext(provider);

    useEffect(() => {
        if (!users.length) getRequest();
    }, [getRequest, getUsers, users.length]);

    const handleClose = useCallback(() => {
        setIsDialogOpen(false);
        handleState("");
        setMessage("");
    }, [handleState, setMessage]);

    const redirectIfUserExist = useCallback(
        (id) => {
            const user = users.find((data) => data._id === id);
            setCurrentUser(user);
            showSnackbar(
                `You already have account with ${capitalize(user.name)}.`
            );
        },
        [setCurrentUser, showSnackbar, users]
    );

    const handleAddUser = useCallback(
        async ({ name, profile }) => {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("userImage", profile);

            const snackbarMsg = `User "${name}" has been added successfully!`;
            await postRequest(formData, snackbarMsg, redirectIfUserExist);
            setIsDialogOpen(false);
            setDialogContent(null);
        },
        [postRequest, redirectIfUserExist]
    );

    const addNewUser = useCallback(() => {
        setDialogContent(
            <NewUser handleClose={handleClose} handleAddUser={handleAddUser} />
        );
        setIsDialogOpen(true);
    }, [handleAddUser, handleClose]);

    useEffect(() => {
        eventBus.on(EVENTS.ADD_NEW_USER, addNewUser);
        return () => eventBus.remove(EVENTS.ADD_NEW_USER, addNewUser);
    }, [addNewUser]);

    if (isLoading) {
        return <Shimmer />;
    }

    return (
        <>
            <div className="usersDetails usersCards">
                {users.map((user) => (
                    <UserDetailsCard key={user.id} {...user} />
                ))}
                <br />
                <br />
            </div>

            <SimpleDialog
                isOpen={isDialogOpen}
                handleClose={handleClose}
                content={dialogContent}
            />
        </>
    );
};

export default memo(Dashboard);
