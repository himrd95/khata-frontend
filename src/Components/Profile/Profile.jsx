import React, { useRef } from "react";
import { provider } from "../../Context/ContextPovider";
import "./Profile.css";
import useMakeApiCalls from "../../hooks/useMakeApiCalls";

const Profile = () => {
    const [, setAnchorEl] = React.useState(null);

    const { adminPannel, setAdminPannel } = React.useContext(provider);
    const inputRef = useRef();

    const { patchRequest } = useMakeApiCalls();

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handlechange = (e) => {
        const { files } = e.target;
        const formData = new FormData();
        formData.append("profile", files[0]);

        patchRequest(adminPannel.admin._id, formData);
    };

    const handleLogOut = () => {
        handleClose();
        setAdminPannel({
            token: "",
            admin: {},
        });
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
                <i
                    className={`fas ${
                        adminPannel.voice ? "fa-volume-up" : "fa-volume-mute"
                    }`}
                    style={{ marginRight: 12, fontSize: 18 }}
                />
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
            <div className="actionButtons enhanced-action" onClick={() => {}}>
                <i
                    className="fas fa-user-cog"
                    style={{ marginRight: 12, fontSize: 18 }}
                />
                <span>Edit Profile Info</span>
            </div>
            <div
                className="actionButtons enhanced-action"
                onClick={() => inputRef.current.click()}
            >
                <i
                    className="fas fa-user-edit"
                    style={{ marginRight: 12, fontSize: 18 }}
                />
                <span>Change Profile Picture</span>
            </div>
            <div
                className="actionButtons enhanced-action"
                onClick={handleLogOut}
            >
                <i
                    className="fas fa-sign-out-alt"
                    style={{ marginRight: 12, fontSize: 18 }}
                />
                <span>Logout</span>
            </div>
        </div>
    );
};

export default Profile;
