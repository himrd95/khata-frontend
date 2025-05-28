import React, { useRef, useEffect, useState, memo } from "react";
import { provider } from "../../Context/ContextPovider";
import "./Profile.css";
import useMakeApiCalls from "../../hooks/useMakeApiCalls";
import { isEmpty } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import {
    FaUserCog,
    FaTimes,
    FaCheck,
    FaUserEdit,
    FaSignOutAlt,
    FaVolumeUp,
    FaVolumeMute,
} from "react-icons/fa";

const Profile = () => {
    const [, setAnchorEl] = React.useState(null);
    const [profileName, setProfileName] = useState("");

    const { adminPannel, setAdminPannel, setUsers, setCurrentUser } =
        React.useContext(provider);
    const inputRef = useRef();
    const editProfileInputRef = useRef();

    const { patchRequest } = useMakeApiCalls();
    const navigate = useNavigate();
    useEffect(() => {
        if (!isEmpty(profileName) && editProfileInputRef.current) {
            editProfileInputRef.current.focus();
        }
    }, [profileName]);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handlechange = (e) => {
        const { files } = e.target;
        const formData = new FormData();
        formData.append("name", adminPannel.admin.name);
        formData.append("profile", files[0]);
        patchRequest(adminPannel.admin._id, formData);
    };

    const handleProfileNameChange = (e) => {
        setProfileName(e.target.value);
    };

    const handleProfileNameSubmit = async (e) => {
        if (e.key === "Enter" && profileName.trim()) {
            try {
                await patchRequest(adminPannel.admin._id, {
                    name: profileName.trim(),
                });
                setAdminPannel({
                    ...adminPannel,
                    admin: { ...adminPannel.admin, name: profileName.trim() },
                });
            } catch (error) {
                console.error("Failed to update profile name:", error);
            } finally {
                setProfileName("");
            }
        }
    };

    const handleLogOut = () => {
        navigate("/");
        setUsers([]);
        setCurrentUser({});
        setAdminPannel({
            token: "",
            admin: {},
            setUsers: [],
        });
        handleClose();
    };
    const handleVoice = () => {
        handleClose();
        setAdminPannel({ ...adminPannel, voice: !adminPannel.voice });
    };
    const action = adminPannel.voice ? "off" : "on";

    return (
        <div className="profile enhanced-profile">
            <div className="actionButtonsHeading">Action Buttons</div>
            <div
                className="actionButtons enhanced-action"
                onClick={handleVoice}
            >
                {adminPannel.voice ? (
                    <FaVolumeUp style={{ marginRight: 12, fontSize: 18 }} />
                ) : (
                    <FaVolumeMute style={{ marginRight: 12, fontSize: 18 }} />
                )}
                <span>Turn {action} voice</span>
            </div>
            <input
                ref={inputRef}
                accept="image/*"
                id="raised-button-file"
                onChange={handlechange}
                type="file"
                label="Profile"
                fullWidth
                name="profile"
                multiple
                style={{ display: "none" }}
            />
            <div
                className="actionButtons enhanced-action"
                onClick={() => {
                    if (isEmpty(profileName)) {
                        setProfileName(adminPannel.admin.name || "");
                    }
                }}
            >
                {isEmpty(profileName) ? (
                    <>
                        <FaUserCog />
                        <span>Edit Profile Info</span>
                    </>
                ) : (
                    <div className="editProfileContainer">
                        <button
                            className="cancelProfileButton"
                            onClick={() => {
                                setProfileName("");
                            }}
                        >
                            <FaTimes />
                        </button>
                        <input
                            ref={editProfileInputRef}
                            className="editProfileInput"
                            type="text"
                            value={profileName}
                            onChange={handleProfileNameChange}
                            onKeyDown={handleProfileNameSubmit}
                            placeholder="Enter your name"
                        />
                        <button
                            className="submitProfileButton"
                            onClick={() => {
                                if (profileName.trim()) {
                                    handleProfileNameSubmit({ key: "Enter" });
                                }
                            }}
                        >
                            <FaCheck />
                        </button>
                    </div>
                )}
            </div>
            <div
                className="actionButtons enhanced-action"
                onClick={() => inputRef.current.click()}
            >
                <FaUserEdit />
                <span>Change Profile Picture</span>
            </div>
            <div
                className="actionButtons enhanced-action"
                onClick={handleLogOut}
            >
                <FaSignOutAlt />
                <span>Logout</span>
            </div>
        </div>
    );
};

export default memo(Profile);
