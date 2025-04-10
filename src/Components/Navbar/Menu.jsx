import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { provider } from "../../Context/ContextPovider";
import DetailsCard from "../DetailsCard/DetailsCard";

export default function FadeMenu({ userName, pic }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
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
        <div>
            <DetailsCard
                profilePic={pic}
                profileName={userName}
                userName="him"
            />

            <Menu
                id="fade-menu"
                MenuListProps={{
                    "aria-labelledby": "fade-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <MenuItem onClick={handleVoice}>
                    {`Turn ${action} voice`}
                </MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleLogOut}>Logout</MenuItem>
            </Menu>
        </div>
    );
}
