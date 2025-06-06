import React, { useContext, useEffect, useCallback, useMemo } from "react";
import { useParams } from "react-router";
import { ADD_CTA_BG_GRADIENT, COLORS, EVENTS } from "../../constants";
import { provider } from "../../Context/ContextPovider";
import eventBus from "../../utils/eventBus";
import { capitalize, compareDate } from "../../utils/helpers";
import DeleteConfirmation from "../Contents/DeleteConfirmation";
import DataCard from "./DataCard";
import "./UserTransactions.css";
import useMakeApiCalls from "../../hooks/useMakeApiCalls";
import { useSwipe } from "../../hooks/useSwipe";
import SimpleDialog from "../Modal";
import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% {
    background-position: 200% center;
  }
  100% {
    background-position: -200% center;
  }
`;

const ShimmerText = styled.span`
    background: linear-gradient(
        45deg,
        rgb(138, 143, 192) 0%,
        rgb(255, 255, 255) 50%,
        rgb(131, 136, 184) 100%
    );
    background-size: 200% auto;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    animation: ${shimmer} 2s linear infinite;
    display: inline-block;
`;

const EmptyStateContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 20px;
    text-align: center;
    border-radius: 12px;
    margin: 20px auto;
    max-width: 100%;
`;

const EmptyStateIcon = styled.div`
    font-size: 48px;
    color: #666;
    margin-bottom: 16px;
`;

const EmptyStateTitle = styled.h3`
    color: #333;
    font-size: 20px;
    margin-bottom: 8px;
    font-weight: 600;
`;

const EmptyStateMessage = styled.p`
    color: #666;
    font-size: 16px;
    line-height: 1.5;
    margin-bottom: 16px;
`;

const EmptyStateAction = styled.button`
    background: ${ADD_CTA_BG_GRADIENT};
    color: white;
    border: none;
    padding: 12px 20px;
    border-radius: 12px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;

    &:active {
        transform: translateY(0);
    }
`;

const UserTransactions = () => {
    const { getUsers, currentUser, totalAmount, setCurrentUser } =
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
                    label={`Do you really want to close account with <b>${capitalize(
                        name
                    )}</b>? This action cannot be undone.`}
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

    const isEmpty = given?.length === 0 && taken?.length === 0;

    const EmptyState = useMemo(() => {
        return (
            <EmptyStateContainer>
                <EmptyStateIcon>📝</EmptyStateIcon>
                <EmptyStateTitle>No Transactions Yet</EmptyStateTitle>
                <EmptyStateMessage>
                    Start tracking your transactions with {capitalize(name)}.
                    Add your first debit or credit entry to begin managing your
                    financial records.
                </EmptyStateMessage>
                <EmptyStateAction
                    onClick={() =>
                        eventBus.dispatch(EVENTS.ADD_NEW_TRANSACTION, true)
                    }
                >
                    <ShimmerText>Add First Transaction</ShimmerText>
                </EmptyStateAction>
            </EmptyStateContainer>
        );
    }, [name]);

    return (
        <>
            <div
                className="main usersDetails"
                onTouchStart={swipeHandlers.onTouchStart}
                onTouchMove={swipeHandlers.onTouchMove}
                onTouchEnd={swipeHandlers.onTouchEnd}
            >
                <div className="basicCard actions">
                    <span onClick={handleEdit}>Edit Profile</span>
                    <span onClick={() => deleteUser(_id, name)}>
                        Delete Profile
                    </span>
                </div>

                {isEmpty ? EmptyState : null}

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
