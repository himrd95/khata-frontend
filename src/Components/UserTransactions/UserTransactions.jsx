import React, { useContext, useEffect, useCallback } from "react";
import { useParams } from "react-router";
import { COLORS, EVENTS } from "../../constants";
import { provider } from "../../Context/ContextPovider";
import eventBus from "../../utils/eventBus";
import { capitalize, compareDate } from "../../utils/helpers";
import DeleteConfirmation from "../Contents/DeleteConfirmation";
import DataCard from "./DataCard";
import "./UserTransactions.css";
import useMakeApiCalls from "../../hooks/useMakeApiCalls";
import { useSwipe } from "../../hooks/useSwipe";
import SimpleDialog from "../Modal";
import Shimmer from "../Shimmer/Shimmer";

const UserTransactions = () => {
    const { getUsers, isLoading, currentUser, totalAmount, setCurrentUser } =
        useContext(provider);

    const [isOpen, setIsOpen] = React.useState(false);
    const [content, setContent] = React.useState("");

    const params = useParams();

    const { deleteRequest, putRequest, getRequest } = useMakeApiCalls();

    const { name, given, taken, _id } = currentUser;

    const handleSwipeRight = () => {
        setCurrentUser({});
    };

    const swipeHandlers = useSwipe(handleSwipeRight);

    // Simple scroll to top on mount
    useEffect(() => {
        try {
            window.scrollTo(0, 0);
        } catch (error) {
            console.error("Scroll error:", error);
        }
    }, []);

    useEffect(() => {
        const refreshHandler = () => getUsers(params.id);
        eventBus.on(EVENTS.REFRESH_USER, refreshHandler);

        return () => {
            eventBus.remove(EVENTS.REFRESH_USER, refreshHandler); // cleanup
        };
    }, [getUsers, given, taken, name, params.id, getRequest]);

    const handleClose = useCallback(() => {
        setIsOpen(false);
    }, []);

    const handleEdit = useCallback(() => {
        eventBus.dispatch(EVENTS.ADD_NEW_USER, name);
    }, [name]);

    const deleteConfirmation = useCallback(
        (id) => {
            handleClose();
            const msg = `Account has been closed with ${capitalize(
                currentUser.name
            )}`;
            deleteRequest(id, msg);
            setCurrentUser({});
        },
        [currentUser.name, deleteRequest, handleClose, setCurrentUser]
    );

    const deleteUser = useCallback(
        (id, name) => {
            setIsOpen(true);
            setContent(
                <DeleteConfirmation
                    label={`Do you really want to close account with ${capitalize(
                        name
                    )}`}
                    handleClose={handleClose}
                    deleteConfirmation={deleteConfirmation}
                    id={id}
                    closeAccount={true}
                />
            );
        },
        [deleteConfirmation, handleClose]
    );

    const updateRequest = useCallback(
        async (payload) => {
            const msg = `${currentUser.name}'s account has been updated successfully!`;
            delete payload.userImage;
            await putRequest(_id, payload, msg, {});
        },
        [_id, currentUser.name, putRequest]
    );

    if (isLoading) {
        return <Shimmer />;
    }

    return (
        <>
            <div
                className="main usersDetails"
                onTouchStart={swipeHandlers.onTouchStart}
                onTouchMove={swipeHandlers.onTouchMove}
                onTouchEnd={swipeHandlers.onTouchEnd}
            >
                <div className="basicCard actions">
                    <span onClick={handleEdit}>Edit</span>
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
