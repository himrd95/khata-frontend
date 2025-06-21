import * as React from "react";
import { Dialog } from "@mui/material";

export default function SimpleDialog({ isOpen, handleClose, content }) {
    return (
        <div>
            <Dialog onClose={handleClose} open={isOpen}>
                {content}
            </Dialog>
        </div>
    );
}
