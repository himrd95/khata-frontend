import React, { memo, useCallback, useContext } from "react";
import { Button, DialogActions, DialogTitle } from "@material-ui/core";
import useMakeApiCalls from "../../hooks/useMakeApiCalls";
import { provider } from "../../Context/ContextPovider";

const DeleteConfirmation = ({ handleClose, label, index, mode }) => {
    const { currentUser, setCurrentUser } = useContext(provider);
    const { putRequest } = useMakeApiCalls();

    const handleDelete = useCallback(() => {
        const updatedUser = { ...currentUser };
        const key = mode.toLowerCase();

        updatedUser[key].splice(index, 1);

        putRequest(updatedUser._id, updatedUser);
        setCurrentUser(updatedUser);
        handleClose();
    }, [currentUser, handleClose, index, mode, putRequest, setCurrentUser]);

    return (
        <div className="deletePopup">
            <DialogTitle>{label}</DialogTitle>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleDelete} style={{ color: "red" }}>
                    Yes
                </Button>
            </DialogActions>
        </div>
    );
};

export default memo(DeleteConfirmation);
