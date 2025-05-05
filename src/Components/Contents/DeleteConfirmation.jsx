import React, { memo, useCallback, useContext } from "react";
import {
    Button,
    capitalize,
    DialogActions,
    DialogTitle,
} from "@material-ui/core";
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

    const handleDelete = useCallback(() => {
        if (closeAccount) {
            deleteConfirmation(id);
            setCurrentUser({});
        } else {
            const updatedUser = { ...currentUser };
            const key = mode.toLowerCase();

            updatedUser[key].splice(index, 1);

            const msg = `Successfully deleted the transaction of ${transactionAmount}`;
            putRequest(updatedUser._id, updatedUser, msg, {});
            setCurrentUser({ ...updatedUser });
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
            <div className="confirmationTitle">{label}</div>
            <DialogActions>
                <Button variant="contained" onClick={handleClose}>
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={handleDelete}
                    style={{ color: "red" }}
                >
                    Yes
                </Button>
            </DialogActions>
        </div>
    );
};

export default memo(DeleteConfirmation);
