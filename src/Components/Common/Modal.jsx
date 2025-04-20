import React, { useContext } from "react";
import { Dialog, DialogContent } from "@mui/material";
import { provider } from "../../Context/ContextPovider";

const Modal = () => {
    const { isDialogOpen, dialogContent, onModalClose } = useContext(provider);

    return (
        <Dialog
            open={isDialogOpen}
            onClose={onModalClose}
            maxWidth="sm"
            fullWidth
        >
            <DialogContent>{dialogContent}</DialogContent>
        </Dialog>
    );
};

export default Modal;
