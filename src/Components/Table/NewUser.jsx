import React, { memo, useContext, useEffect, useMemo, useState } from "react";
import speak from "../../utils/speech";
import { DialogTitle } from "@mui/material";
import Styled from "styled-components";
import LineLoader from "../Common/LineLoader";
import { isEmpty } from "../../utils/helpers";
import { provider } from "../../Context/ContextPovider";
import ImageUpload from "../Common/ImageUpload.jsx";

const Container = Styled.div`
    padding: 24px;
    text-align: center;
    width: fit-content
    margin: auto;
`;

const NewUser = ({ handleClose, handleAddUser, userName }) => {
    const { isModalLoading, adminPannel, currentUser } = useContext(provider);
    const [payload, setPayload] = useState({
        mode: "",
        name: userName,
        id: !isEmpty(userName) ? currentUser._id : "",
    });
    const [previewUrl, setPreviewUrl] = useState(null);

    const updateOrAddText = useMemo(() => {
        if (isEmpty(userName)) {
            return "Add";
        }
        return "Update";
    }, [userName]);

    const handlechange = (e) => {
        const { name, value } = e.target;
        setPayload({
            ...payload,
            [name]: value,
        });
    };

    const handleImageSelect = (file, preview) => {
        setPayload((prev) => ({
            ...prev,
            profile: file,
        }));
        setPreviewUrl(preview);
    };

    const handleImageRemove = () => {
        setPayload((prev) => ({
            ...prev,
            profile: null,
        }));
        setPreviewUrl(null);
    };

    useEffect(() => {
        adminPannel.voice && speak("Add a new User");
    }, [adminPannel.voice]);

    return (
        <Container>
            <DialogTitle>{updateOrAddText} new User</DialogTitle>

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

            <ImageUpload
                onImageSelect={handleImageSelect}
                onImageRemove={handleImageRemove}
                previewUrl={previewUrl}
            />

            <div className="apple-buttons">
                <button type="button" className="cancel" onClick={handleClose}>
                    Cancel
                </button>
                <button
                    type="submit"
                    className="update"
                    onClick={() => handleAddUser(payload)}
                >
                    {updateOrAddText} User
                </button>
            </div>

            {isModalLoading && <LineLoader />}
        </Container>
    );
};

export default memo(NewUser);
