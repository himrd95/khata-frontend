import React, { memo, useCallback, useContext } from "react";
import { Button, DialogActions } from "@material-ui/core";
import useMakeApiCalls from "../../hooks/useMakeApiCalls";
import { provider } from "../../Context/ContextPovider";

const DeleteConfirmation = ({
    handleClose,
    label,
    index,
    mode,
    closeAccount,
    deleteConfirmation,
    id,
    transactionAmount,
}) => {
    const { currentUser, setCurrentUser } = useContext(provider);
    const { putRequest } = useMakeApiCalls();

    const handleDelete = useCallback(async () => {
        if (closeAccount) {
            deleteConfirmation(id);
            setCurrentUser({});
        } else {
            const updatedUser = { ...currentUser };
            delete updatedUser.userImage;
            const key = mode.toLowerCase();

            updatedUser[key].splice(index, 1);

            const msg = `Successfully deleted the transaction of ${transactionAmount}`;
            await putRequest(updatedUser._id, updatedUser, msg, {});
            handleClose();
        }
    }, [
        closeAccount,
        currentUser,
        deleteConfirmation,
        handleClose,
        id,
        index,
        mode,
        putRequest,
        setCurrentUser,
        transactionAmount,
    ]);

    return (
        <div className="deletePopup">
            <div className="confirmationTitle" dangerouslySetInnerHTML={{ __html: label }} />
            <div className="apple-buttons">
                <button type="button" className="cancel" onClick={handleClose}>
                    Cancel
                </button>
                <button
                    type="submit"
                    className="update"
                    onClick={handleDelete}
                    style={{ background: "#e53935" }}
                >
                    Yes
                </button>
            </div>
        </div>
    );
};

export default memo(DeleteConfirmation);
