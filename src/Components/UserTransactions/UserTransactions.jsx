import { Alert, Snackbar } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useCallback, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import { BASE_URL, EVENTS } from "../../constants";
import { provider } from "../../Context/ContextPovider";
import eventBus from "../../utils/eventBus";
import { compareDate } from "../../utils/helpers";
import DeleteConfirmation from "../Contents/DeleteConfirmation";
import DetailsCard from "../DetailsCard/DetailsCard";
import SimpleDialog from "../Modal";
import BottomNav from "../Navbar/BottomNav";
import DataCard from "./DataCard";
import "./UserTransactions.css";

const UserTransactions = () => {
    const {
        adminPannel,
        handleState,
        message,
        getUsers,
        isLoading,
        currentUser,
    } = useContext(provider);
    const [open, setOpen] = React.useState(false);
    const params = useParams();
    const [isOpen, setIsOpen] = React.useState(false);
    const [content, setContent] = React.useState("");
    const navigate = useNavigate();

    const { name, given, taken, userImage, totalGiven, totalTaken, _id } =
        currentUser;

    const givenRef = useRef(totalGiven);
    const takenRef = useRef(totalTaken);

    useEffect(() => {
        let sum1 = 0;
        given?.map((a) => (sum1 += Number(a.actualPrice) - Number(a.paid)));
        givenRef.current = sum1;

        let sum2 = 0;
        taken?.map((a) => (sum2 += Number(a.actualPrice) - Number(a.paid)));
        takenRef.current = sum2;

        if (!name) {
            getUsers(params.id);
        }

        eventBus.on(EVENTS.REFRESH_USER, () => {
            getUsers(params.id);
        });
    }, [
        currentUser,
        getUsers,
        given,
        name,
        params.id,
        taken,
        totalGiven,
        totalTaken,
    ]);

    const handleClose = useCallback(() => {
        setIsOpen(false);
        setOpen(false);
        handleState("");
    }, [handleState]);

    const deleteConfirmation = useCallback(
        (id) => {
            handleClose();
            const url = `${BASE_URL}/users/${id}`;
            const headers = {
                headers: {
                    Authorization: "Bearer " + adminPannel.token,
                },
            };
            axios
                .delete(url, headers)
                .then(() => handleState("User has been successfully deleted"))
                .catch((e) => console.log(e))
                .finally(() => navigate("/"));
        },
        [adminPannel.token, handleClose, handleState, navigate]
    );

    const deleteUser = useCallback(
        (id, name) => {
            console.log("delete");
            setIsOpen(true);
            setContent(
                <DeleteConfirmation
                    lable={`Do you really want to close account with ${name}`}
                    handleClose={handleClose}
                    deleteConfirmation={deleteConfirmation}
                    id={id}
                />
            );
        },
        [deleteConfirmation, handleClose]
    );

    useEffect(() => {
        message !== "" && setOpen(true);
    }, [message]);

    const updateRequest = useCallback(
        (payload) => {
            setIsOpen(false);
            const url = `${BASE_URL}/users/${_id}`;
            const headers = {
                headers: {
                    Authorization: "Bearer " + adminPannel.token,
                },
            };
            axios
                .patch(url, payload, headers)
                .then((res) => {
                    handleState("User has been successfully updated");
                })
                .catch((e) => console.log(e))
                .finally(() => {
                    getUsers(_id);
                });
        },
        [_id, adminPannel.token, handleState, getUsers]
    );

    return isLoading ? (
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
    ) : (
        <>
            <div className="main">
                <DetailsCard userName={name} profilePic={userImage} />

                <div className="basicCard actions">
                    <span>Edit</span>
                    <span onClick={() => deleteUser(_id, name)}>Delete</span>
                </div>

                <DataCard
                    data={given?.sort((a, b) => compareDate(a.date, b.date))}
                    title="Given (Debit)"
                    total={givenRef.current}
                    bgColor="#c5e1a5"
                    id={_id}
                    name={name}
                    updateRequest={updateRequest}
                    modalStatus={isOpen}
                />
                <DataCard
                    data={taken?.sort((a, b) => compareDate(a.date, b.date))}
                    title="Taken (Credit)"
                    total={takenRef.current}
                    bgColor="#ffcdd2"
                    id={_id}
                    name={name}
                    updateRequest={updateRequest}
                    modalStatus={isOpen}
                />

                <div style={{ height: "100px" }}></div>

                <Snackbar
                    open={open}
                    autoHideDuration={5000}
                    onClose={handleClose}
                >
                    <Alert
                        onClose={handleClose}
                        severity="success"
                        sx={{ width: "100%" }}
                    >
                        {message}!
                    </Alert>
                </Snackbar>

                <SimpleDialog
                    isOpen={isOpen}
                    handleClose={handleClose}
                    content={content}
                />
            </div>
            <BottomNav />
        </>
    );
};

export default React.memo(UserTransactions);
