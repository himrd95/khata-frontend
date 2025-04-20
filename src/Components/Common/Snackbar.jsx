import React, { useContext } from "react";
import { Alert, Snackbar as MuiSnackbar } from "@mui/material";
import { provider } from "../../Context/ContextPovider";

const Snackbar = () => {
    const { snackbar, onSnackBarClose } = useContext(provider);

    return (
        <MuiSnackbar
            open={snackbar.open}
            autoHideDuration={5000}
            onClose={onSnackBarClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
            <Alert
                onClose={onSnackBarClose}
                severity={snackbar.severity}
                sx={{ width: "100%" }}
            >
                {snackbar.message}
            </Alert>
        </MuiSnackbar>
    );
};

export default Snackbar;
