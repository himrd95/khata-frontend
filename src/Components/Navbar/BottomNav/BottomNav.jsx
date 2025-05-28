import React, { useCallback, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { EVENTS } from "../../../constants";
import eventBus from "../../../utils/eventBus";
import "./BottomNav.css";
import cx from "classnames";
import { provider } from "../../../Context/ContextPovider";
import { isEmpty } from "../../../utils/helpers";
import { FaHome, FaPlus, FaUser } from "react-icons/fa";

const TABS = {
    HOME: "HOME",
    ADD: "ADD",
    PROFILE: "PROFILE",
};

const BottomNav = () => {
    const [active, setActive] = useState(TABS.HOME);
    const { setCurrentUser, currentUser } = useContext(provider);
    const path = useLocation();
    const navigate = useNavigate();

    const handleRoute = useCallback(
        (tab) => {
            setActive(tab);
            if (tab === TABS.HOME) {
                setCurrentUser({});
                if (path.pathname === "/profile") {
                    navigate("/");
                }
            } else if (tab === TABS.PROFILE) {
                navigate("/profile");
                setCurrentUser({});
            } else if (path.pathname === "/" && isEmpty(currentUser)) {
                return eventBus.dispatch(EVENTS.ADD_NEW_USER, "");
            } else {
                return eventBus.dispatch(EVENTS.ADD_NEW_TRANSACTION, true);
            }
        },
        [currentUser, navigate, path.pathname, setCurrentUser]
    );

    const getClassName = useCallback(
        (tab) => {
            return cx("nav-item", { active: active === tab, "user-icon": tab === TABS.PROFILE });
        },
        [active]
    );

    return (
        <>
            <div className="bottom-nav">
                <div style={{ left: active === TABS.PROFILE ? "75%" : "25%" }} className="active-dot"></div>
                <div
                    className={getClassName(TABS.HOME)}
                    onClick={() => handleRoute(TABS.HOME)}
                >
                    <FaHome />
                </div>

                <div
                    className="center-button"
                    onClick={() => handleRoute(TABS.ADD)}
                >
                    <FaPlus />
                </div>

                <div
                    className={getClassName(TABS.PROFILE)}
                    onClick={() => handleRoute(TABS.PROFILE)}
                >
                    <FaUser />
                </div>
            </div>
        </>
    );
};

export default React.memo(BottomNav);
