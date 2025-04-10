import React, { useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { EVENTS } from "../../../constants";
import eventBus from "../../../utils/eventBus";
import "./BottomNav.css";
import cx from "classnames";

const TABS = {
    HOME: "HOME",
    ADD: "ADD",
    PROFILE: "PROFILE",
};

const BottomNav = () => {
    const [active, setActive] = useState(TABS.HOME);
    const path = useLocation();
    const navigate = useNavigate();

    const handleRoute = useCallback(
        (tab) => {
            setActive(tab);
            if (tab === TABS.HOME) {
                navigate("/");
            } else if (tab === TABS.PROFILE) {
                navigate("/profile");
            } else if (path.pathname === "/") {
                return eventBus.dispatch(EVENTS.ADD_NEW_USER, true);
            } else {
                return eventBus.dispatch(EVENTS.ADD_NEW_TRANSACTION, true);
            }
        },
        [navigate, path.pathname]
    );

    const getClassName = useCallback(
        (tab) => {
            return cx("nav-item", { active: active === tab });
        },
        [active]
    );

    return (
        <>
            <div className="navBackgroundPlaceholder"></div>

            <div className="bottom-nav">
                <div
                    className={getClassName(TABS.HOME)}
                    onClick={() => handleRoute(TABS.HOME)}
                >
                    <i className="fas fa-home"></i>
                    <span>Home</span>
                </div>

                <div
                    className="center-button"
                    onClick={() => handleRoute(TABS.ADD)}
                >
                    <i className="fas fa-plus"></i>
                </div>

                <div
                    className={getClassName(TABS.PROFILE)}
                    onClick={() => handleRoute(TABS.PROFILE)}
                >
                    <i className="fa-solid fa-user"></i>
                </div>
            </div>
        </>
    );
};

export default React.memo(BottomNav);
