import { Button, DialogTitle, Input, TextField } from "@material-ui/core";
import Styled from "styled-components";
import React, { useContext, useEffect, useState } from "react";
import { provider } from "../../Context/ContextPovider";
import { DialogActions } from "@mui/material";

import speak from "../../utils/speech";
import { useRef } from "react";
import LineLoader from "../Common/LineLoader";

const Container = Styled.div`
    padding: 16px;
    text-align: center;
    width: fit-content
    margin: auto;
`;

const NewUser = ({ handleClose, handleAddUser }) => {
    const [payload, setPayload] = useState({ mode: "" });
    const inputRef = useRef();

    const { isModalLoading, adminPannel } = useContext(provider);

    const handlechange = (e) => {
        const { name, value, files } = e.target;
        console.log(e, e.target);
        setPayload({
            ...payload,
            [name]: name === "profile" ? files[0] : value,
        });
    };

    const handleChoose = () => {
        inputRef.current.click();
    };

    useEffect(() => {
        adminPannel.voice && speak("Add a new User");
    }, [adminPannel.voice]);

    return (
        <Container>
            <DialogTitle>Add a new User</DialogTitle>

            <div className="apple-form-group">
                <input
                    required
                    type="text"
                    name="name"
                    value={payload.name}
                    onChange={(e) => handlechange(e)}
                    placeholder="Name"
                />
            </div>
            <Input
                ref={inputRef}
                accept="image/*"
                id="raised-button-file"
                onChange={(e) => handlechange(e)}
                type="file"
                label="Profile"
                fullWidth
                name="profile"
                multiple
                style={{ display: "none" }}
            />

            <label htmlFor="raised-button-file">
                <Button
                    variant="contained"
                    component="span"
                    onClick={handleChoose}
                >
                    Choose User's pic
                </Button>
            </label>

            <br />
            <br />

            <DialogActions>
                <Button
                    onClick={handleClose}
                    sx={{ margin: "0 10px 10px 0" }}
                    variant="contained"
                >
                    Cancel
                </Button>
                <Button
                    onClick={() => handleAddUser(payload)}
                    variant="contained"
                    color="primary"
                >
                    Add User
                </Button>
            </DialogActions>

            {isModalLoading && <LineLoader />}
        </Container>
    );
};

export default NewUser;
