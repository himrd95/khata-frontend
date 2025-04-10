import React, {
    useContext,
    useEffect,
    useCallback,
    useState,
    memo,
} from "react";
import axios from "axios";
import { Snackbar, Alert as MuiAlert } from "@mui/material";

import "./Dashboard.css";
import { provider } from "../../Context/ContextPovider";
import { BASE_URL, EVENTS } from "../../constants";

import UserDetailsCard from "../UserDetails/UserDetailsCard";
import DetailsCard from "../DetailsCard/DetailsCard";
import SimpleDialog from "../Modal";
import NewUser from "../Table/NewUser";
import eventBus from "../../utils/eventBus";
import useMakeApiCalls from "../../hooks/useMakeApiCalls";

const Alert = React.forwardRef((props, ref) => (
    <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

const Dashboard = () => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogContent, setDialogContent] = useState("");

    const { getRequest } = useMakeApiCalls();

    const {
        setMessage,
        message,
        adminPannel,
        handleState,
        users,
        getUsers,
        isLoading,
        setIsLoading,
        setUsers,
    } = useContext(provider);

    useEffect(() => {
        if (!users.length) getRequest();
    }, [getRequest, getUsers, users.length]);

    useEffect(() => {
        if (message) setOpenSnackbar(true);
    }, [message]);

    const handleClose = useCallback(() => {
        setOpenSnackbar(false);
        setIsDialogOpen(false);
        handleState("");
        setMessage("");
    }, [handleState, setMessage]);

    const handleAddUser = useCallback(
        async ({ name, profile }) => {
            setIsLoading(true);
            const formData = new FormData();
            formData.append("name", name);
            formData.append("userImage", profile);

            try {
                await axios
                    .post(`${BASE_URL}/users`, formData, {
                        headers: {
                            Authorization: `Bearer ${adminPannel.token}`,
                        },
                    })
                    .then((res) => {
                        handleState("User has been successfully added");
                        setUsers([...res.data]);
                    });
            } catch (error) {
                console.error("Add user failed:", error);
            } finally {
                setIsLoading(false);
                handleClose();
            }
        },
        [adminPannel.token, handleClose, handleState, setIsLoading, setUsers]
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
        return (
            <div className="loadingAnimation">
                <lottie-player
                    src="https://assets4.lottiefiles.com/packages/lf20_cj0prrgw.json"
                    background="transparent"
                    speed="1"
                    style={{ width: "50%" }}
                    loop
                    autoplay
                ></lottie-player>
            </div>
        );
    }

    return (
        <div>
            <DetailsCard />
            {users.map((user) => (
                <UserDetailsCard key={user.id} {...user} />
            ))}

            <Snackbar
                open={openSnackbar}
                autoHideDuration={5000}
                onClose={handleClose}
            >
                <Alert
                    severity="success"
                    onClose={handleClose}
                    sx={{ width: "100%" }}
                >
                    {message}!
                </Alert>
            </Snackbar>

            <SimpleDialog
                isOpen={isDialogOpen}
                handleClose={handleClose}
                content={dialogContent}
            />
        </div>
    );
};

export default memo(Dashboard);
