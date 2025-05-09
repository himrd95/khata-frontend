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
        <div className="profile">
            <div className="actionButtonsHeading">Action Buttons</div>
            <div className="actionButtons" onClick={handleVoice}>
                <i
                    className={`fas ${
                        adminPannel.voice ? "fa-volume-up" : "fa-volume-mute"
                    }`}
                    style={{ marginRight: 8 }}
                />
                Turn {action} voice
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
            <div className="actionButtons" onClick={() => {}}>
  <i className="fas fa-user-cog" style={{ marginRight: 8 }} />
  Edit Profile Info
</div>
            <div
                className="actionButtons"
                onClick={() => inputRef.current.click()}
            >
                <i className="fas fa-user-edit" style={{ marginRight: 8 }} />
                Change Profile Picture
            </div>
            <div className="actionButtons" onClick={handleLogOut}>
                <i className="fas fa-sign-out-alt" style={{ marginRight: 8 }} />
                Logout
            </div>
        </div>
    );
};

export default Profile;
