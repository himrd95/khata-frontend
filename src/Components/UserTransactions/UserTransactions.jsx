import { Alert, Snackbar } from "@mui/material";
import React, { useContext, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import { COLORS, EVENTS } from "../../constants";
import { provider } from "../../Context/ContextPovider";
import eventBus from "../../utils/eventBus";
import { compareDate } from "../../utils/helpers";
import DeleteConfirmation from "../Contents/DeleteConfirmation";
import DetailsCard from "../DetailsCard/DetailsCard";
import SimpleDialog from "../Modal";
import DataCard from "./DataCard";
import "./UserTransactions.css";
import useMakeApiCalls from "../../hooks/useMakeApiCalls";

const UserTransactions = () => {
    const {
        handleState,
        message,
        getUsers,
        isLoading,
        currentUser,
        totalAmount,
    } = useContext(provider);

    const [open, setOpen] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(false);
    const [content, setContent] = React.useState("");

    const params = useParams();
    const navigate = useNavigate();

    const { deleteRequest, putRequest, getRequest } = useMakeApiCalls();

    const { name, given, taken, userImage, _id } = currentUser;

    useEffect(() => {
        if (!name) {
            getRequest(params.id);
        }

        const refreshHandler = () => getUsers(params.id);
        eventBus.on(EVENTS.REFRESH_USER, refreshHandler);

        return () => {
            eventBus.remove(EVENTS.REFRESH_USER, refreshHandler); // cleanup
        };
    }, [getUsers, given, taken, name, params.id, getRequest]);

    const handleClose = useCallback(() => {
        setIsOpen(false);
        setOpen(false);
        handleState("");
    }, [handleState]);

    const deleteConfirmation = useCallback(
        (id) => {
            handleClose();
            deleteRequest(id);
            navigate("/");
        },
        [deleteRequest, handleClose, navigate]
    );

    const deleteUser = useCallback(
        (id, name) => {
            setIsOpen(true);
            setContent(
                <DeleteConfirmation
                    label={`Do you really want to close account with ${name}`}
                    handleClose={handleClose}
                    deleteConfirmation={deleteConfirmation}
                    id={id}
                    closeAccount={true}
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
            putRequest(_id, payload);
        },
        [_id, putRequest]
    );

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
        <>
            <div className="main extraMargin">
                <div className="basicCard actions">
                    <span>Edit</span>
                    <span onClick={() => deleteUser(_id, name)}>Delete</span>
                </div>

                <DataCard
                    data={given?.sort((a, b) =>
                        compareDate(a.updatedAt, b.updatedAt)
                    )}
                    title="Given (Debit)"
                    total={totalAmount.given}
                    bgColor={COLORS.GIVEN_HEADER_BG}
                    id={_id}
                    name={name}
                    updateRequest={updateRequest}
                    modalStatus={isOpen}
                />
                <DataCard
                    data={taken?.sort((a, b) => compareDate(a.date, b.date))}
                    title="Taken (Credit)"
                    total={totalAmount.taken}
                    bgColor={COLORS.TAKEN_HEADER_BG}
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
        </>
    );
};

export default React.memo(UserTransactions);
