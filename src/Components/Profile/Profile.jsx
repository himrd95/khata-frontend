import React from "react";
import { provider } from "../../Context/ContextPovider";
import "./Profile.css";

const Profile = () => {
    const [, setAnchorEl] = React.useState(null);
    const { adminPannel, setAdminPannel } = React.useContext(provider);
    const handleClose = () => {
        setAnchorEl(null);
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
                Turn {action} voice
            </div>
            <div className="actionButtons" onClick={handleClose}>
                My account
            </div>
            <div className="actionButtons" onClick={handleLogOut}>
                Logout
            </div>
        </div>
    );
};

export default Profile;
